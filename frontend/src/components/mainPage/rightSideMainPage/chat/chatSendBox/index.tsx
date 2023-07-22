"use client"

import { FC, createRef, useEffect, useRef, useState } from 'react'

import { RiSendPlaneFill } from 'react-icons/ri'
import { ImAttachment } from 'react-icons/im'

import ChatInput from './chatInput'
import { ChatType, messageTypes } from '@/src/models/enum'
import { setFirstChat } from '@/src/redux/features/chatSlice'
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import { createChat, createMessage, fetchChat } from '@/src/helper/useAxiosRequests'
import VoiceRecord from './voiceRecord'

interface chatSendProps {
    contactId: string,
}

const ChatSendBox: FC<chatSendProps> = ({ contactId }) => {
    const [input, setInput] = useState<string>('')
    const [file, setFile] = useState<any>()
    const [voice, setVoice] = useState<any>()

    const userInfo = useAppSelector(state => state.userInfo).User
    const socket = useAppSelector(state => state.socket).Socket
    const dispatch = useAppDispatch()

    let chatId = useAppSelector(state => state.chat).Chat._id
    let firstChat = useAppSelector(state => state.chat).firstChat

    const fileRef = createRef<HTMLInputElement>()

    // ------- discription of reason for using useEffect :: -------- i add this CAS when there is no chat if send msg chat created and chatID back but when send the second message firstChat is make false and we dont have chatId because fetchChat is not in the sendMessage soooo i put fetchChatt in useEffect that is controlled by firstChat by this -> when firstChat turn to false at sending second chat fetchChat run and we access to chat Informaition and save it in redux and access it from redux in next sending msg annnnnd in opening this chat again in rightSideMainPage file we fetchChat and in fetchChat we save chat information in redux and every thing working so good --- so cool.
    useEffect(() => {
        (async () => {

            // chatId = await fetchChat(chatId, dispatch)
        })()
    }, [firstChat])

    const attachmentHandler = (e: any) => {
        // @ts-ignore
        const file = fileRef.current?.files[0]
        file ? setFile(file) : null
    }

    const sendHandler = async () => {
        // const membersIds: string[] = [contactId]
        // firstChat ? chatId = await createChat(userInfo._id, contactId, membersIds) : null
        firstChat ? chatId = await createChat(userInfo._id, [contactId], ChatType.private) : null

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
                type = messageTypes.picture
                break;
            case 'video':
                type = messageTypes.video
                break;
            default:

                break;
        }
        if (type === messageTypes.text && input.length == 0) {
            console.log('empty text')
        } else {
            console.log('type : ', type)
            let newMessage = new FormData()

            newMessage.append('content[contentType]', type)
            newMessage.append('content[text]', input)
            file ? newMessage.append('file', file) : null
            newMessage.append('senderId', userInfo._id)
            voice ? newMessage.append('file', voice) : null

            let message = ''
            chatId
                ? message = await createMessage(chatId, newMessage, dispatch)
                : null

            setInput('')
            setFile(null)

            if (socket) {
                newMessage.forEach(item => console.log(item))
                console.log('socket in sendBox')
                socket.emit('sendMessage', contactId, message)
            }

            dispatch(setFirstChat(false))
        }

    }

    return (
        <div className="bg-white w-full bottom-0 p-5 px-6 dark:bg-bgColorDark2">
            <div className="w-full col-span-1 bg-[#f5f5f5] flex rounded-md p-3 items-center dark:bg-bgColorDark3">
                <ChatInput sendHandler={sendHandler} input={input} setInput={setInput} />
                <input type="file" ref={fileRef} onChange={attachmentHandler} hidden />
                <div className="icons flex text-md gap-2 mr-3 text-gray-500">
                    <ImAttachment className='cursor-pointer' onClick={() => fileRef.current?.click()} />
                    {/* <FiMic className='cursor-pointer' /> */}
                    <VoiceRecord sendHandler={sendHandler} voice={voice} setVoice={setVoice} />
                </div>
                <div className="sendIcons border-l-2 border-gray-400 pl-3 text-xl">
                    <RiSendPlaneFill onClick={sendHandler} className='cursor-pointer dark:text-[#2563eb]' />
                </div>
            </div>
        </div>
    )
}
export default ChatSendBox;