"use client"

import { RiSendPlaneFill } from 'react-icons/ri'
import { ImAttachment } from 'react-icons/im'
import { FiMic } from 'react-icons/fi'
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import ChatInput from './chatInput'
import { createChat, createMessage, fetchChat } from '@/src/helper/useAxiosRequests'

interface chatSendProps {
    contactId: string,
    firstChat: boolean,
    setFirstChat : Dispatch<SetStateAction<boolean>>
}
const ChatSendBox: FC<chatSendProps> = ({ firstChat, setFirstChat, contactId }) => {
    const [input, setInput] = useState<string>('')

    const userInfo = useAppSelector(state => state.userInfo).User
    const dispatch = useAppDispatch()

    const sendHandler = async () => {
        let chatId: string;

        // if firstChat => createChat else Just getChat
        firstChat
            ? chatId = await createChat(userInfo._id, contactId)
            : chatId = await fetchChat(userInfo._id, contactId, dispatch, setFirstChat)

        console.log('chat Id : ', chatId)

        const newMessage = {
            content: {
                contentType: 'text',
                text: input
            },
            senderId: userInfo._id
        }

        chatId
            ? createMessage(chatId, newMessage)
            : null

        setInput('')
    }


    return (
        <div className="bg-white w-full bottom-0 p-5 px-6 dark:bg-bgColorDark2">
            <div className="w-full col-span-1 bg-[#f5f5f5] flex rounded-md p-3 items-center dark:bg-bgColorDark3">
                <ChatInput sendHandler={sendHandler} input={input} setInput={setInput} />
                <div className="icons flex text-md gap-2 mr-3 text-gray-500">
                    <ImAttachment className='cursor-pointer' />
                    <FiMic className='cursor-pointer' />
                </div>
                <div className="sendIcons border-l-2 border-gray-400 pl-3 text-xl">
                    <RiSendPlaneFill onClick={sendHandler} className='cursor-pointer dark:text-[#2563eb]' />
                </div>
            </div>
        </div>
    )
}
export default ChatSendBox;