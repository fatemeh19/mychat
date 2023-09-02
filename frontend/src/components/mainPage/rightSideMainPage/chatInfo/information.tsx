"use client"
import { FC } from 'react'
import Image from "next/image"
import { useAppSelector } from '@/src/redux/hooks'
import { profilePicHandler } from '@/src/helper/userInformation'

interface InformatinProps {
}

const Informatin: FC<InformatinProps> = () => {

    const contact = useAppSelector(state => state.userContact).Contact
    const chat = useAppSelector(state => state.chat).Chat
    const privacy = useAppSelector(state => state.userInfo.setting.privacyAndSecurity).privacy

    return (
        <div className={`w-full flex flex-col gap-1 p-5 bg-white
                        shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)]`}>
            <div className={`w-full flex gap-5 items-center `}>
                <Image
                    width={500}
                    height={0}
                    src={contact.profilePic ? profilePicHandler(contact) : '/defaults/defaultProfilePic.png'}
                    alt=""
                    className="w-[70px] h-[70px] object-cover rounded-full"
                />
                <div>
                    <h1 className="font-semibold">{contact.name ? contact.name : 'user name'}</h1>
                    <p className="whitespace-nowrap text-gray-400 text-sm">{privacy.lastseen ? 'last seen within a week' : 'last seen within a week'}</p>
                </div>
            </div>

            <p>{chat.description}</p>
        </div>
    )
}


export default Informatin