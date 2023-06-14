"use client"

import Image from "next/image"
import { FC } from "react"
interface ContactBoxProps {
    // status: Boolean,
    // lastMessage: string,
    // ContactSeen: Boolean,
    // lastMessageTime: string,
    // numberOfUnSeen: string,
    // recivedMessage:Boolean,
    // lastMessegeByContact:Boolean,
    // isTyping:Boolean,
    // ContactName:string,
    // chatOpenned:Boolean
}

const ContactBox: FC<ContactBoxProps> = ({
    // status,
    // lastMessage,
    // ContactSeen,
    // lastMessageTime,
    // numberOfUnSeen,
    // recivedMessage,
    // lastMessegeByContact,
    // isTyping,
    // ContactName,
    // chatOpenned
}) => {

    return (
                    <div className='w-full flex gap-2   mt-3'>
                        <Image src={'/images/girl-profile3.jpg'} className="w-[50px] h-[50px] rounded-full " width={50} height={50} alt="contact-profile" />
                        <div className="contact-details h-full pt-1 gap-1 grid w-full">
                            <p className="contact-name font-bold text-sm">Contact Name</p>
                            <p className="status text-xs text-sky-500">Online</p>
                        </div>
                    </div>
        
    )
}

export default ContactBox