"use client"

import { profilePicNameHandler, fetchUserChatList } from "@/src/helper/userInformation";
import { setChatOpenInList } from "@/src/redux/features/chatOpenInListSlice";
import { openHandle } from "@/src/redux/features/userChatListSlice";
import { contactInterface } from "@/src/redux/features/userContactListSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { Dispatch } from "@reduxjs/toolkit";
import Image from "next/image"
import { FC, LegacyRef, useEffect, useRef, useState } from "react"
import { GiCheckMark } from 'react-icons/gi'

type Contact = {
    name: string;
    _id: string;
    profilePic: string;
    status: {
        online: boolean,
        lastseen: string | Date | number
    };
}
interface ContactBoxProps {
    contact: Contact,
    isOpenChat: boolean
    handleOpen?: () => void,
    selectMember?: (contact: contactInterface, contactBoxRef: LegacyRef<HTMLDivElement> | undefined) => void,
}

const ContactBox: FC<ContactBoxProps> = ({
    contact,
    handleOpen,
    isOpenChat,
    selectMember,
}) => {
    const dispatch = useAppDispatch()
    // const [online , setOnline] = useState(contact.status.online)
    // const [lastSeen , setLastSeen] = useState(contact.status.lastseen)
    const contactId = contact._id;
    const socket = useAppSelector(state => state.socket).Socket
    const chatList = useAppSelector(state => state.userChatList).chatList
    useEffect(() => {
        socket?.on('onlineContact', (CId) => {
            console.log('contactId : ' + contactId)
            if (contactId == CId) {
                console.log('online contact : ' + CId)
                // setOnline(true)
            }

        });
        socket?.on('offlineContact', (CId) => {
            console.log('contactId : ' + contactId)
            if (contactId == CId) {
                console.log('offline contact : ' + CId)
                // setOnline(false)
                const now = Date.now();
                // setLastSeen(now)
            }

        });
    }, [socket, contactId])
    const handleClick = () => {

        for (let i = 0; i < chatList.length; i++) {
            if (chatList[i].open) {
                dispatch(openHandle(i))
            }
            if (chatList[i].contact._id == contactId) {
                dispatch(openHandle(i))
                dispatch(setChatOpenInList(true))
                break
            }
            else if (chatList.length - 1 == i) {
                dispatch(setChatOpenInList(false))
                fetchUserChatList(dispatch)
            }

        }
    }
    const contactBoxRef = useRef<HTMLDivElement>(null)
    return (
        <div key={contact._id} className='w-full flex gap-4 pl-[15px] py-3 hover:bg-gray-100'
            onClick={() => {
                handleOpen ? handleOpen() : null;
                isOpenChat ?? handleClick();
                selectMember ? selectMember(contact, contactBoxRef) : null
            }}>
            <div className={''} ref={contactBoxRef}>
                <Image
                    src={contact.profilePic ? `/uploads/picture/${profilePicNameHandler(contact)}`
                        : '/uploads/picture/defaultProfilePic.png'}
                    className="w-[56px] h-[56px] object-cover rounded-full
                             border-2 border-white"
                    width={500} height={50} alt="contact-profile" />
                <div className="w-5 h-5 bg-blue-500 absolute bottom-0 right-0 rounded-full flex items-center justify-center">
                    <GiCheckMark className="text-white" />
                </div>
            </div>
            <div className="contact-details h-full pt-1 gap-1 grid">
                <p className="contact-name font-bold text-sm">{contact.name}</p>
                <p className="status text-xs ">
                    {/* {online ?

                       <span className="text-sky-500">Online</span> 
                        : <span className="text-gray-500">{lastSeen? (new Date(lastSeen).getHours() +':' + new Date(lastSeen).getMinutes()) : ''}</span>
                    } */}
                </p>
            </div>
        </div>

    )
}

export default ContactBox