"use client"

import Image from "next/image"
import { FC, useRef, useState } from "react"
import { io } from "socket.io-client";

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

    const token = localStorage.getItem('token')
    let bearerToken = `Bearer ${token}`

    const profilePicName = contact.profilePic ? (contact.profilePic).split(`\\`) : '';
    // const socket = useRef(io('http://localhost:3000/'))
    const [online, setOnline] = useState(false)
    // console.log('socket on chat ', socket)
    const contactId = contact._id;
    // socket.current.on('onlineContact', (contactId: string, callback) => {
    //     console.log('online contact : ' + contactId)
    //     callback("contact online")
    //     setOnline(true)
    // });
    return (
        <div key={contact._id} className='w-full flex gap-4 mt-3 pl-[15px] py-2 hover:bg-gray-100'
            onClick={() => handleOpen()}>
            <Image
                src={contact.profilePic ? `/uploads/picture/${profilePicName[profilePicName.length - 1]}`
                    : '/uploads/picture/defaultProfilePic.png'}
                className="w-[50px] h-[50px] object-cover rounded-full "
                width={500} height={50} alt="contact-profile" />
            <div className="contact-details h-full pt-1 gap-1 grid w-full">
                <p className="contact-name font-bold text-sm">{contact.name}</p>
                <p className="status text-xs text-sky-500">
                    {online ?
                        'Online'
                        : 'Offline'
                    }
                </p>
            </div>
        </div>

    )
}

export default ContactBox