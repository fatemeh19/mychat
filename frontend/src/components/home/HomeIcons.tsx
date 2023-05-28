"use client"

import { BiCalendar } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { BiGridAlt } from "react-icons/bi";
import { BiConversation } from "react-icons/bi";
import { BiBell } from "react-icons/bi";
import { BiMessageRoundedDots } from "react-icons/bi";
import { IoIosMoon } from "react-icons/io";
import { IoIosSunny } from "react-icons/io";
import { BiCog } from "react-icons/bi";
export  function CalenderIcon(){

    return (
        
        <div className="flex justify-center py-5">
            <BiCalendar className="text-white cursor-pointer opacity-[.5] w-[30px] h-[30px]" />
        </div>
        
    )
}


export  function ChatIcon(){

    return (
        
        <div className="flex justify-center relative py-5">
            <div className="bg-white h-[30px] w-[5px] rounded-r   absolute left-0  "></div>
            <BiMessageRoundedDots className="text-white cursor-pointer w-[30px] h-[30px]" />
        </div>
        
    )
}


export  function ContactsIcon(){

    return (
        
        <div className="flex justify-center py-5">
            <BiUser className="text-white cursor-pointer opacity-[.5] w-[30px] h-[30px]" />
        </div>
        
    )
}


export  function DashbordIcon(){

    return (
        
        <div className="flex justify-center py-5">
            <BiGridAlt className="text-white cursor-pointer opacity-[.5] w-[30px] h-[30px]" />
        </div>
        
    )
}


export  function LogoIcon(){

    return (
        
            <div className="flex justify-center mb-10">
                <BiConversation className="text-white cursor-pointer w-[40px] h-[50px]" />
            </div>
        
    )
}


export  function MoonIcon(){

    return (
        
        <div className="flex justify-center py-5">
            <IoIosMoon className="text-white cursor-pointer opacity-[.5] w-[30px] h-[30px]" />
        </div>
        
    )
}


export  function NotificationIcon(){

    return (
        
        <div className="flex justify-center py-5">
            <BiBell className="text-white cursor-pointer opacity-[.5] w-[30px] h-[30px]" />
        </div>
        
    )
}


export  function SettingIcon(){

    return (
        
        <div className="flex justify-center py-5">
            <BiCog className="text-white cursor-pointer opacity-[.5] w-[30px] h-[30px]" />
        </div>
        
    )
}

export  function SunIcon(){

    return (
        
        <div className="flex justify-center py-5">
            <IoIosSunny className="text-white cursor-pointer opacity-[.5] w-[30px] h-[30px]" />
        </div>
        
    )
}

