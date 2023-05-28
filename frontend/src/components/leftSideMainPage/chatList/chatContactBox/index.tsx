"use client"

import Image from "next/image"
import { FC } from "react"
import { BiCheckDouble } from "react-icons/bi";
interface chatContactProps {
    status: Boolean,
    lastMessage: string,
    ContactSeen: Boolean,
    lastMessageTime: string,
    numberOfUnSeen: string,
    recivedMessage:Boolean,
    lastMessegeByContact:Boolean,
    isTyping:Boolean,
    ContactName:string,
    chatOpenned:Boolean
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
    chatOpenned
}) => {

    return (
        
        <div className={"container w-full flex py-5 gap-5 px-8 pt-8 "+ (chatOpenned ? "bg-gray-50":"" )}>
                <div className='relative contactProfile'>
                    {status ? 
                    <div className="rounded-full w-[15px] h-[15px] pt-[3px] flex justify-center bg-white absolute bottom-0 right-0">
                        <div className="rounded-full w-[10px] h-[10px]  bg-green-500"></div>
                    </div>
                    : null}
                    <Image src={'/images/girl-profile3.jpg'} className="rounded-full " width={70} height={70} alt="contact-profile" />
                </div>
                <div className='contactMessageDetail w-full grid '>
                    <div className="relative   w-full">
                        <span className='text-lg font-bold'>{ContactName}</span>
                        <div className="right-0 font-semibold text-sm top-[3px] absolute messageTimeSent text-gray-400">
                            <span>{lastMessageTime}</span>
                            
                        </div>
                    </div>
                    <div className="relative  w-full">
                        {isTyping ?
                        <span className='text-md text-green-500'>Typing...</span>
                        : <span className={"text-md "+(recivedMessage ? "text-gray-400" : (ContactSeen ? (chatOpenned ? "" : "text-gray-400") : ""))}>{lastMessage}</span>
                        }
                        {lastMessegeByContact ?
                        (recivedMessage ? null :
                        (<div className=" right-0 top-[3px] text-center text-sm font-bold absolute rounded-full w-[20px] h-[20px] bg-red-500 "><span className='text-md text-white'>{numberOfUnSeen}</span></div>)
                        )
                        :( ContactSeen ?
                            <BiCheckDouble className="text-green-500 top-[3px] text-[25px] right-0 absolute" />
                            : null
                            )
                        }
                        
                        
                    </div>
                </div>
            </div>
            
    )
}

export default ChatContactBox