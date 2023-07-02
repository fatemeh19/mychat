"use client"

import { RiSendPlaneFill } from 'react-icons/ri'
import { ImAttachment } from 'react-icons/im'
import { FiMic } from 'react-icons/fi'
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import ChatInput from './chatInput'
import { createChat, createMessage, fetchChat } from '@/src/helper/useAxiosRequests'
import { Socket, io } from 'socket.io-client'

interface chatSendProps {
    contactId: string,
    firstChat: boolean,
    setFirstChat: Dispatch<SetStateAction<boolean>>
}
const ChatSendBox: FC<chatSendProps> = ({ firstChat, setFirstChat, contactId }) => {
    const [input, setInput] = useState<string>('')

    const userInfo = useAppSelector(state => state.userInfo).User
    const socket = useAppSelector(state => state.socket).Socket
    const dispatch = useAppDispatch()
    let newMessage : any

    const sendHandler = async () => {
        let chatId: string;

        console.log(firstChat)
        // if firstChat => createChat else Just getChat
        console.log('checking if there is chat or not ...')
        chatId = await fetchChat(userInfo._id, contactId, dispatch, setFirstChat)
        

        // ------------------------
         //اینجا اولش اینطور کار کردم اما وقتی صفحه رو رفرش میکنم فرست چت دوباره ترو میشه و به جای گت کردن چت میره میسازتش درنتیجه ارور وحود داشتن همچین چتی به وجود میاد و آی دی برای چت برنمیگرده برای همین بهترین راه حل اینه که وقتی که چت رو میره گت کنه اگه که پیداش نکنه همونجا یکی بسازه ------------ حالا اینجا یه مشکلی به وجود میاد که یه جایی چتو گت میکنه اما وجود نداره و چون پیامی داده نشده هم نمیخواد که بسازدش ولی ساخته میشه بعدا به این فکر میکنیم 😂
        // firstChat
        //     ? chatId = await createChat(userInfo._id, contactId)
        //     : chatId = await fetchChat(userInfo._id, contactId, dispatch, setFirstChat)
        // ------------------------

        // console.log('chat Id : ', chatId)

        newMessage = {
            content: {
                contentType: 'text',
                text: input
            },
            senderId: userInfo._id
        }

        chatId
            ? createMessage(chatId, newMessage, dispatch)
            : null

        setInput('')


        if(socket) {
            socket.emit('sendMessage', contactId,newMessage)
        }
        
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