"use client"

import NotificationIcon from "./icons/notification";
import MoonIcon from "./icons/moon";
import Image from "next/image"

export default function BottomIcons(){

    return (
        
            <div className="absolute w-full px-5 bottom-10">
                <NotificationIcon />
                <MoonIcon />
                <hr className="w-full text-gray-300  opacity-[.5]" />
                <div className='flex justify-center mt-10'>
                    <Image src={'/images/girl-profile3.jpg'} className="rounded-xl" width={50} height={50} alt="profile-icon" />
                </div>
            </div>
       
    )
}
