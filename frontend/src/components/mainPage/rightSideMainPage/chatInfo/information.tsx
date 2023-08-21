"use client"
import { FC } from 'react'
import Image from "next/image"
import { useAppSelector } from '@/src/redux/hooks'
import { profilePicHandler } from '@/src/helper/userInformation'

interface InformatinProps {
}

const Informatin: FC<InformatinProps> = () => {

    const contact = useAppSelector(state => state.userContact).Contact

    return (
        <div className={`w-full flex gap-5 items-center p-5 bg-white
            shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)]`}>
            <Image
                width={500}
                height={0}
                src={profilePicHandler(contact)}
                alt=""
                className="w-[70px] h-[70px] object-cover rounded-full"
            />
            <div>
                <h1 className="font-semibold">{contact.name ? contact.name : 'user name'}</h1>
                <p className="whitespace-nowrap text-gray-400 text-sm">last seen within a week</p>
            </div>
        </div>
    )
}


export default Informatin