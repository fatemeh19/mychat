"use client"

import { setOpenChat } from "@/src/redux/features/openChatSlice";
import { useAppDispatch } from "@/src/redux/hooks";
import Image from "next/image"
import { FC, useRef, useState } from "react"
import { BiCheckDouble } from "react-icons/bi";
import io from 'socket.io-client'
import { Socket } from "socket.io-client"
interface chatContactProps {
    status?: Boolean,
    lastMessage: string,
    ContactSeen: Boolean,
    lastMessageTime: string,
    numberOfUnSeen: string,
    recivedMessage:Boolean,
    lastMessegeByContact:Boolean,
    isTyping:Boolean,
    ContactName:string,
    chatOpennedP?:Boolean,
    profilePicName:string
}

const ChatContactBox: FC<chatContactProps> = ({
    status,
    lastMessage,
    ContactSeen,
    lastMessageTime,
    numberOfUnSeen,
    recivedMessage,
    lastMessegeByContact,
    isTyping,
    ContactName,
    chatOpennedP,
    profilePicName
}) => {
    const dispatch = useAppDispatch()
            
    const handler=()=>{
        // setChatOpenned(true);
        // dispatch(setOpenChat(true))
    }
    const [chatOpenned,setChatOpenned]=useState(false)
    const socket = useRef(io('http://localhost:3000'))
    const [online , setOnline] = useState(false)
    socket.current.on('onlineContact', (contactId: any) => {
        console.log('online contact',contactId)
        console.log(contactId)
        setOnline(true)
    });

    return (
        
        <div 
        onClick={handler}
        className={`container cursor-pointer w-full flex p-5 gap-5 container-chatbox  
        lg:gap-5  lg:p-5 lg:justify-normal 
        tablet:px-2 tablet:py-3 tablet:gap-0 tablet:justify-center 
        ${chatOpenned ? "bg-gray-50 dark:bg-[rgb(53,55,59)]": 
        (chatOpennedP ? "bg-gray-50 dark:bg-[rgb(53,55,59)]": '') }`}>
                <div className='relative contactProfile h-full'>
                    {(status || online) ? 
                    <div className="rounded-full w-[15px] h-[15px] pt-[3px] flex justify-center bg-white absolute bottom-0 right-0 
                    dark:bg-[rgb(36,36,36)]
                    tablet:top-0">
                        <div className="rounded-full w-[10px] h-[10px]  bg-green-500"></div>
                    </div>
                    : null}
                    {lastMessegeByContact ?
                        (recivedMessage ? null :
                        (<span className='hidden right-0 bottom-0 text-center text-xs 
                        font-bold absolute rounded-full px-[7px] py-[2px]  bg-mainColor text-white
                        tablet:block'>
                            {numberOfUnSeen}</span>)
                        )
                        :null
                        
                    }
                    <Image
                    src={profilePicName}
                    className="
                    
                    h-[50px] w-[50px] min-h-[50px] min-w-[50px]
                    object-cover rounded-full  " width={500} height={0} alt="contact-profile" />
                </div>
                <div className='contactMessageDetail w-full 
                    lg:grid 
                    tablet:hidden
                    grid
                    '>
                    <div className="relative   w-full">
                        <span className='text-md font-bold contact-name w-3/5 inline-block truncate dark:text-white '>{ContactName}</span>
                        <div className="right-0 font-semibold text-sm top-[3px] absolute messageTimeSent text-gray-400">
                            <span className="last-mes-time">{lastMessageTime}</span>
                            
                        </div>
                    </div>
                    <div className="relative mess-detail2 w-full">
                        {isTyping ?
                        <span className='text-sm text-green-500'>Typing...</span>
                        : <span className={"text-sm truncate last-mes w-5/6 inline-block "+(recivedMessage ? "text-gray-400" : (ContactSeen ? (chatOpenned ? "dark:text-white" : "text-gray-400") : "dark:text-white"))}>{lastMessage}</span>
                        }
                        {lastMessegeByContact ?
                        (recivedMessage ? null :
                        (<span className=' right-0 top-[3px] text-center text-xs font-bold absolute rounded-full px-[7px] py-[2px]  bg-mainColor text-white'>{numberOfUnSeen}</span>)
                        )
                        :( ContactSeen ?
                            <BiCheckDouble className="check-mes-seen text-green-500 top-[3px] text-[25px] right-0 absolute" />
                            : null
                            )
                        }
                        
                        
                    </div>
                </div>
            </div>
            
    )
}

export default ChatContactBox