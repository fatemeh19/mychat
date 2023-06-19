"use client"
import { FC } from 'react'
import Image from "next/image"

interface InformatinProps {
    User: any
}

const Informatin: FC<InformatinProps> = ({ User }) => {
    console.log('user info : ', User)
    const profilePicName = (User?.profilePic)?.split(`\\`);

    return (
        <div className="w-full flex gap-5 items-center p-5 bg-white
        shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)]">
            <Image
                width={500}
                height={0}
                // src={'/images/girl-profile3.jpg'}
                src={User ? `/uploads/${profilePicName[profilePicName?.length - 1]}` : ''}
                alt=""
                className="w-[70px] h-[70px] object-cover rounded-full"
            />
            <div>
                <h1 className="font-semibold">{User?.name}</h1>
                <p className="whitespace-nowrap text-gray-400 text-sm">last seen within a week</p>
            </div>
        </div>
    )
}


export default Informatin