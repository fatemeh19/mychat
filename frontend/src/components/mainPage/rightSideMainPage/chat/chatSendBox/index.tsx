"use client"

import { FC, createRef, useEffect, useRef, useState } from 'react'

import { RiSendPlaneFill } from 'react-icons/ri'
import { ImAttachment } from 'react-icons/im'

import ChatInput from './chatInput'
import { ChatType, messageTypes } from '@/src/models/enum'
import { setFirstChat } from '@/src/redux/features/chatSlice'
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import { createChat, createMessage, editMessage, fetchChat } from '@/src/helper/useAxiosRequests'
import VoiceRecord from './voiceRecord'
import ReplySection from './replySection'
import { setShowReply } from '@/src/redux/features/repliedMessageSlice'
import { setIsForward } from '@/src/redux/features/forwardMessageSlice'
import { removeSelectMessage, removeSelectMessageContent, removeSelectedMessagesMainIds, setActiveSelection } from '@/src/redux/features/selectedMessagesSlice'
import { useRouter } from 'next/navigation'
import { fetchUserChatList } from '@/src/helper/userInformation'
import callApi from '@/src/helper/callApi'
import { addChatList } from '@/src/redux/features/userChatListSlice'
import { BsCheck } from 'react-icons/bs'
import { setIsEdit } from '@/src/redux/features/editMessageSlice'

interface chatSendProps {
    contactId: string,
}

