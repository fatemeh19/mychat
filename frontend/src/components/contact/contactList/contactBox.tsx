"use client"

import { setChatOpenInList } from "@/src/redux/features/chatOpenInListSlice";
import { openHandle } from "@/src/redux/features/userChatListSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import Image from "next/image"
import { FC, useEffect, useState } from "react"
import { useDispatch } from "react-redux";

type Contact = {
    name: string;
    _id: string;
    profilePic: string;
}
interface ContactBoxProps {
    contact: Contact,
    handleOpen: () => void
}

const ContactBox: FC<ContactBoxProps> = ({
    contact,
    handleOpen
}) => {
    const dispatch = useAppDispatch()
    const profilePicName = contact.profilePic ? (contact.profilePic).split(`\\`) : '';
    const [online, setOnline] = useState(false)
    const contactId = contact._id;
    const socket = useAppSelector(state => state.socket).Socket
    const chatList = useAppSelector(state => state.userChatList).chatList
    useEffect(() => {
        socket?.on('onlineContact', (contactId) => {
            console.log('online contact : ' + contactId)
            setOnline(!online)
        });
    }, [socket])
    const handleClick=()=>{
        
        for(let i=0;i<chatList.length;i++){
            if(chatList[i].open){
                dispatch(openHandle(i))
            }
            if(chatList[i].contact._id==contactId){
                dispatch(openHandle(i))
                dispatch(setChatOpenInList(true))
            }
            else if(chatList.length-1==i ){
                dispatch(setChatOpenInList(false))
            }
            
        }
    }
    return (
        <div key={contact._id} className='w-full flex gap-4 mt-3 pl-[15px] py-2 hover:bg-gray-100'
            onClick={() => {handleOpen();handleClick();}}>
            <Image
                src={contact.profilePic ? `/uploads/picture/${profilePicName[profilePicName.length - 1]}`
                    : '/uploads/picture/defaultProfilePic.png'}
                className="w-[50px] h-[50px] object-cover rounded-full "
                width={500} height={50} alt="contact-profile" />
            <div className="contact-details h-full pt-1 gap-1 grid w-full">
                <p className="contact-name font-bold text-sm">{contact.name}</p>
                <p className="status text-xs ">
                    {online ?

                       <span className="text-sky-500">Online</span> 
                        : <span className="text-gray-500">Offline</span>
                    }
                </p>
            </div>
        </div>

    )
}

export default ContactBox