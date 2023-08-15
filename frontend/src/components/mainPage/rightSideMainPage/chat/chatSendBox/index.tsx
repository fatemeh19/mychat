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
    const chatMessages = useAppSelector(state => state.chat).Chat.messages

    const fileRef = createRef<HTMLInputElement>()

    const router = useRouter()

    // ------- discription of reason for using useEffect :: -------- i add this CAS when there is no chat if send msg chat created and chatID back but when send the second message firstChat is make false and we dont have chatId because fetchChat is not in the sendMessage soooo i put fetchChatt in useEffect that is controlled by firstChat by this -> when firstChat turn to false at sending second chat fetchChat run and we access to chat Informaition and save it in redux and access it from redux in next sending msg annnnnd in opening this chat again in rightSideMainPage file we fetchChat and in fetchChat we save chat information in redux and every thing working so good --- so cool.
    useEffect(() => {
        chatCreated === false && dispatch(setFirstChat(true))
    })
    useEffect(() => {
        console.log('in')

        isEdit ? editedMessage.messageInfo.content.contentType === messageTypes.text ? setInput(editedMessage.messageInfo.content.text) : setInput('Caption') : setInput('')
    }, [isEdit])
    useEffect(() => {
        chatCreated && (async () => {
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
                console.log('forward msg: ', forwardMessageIds)
                socket.emit('forwardMessage', chatId, forwardMessageIds)
                isForward && dispatch(setIsForward(false))
                showReply && dispatch(setShowReply(false))
                isForward && dispatch(removeSelectMessageContent([]))
                isForward && dispatch(setActiveSelection(false))
            }
        } else {
            console.log('type : ', type)
            console.log('input : content[text] : ', input)
            let newMessage = new FormData()

            // newMessage.append('content[contentType]', type)
            newMessage.append('content[text]', input)
            file ? newMessage.append('file', file) : null
            !isEdit && newMessage.append('senderId', userInfo._id)
            !isEdit && voice ? newMessage.append('file', voice) : null
            !isEdit && showReply && !isForward ? newMessage.append('reply[isReplied]', JSON.stringify(true)) : null
            !isEdit && showReply && !isForward ? newMessage.append('reply[messageId]', repliedMessageId) : null
            // showReply && isForward ? newMessage.append('forwarded[isForwarded]', isForward)

            console.log('chatMessages before edit message', chatMessages)

            let message = ''
            chatId
                ? isEdit
                    ? message = await editMessage(editedMessage.messageInfo._id, newMessage, dispatch)
                    : message = await createMessage(chatId, newMessage, dispatch)
                : null

            setInput('')
            setFile(null)
            if (socket) {
                console.log('socket is exist')
                console.log('new message ::')
                newMessage.forEach(item => console.log(item))
                chatId && !isEdit && socket.emit('sendMessage', chatId, message)
                chatId && isForward && !isEdit && socket.emit('forwardMessage', chatId, forwardMessageIds)
                chatId && !isForward && isEdit && socket.emit('editMessage', chatId, message, editedMessage._id)
                console.log('chatMessages after edit message', chatMessages)
            }
            dispatch(setFirstChat(false))
            showReply && dispatch(setShowReply(false))
            isForward && dispatch(setIsForward(false))
            isForward && dispatch(removeSelectMessageContent([]))
            isForward && dispatch(setActiveSelection(false))

            isForward && dispatch(removeSelectedMessagesMainIds([]))
            isForward && dispatch(removeSelectMessage([]))

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

    return (
        <div className='w-full relative'>
            {showReply && <ReplySection showReply={showReply} />}
            <div className="bg-white w-full bottom-0 p-5 px-6 dark:bg-bgColorDark2">
                <div className="w-full col-span-1 bg-[#f5f5f5] flex rounded-md p-3 items-center dark:bg-bgColorDark3">
                    <ChatInput sendHandler={sendHandler} input={input} setInput={setInput} />
                    <input type="file" ref={fileRef} onChange={attachmentHandler} hidden />
                    <div className="icons flex text-md gap-2 mr-3 text-gray-500">
                        <ImAttachment className='cursor-pointer' onClick={() => fileRef.current?.click()} />
                        {/* <FiMic className='cursor-pointer' /> */}
                        <VoiceRecord sendHandler={sendHandler} voice={voice} setVoice={setVoice} />
                    </div>
                    {!isEdit
                        ? <div className="sendIcons border-l-2 border-gray-400 pl-3 text-xl">
                            <RiSendPlaneFill onClick={sendHandler} className='cursor-pointer dark:text-[#2563eb]' />
                        </div>
                        : <button className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center" onClick={sendHandler}>
                            <BsCheck className="text-white w-5 h-5" />
                        </button>
                    }
                    {/* <div className="sendIcons border-l-2 border-gray-400 pl-3 text-xl">
                        <RiSendPlaneFill onClick={sendHandler} className='cursor-pointer dark:text-[#2563eb]' />
                    </div> */}
                </div>
            </div>
        </div>

        // {!isEdit
        //     ? <div className="righ cursor-pointer" onClick={() => { dispatch(setShowReply(false)); dispatch(setIsForward(false)) }}>
        //         <GrClose />
        //     </div>
        //     : <button className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
        //         <BsCheck className="text-white" />
        //     </button>
        // }
    )
}
export default ChatSendBox;