const ChatSendBox: FC<chatSendProps> = ({ contactId }) => {
    const [input, setInput] = useState<string>('')
    const [file, setFile] = useState<any>()
    const [voice, setVoice] = useState<any>()
    // const [showReply, setShowReply] = useState<boolean>(false)

    const dispatch = useAppDispatch()

    const userInfo = useAppSelector(state => state.userInfo).User
    const socket = useAppSelector(state => state.socket).Socket
    let chatId = useAppSelector(state => state.chat).Chat._id
    let firstChat = useAppSelector(state => state.chat).firstChat
    const chatCreated = useAppSelector(state => state.chat).chatCreated
    const showReply = useAppSelector(state => state.repledMessage).ShowReply
    const repliedMessageId = useAppSelector(state => state.repledMessage).RepliedMessage._id
    const isForward = useAppSelector(state => state.forwardMessage).isForward
    const forwardMessageIds = useAppSelector(state => state.forwardMessage).forwardMessageIds
    const isEdit = useAppSelector(state => state.editMessage).isEdit
    const editedMessage = useAppSelector(state => state.editMessage).editedMessageId
    const chatType = useAppSelector(state => state.chat.Chat).chatType
    const chat = useAppSelector(state => state.chat.Chat)

    const fileRef = createRef<HTMLInputElement>()

    const router = useRouter()

    // ------- discription of reason for using useEffect :: -------- i add this CAS when there is no chat if send msg chat created and chatID back but when send the second message firstChat is make false and we dont have chatId because fetchChat is not in the sendMessage soooo i put fetchChatt in useEffect that is controlled by firstChat by this -> when firstChat turn to false at sending second chat fetchChat run and we access to chat Informaition and save it in redux and access it from redux in next sending msg annnnnd in opening this chat again in rightSideMainPage file we fetchChat and in fetchChat we save chat information in redux and every thing working so good --- so cool.
    useEffect(() => {
        chatCreated === false && dispatch(setFirstChat(true))
    })
    useEffect(() => {
        isEdit ?
            !editedMessage.messageInfo.content.file
                ? setInput(editedMessage.messageInfo.content.text)
                : setInput('Caption')
            : setInput('')
    }, [isEdit])
    useEffect(() => {
        console.log('chat in sendBox : ', chat)
        chatType === ChatType.private && chatCreated && (async () => {
            chatId = await fetchChat(chatId, dispatch)
        })()
    }, [firstChat])
    useEffect(() => {
        socket?.emit('onChat', chatId)
    }, [chatId])

    const attachmentHandler = (e: any) => {
        // @ts-ignore
        const file = fileRef.current?.files[0]
        file ? setFile(file) : null
    }
    const img = useRef<HTMLImageElement>(null)

    const sendHandler = async () => {
        firstChat ? chatId = await createChat(userInfo._id, [contactId], ChatType.private, '', dispatch) : null
        firstChat && router.push(`/chat/${chatId}`)

        let type = messageTypes.text
        voice
            ? type = messageTypes.voice
            : null
        switch (file?.type.split('/')[0]) {
            case 'audio':
                type = messageTypes.music
                break;
            case 'application':
                type = messageTypes.file
                break;
            case 'image':
                type = messageTypes.photo
                break;
            case 'video':
                type = messageTypes.videoMessage
                break;
            default:

                break;
        }
        if (type === messageTypes.text && input.length == 0) {
            console.log('empty text')
            if (isForward) {
                socket.emit('forwardMessage', chatId, forwardMessageIds)
                isForward && dispatch(setIsForward(false))
                showReply && dispatch(setShowReply(false))
                isForward && dispatch(removeSelectMessageContent([]))
                isForward && dispatch(setActiveSelection(false))
            }
        } else {
            let newMessage = new FormData()

            // newMessage.append('content[contentType]', type)
            newMessage.append('content[text]', input)
            file ? newMessage.append('file', file) : null
            // !isEdit && newMessage.append('senderId', userInfo._id)
            !isEdit && voice ? newMessage.append('file', voice) : null
            !isEdit && showReply && !isForward ? newMessage.append('reply[isReplied]', JSON.stringify(true)) : null
            !isEdit && showReply && !isForward ? newMessage.append('reply[messageId]', repliedMessageId) : null
            // showReply && isForward ? newMessage.append('forwarded[isForwarded]', isForward)

            // let blob2 = new Blob([file]);
            // console.log('main blob: ', blob2)
            // var blobToFile = new File([blob2], "name");
            // console.log('blobToFile : ', blobToFile)


            // if (isEdit) {
            //     const url = editedMessage.messageInfo.content.url
            //     // var blob = new Blob([url], { type: 'image/jpeg' })
            //     // var blobToFile = new File([blob], `${editedMessage.messageInfo.content.originalName}`);
            //     // console.log('blob : ', blob)
            //     // console.log('imageFile : ', blobToFile)

            //     // const propmis = new Promise((resolve, reject) => {
            //     //     const reader = new FileReader()
            //     //     reader.onloadend = () => resolve(reader.result)
            //     //     reader.onerror = reject
            //     //     reader.readAsDataURL(blob)

            //     //     console.log('reader :: ', reader)
            //     // })

            //     // console.log('promis : ', propmis)



            //     // setFile(blobToFile)

            //     // console.log('add file to edited message')
            //     // newMessage.append('file', blobToFile)

            //     const toDataURL = url => fetch(url)
            //         .then(response => response.blob())
            //         .then(blob => new Promise((resolve, reject) => {
            //             const reader = new FileReader()
            //             reader.onloadend = () => resolve(reader.result)
            //             reader.onerror = reject
            //             reader.readAsDataURL(blob)
            //         }))

            //     const dataURLtoFile = (dataurl, filename) => {
            //         var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            //             bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            //         while (n--) {
            //             u8arr[n] = bstr.charCodeAt(n);
            //         }
            //         return new File([u8arr], filename, { type: 'image/jpeg' });
            //     }

            //     toDataURL(url)
            //         .then(dataUrl => {
            //             console.log('Here is Base64 Url', dataUrl)
            //             var fileData = dataURLtoFile(dataUrl, `${editedMessage.messageInfo.content.originalName}`);
            //             console.log("Here is JavaScript File Object", fileData)
            //             // fileArr.push(fileData)
            //             newMessage.append('file', fileData)
            //         })

            // }

            let message = ''
            chatId
                ? isEdit
                    ? message = await editMessage(editedMessage.messageInfo._id, newMessage, dispatch)
                    : message = await createMessage(chatId, newMessage, dispatch)
                : null

            setInput('')
            setFile(null)
            if (socket) {
                newMessage.forEach(item => console.log(item))
                chatId && !isEdit && socket.emit('sendMessage', chatId, message)
                chatId && isForward && !isEdit && socket.emit('forwardMessage', chatId, forwardMessageIds)
                // chatId && !isForward && isEdit && socket.emit('editMessage', chatId, message, editedMessage._id)
            }
            dispatch(setFirstChat(false))
            showReply && dispatch(setShowReply(false))
            isForward && dispatch(setIsForward(false))
            isForward && dispatch(removeSelectMessageContent([]))
            isForward && dispatch(setActiveSelection(false))

            isForward && dispatch(removeSelectedMessagesMainIds([]))
            isForward && dispatch(removeSelectMessage([]))

            isEdit && dispatch(removeSelectMessage([]))
            isEdit && dispatch(setIsEdit(false))


            if (firstChat) {
                fetchUserChatList(dispatch)
                // const token = localStorage.getItem('token')
                // const config = {
                //     headers: {
                //         Authorization: `Bearer ${token}`
                //     }
                // };
                // const res = await callApi().get('/main/chat/', config)
                // if (res.statusText && res.statusText === 'OK') {
                //     // console.log(res)
                //     const chatList = res.data.value.chats;
                //     console.log('sendBox chatList: ', chatList)
                //     dispatch(addChatList(chatList))
                // }
            }

        }
    }
    const chatFetched = useAppSelector(state => state.chat).chatFetched
    const sendMediaRef = useRef<HTMLDivElement>(null)
    const sendFilesRef = useRef<HTMLDivElement>(null)
    const sendVoiceRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        // chatFetched : add this because before chat fetched this code runs and make error by userPermission undefined
        if (chatFetched === true) {
            const permissions = chat.userPermissionsAndExceptions.permissions
            if (permissions) {
                !permissions.sendMedia.all
                    // @ts-ignore
                    ? sendMediaRef.current.style.display = 'none'
                    // @ts-ignore
                    : sendMediaRef.current.style.display = 'flex'
                !permissions.sendMedia.photo || !permissions.sendMedia.music || !permissions.sendMedia.videoMessage || !permissions.sendMedia.file
                    // @ts-ignore
                    ? sendFilesRef.current.style.display = 'none'
                    // @ts-ignore
                    : sendFilesRef.current.style.display = 'flex'
                !permissions.sendMedia.voice
                    // @ts-ignore
                    ? sendVoiceRef.current.style.display = 'none'
                    // @ts-ignore
                    : sendVoiceRef.current.style.display = 'flex'
            }
        }
    }, [chatFetched ? chat : chatFetched])

    return (
        <div className='w-full relative'>
            {showReply && <ReplySection showReply={showReply} />}
            <div className="bg-white w-full bottom-0 p-5 px-6 dark:bg-bgColorDark2">
                <div className="w-full col-span-1 bg-[#f5f5f5] flex rounded-md p-3 items-center dark:bg-bgColorDark3">
                    <ChatInput sendHandler={sendHandler} input={input} setInput={setInput} />
                    <input type="file" ref={fileRef} onChange={attachmentHandler} hidden />
                    <div ref={sendMediaRef} className="icons flex text-md gap-2 mr-3 text-gray-500">
                        <div ref={sendFilesRef}>
                            <ImAttachment className='cursor-pointer' onClick={() => fileRef.current?.click()} />
                        </div>
                        <div ref={sendVoiceRef}>
                            <VoiceRecord sendHandler={sendHandler} voice={voice} setVoice={setVoice} />
                        </div>
                        {/* <FiMic className='cursor-pointer' /> */}
                    </div>
                    {!isEdit
                        ? <div className="sendIcons border-l-2 border-gray-400 pl-3 text-xl">
                            <RiSendPlaneFill onClick={sendHandler} className='cursor-pointer dark:text-[#2563eb]' />
                        </div>
                        : <button className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center" onClick={sendHandler}>
                            <BsCheck className="text-white w-5 h-5" />
                        </button>
                    }
                </div>
                <img src="" ref={img} alt="" />
            </div>
        </div>
    )
}
export default ChatSendBox;