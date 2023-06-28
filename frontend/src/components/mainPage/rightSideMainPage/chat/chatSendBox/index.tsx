"use client"

import { RiSendPlaneFill } from 'react-icons/ri'
import { ImAttachment } from 'react-icons/im'
import { FiMic } from 'react-icons/fi'
import { useAppSelector } from '@/src/redux/hooks'
import { FC, useState } from 'react'
import callApi from '@/src/helper/callApi'
import ChatInput from './chatInput'
import { ValidationError } from 'yup'

interface chatSendProps {
    firstChat: boolean,
    contactId: string
}
const ChatSendBox: FC<chatSendProps> = ({ firstChat, contactId }) => {
    const userInfo = useAppSelector(state => state.userInfo).User

    const getChat = async (userId: string, contactId: string, config: {}) => {
        console.log('start get chat')
        let res: any;
        try {
            res = await callApi().get(`/main/chat/${userId}/${contactId}`, config)
            console.log('getChat res : ', res)
            // check if chat is availeble : get chat
            if (res.statusText && res.statusText === 'OK') {
                console.log('chat get')
                // save Chat in redux
                return res.data.value.chat._id
            }

        } catch (error) {
            if (error instanceof ValidationError) {
                // @ts-ignore
                const err = error.Error.errors[0];
                console.log('فرمت نادرست در getChat')
                // @ts-ignore

                // check if chat is not availeble : creat chat
                if (error.Error.statusCode === 400 && err.errorType === 'NotFoundError') {
                    console.log('error message : ', err.message)
                    const chatId = await createChat(userId, contactId, config)
                    return chatId

                }
            }
        }
        console.log('res from getChat : ', res)

        // return res.data.value.contact

    }

    const createChat = async (userId: string, contactId: string, config: {}) => {
        console.log('start create chat')
        const data = {
            memberIds: [userId, contactId]
        }
        let res: any;
        // not found chat => create chat
        try {
            res = await callApi().post('/main/chat/', data, config)
            if (res.statusText && res.statusText === 'Created') {
                console.log('chat created.')
                return res.data.value.chatId


            }
        } catch (error) {
            // console.log('error in create chat : ', error)
            // @ts-ignore
            const err = error.Error.errors[0]
            if (err.errorType === 'FormatError') {
                console.log(err.message)
            }
            else if (err.errorType === 'DuplicateError') {
                console.log(err.message)
            }
        }



        console.log('res from createChat : ', res)


    }
    interface messageContentInterface {
        contentType: string,
        text: string
    }

    interface messageInterface {
        content: messageContentInterface,
        senderId: string

    }

    const createMessage = async (chatId: string, newMessage: messageInterface, config: {}) => {
        console.log('start create message')
        let res: any;
        // not found chat => create chat
        try {
            res = await callApi().post(`/main/message/${chatId}`, newMessage, config)
            if (res.statusText && res.statusText === 'OK') {
                console.log('message created.')
                // save message in messages redux

            }
        } catch (error) {
            console.log(error)
        }

        console.log('res from createMessage : ', res)
    }





    const sendHandler = async () => {
        let chatId: string;
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        if (firstChat) {
            chatId = await createChat(userInfo._id, contactId, config)
        }

        chatId = await getChat(userInfo._id, contactId, config)

        const newMessage = {
            content: {
                contentType: 'text',
                text: input
            },
            senderId: userInfo._id
        }

        chatId
            ? createMessage(chatId, newMessage, config)
            : null
    }

    const [input, setInput] = useState<string>('')

    return (
        <div className="bg-white w-full bottom-0 p-5 px-6 dark:bg-bgColorDark2">
            <div className="w-full col-span-1 bg-[#f5f5f5] flex rounded-md p-3 items-center dark:bg-bgColorDark3">
                <ChatInput sendHandler={sendHandler} input={input} setInput={setInput} />
                {/* <input  type="text" className='bg-transparent w-full outline-none' placeholder='Text Message' /> */}
                <div className="icons flex text-md gap-2 mr-3 text-gray-500">
                    <ImAttachment className='cursor-pointer' />
                    <FiMic className='cursor-pointer' />

                </div>
                <div className="sendIcons border-l-2 border-gray-400 pl-3 text-xl">
                    <RiSendPlaneFill onClick={() => { const chatId = sendHandler() }} className='cursor-pointer dark:text-[#2563eb]' />
                </div>
            </div>
        </div>
    )
}
export default ChatSendBox;