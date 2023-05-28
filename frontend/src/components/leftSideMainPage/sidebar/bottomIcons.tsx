"use client"

import {MoonIcon} from "../../home/HomeIcons";
import {NotificationIcon} from "../../home/HomeIcons";

import Image from "next/image"

export default function BottomIcons(){

    return (
        
            <div className="absolute w-full grid justify-center bottom-10">
                <NotificationIcon />
                <MoonIcon />
                <hr className="w-full text-gray-300  opacity-[.5]" />
                <div className='flex justify-center mt-10'>
                    <Image src={'/images/girl-profile3.jpg'} className="rounded-xl" width={50} height={50} alt="profile-icon" />
                </div>
            </div>
       
    )
}
