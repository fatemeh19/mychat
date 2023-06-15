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
import {useState} from 'react';
import Contacts from "../../contact";

export  function CalenderIcon(){

    return (
        
        <div className="flex justify-center home-icons py-5">
            <BiCalendar className="text-white h-icon cursor-pointer opacity-[.5] w-[30px] h-[30px]" />
        </div>
        
    )
}


export  function ChatIcon(){

    return (
        
        <div className="flex justify-center relative home-icons py-5">
            <div className="bg-white h-[30px] w-[5px] rounded-r  clicked-sign absolute left-0 dark:bg-mainColor "></div>
            <BiMessageRoundedDots className="text-white h-icon cursor-pointer w-[30px] h-[30px] dark:text-[#2563eb]" />
        </div>
        
    )
}


export  function ContactsIcon(){
    const [open,setOpen]=useState(false)
    const handleOpen=()=>{
        setOpen(!open)
    }
    return (
        
        <div className="flex justify-center home-icons py-5">
            <BiUser className="text-white h-icon cursor-pointer opacity-[.5] w-[30px] h-[30px]" onClick={()=>{setOpen(true)}} />

            {open ? <Contacts open={open} handelOpen={handleOpen} /> 
            :null}
        </div>
        
    )
}


export  function DashbordIcon(){

    return (
        
        <div className="flex justify-center home-icons py-5">
            <BiGridAlt className="text-white h-icon cursor-pointer opacity-[.5] w-[30px] h-[30px]" />
        </div>
        
    )
}


export  function LogoIcon(){

    return (
        
            <div className="flex justify-center logo-icon mb-10">
                <BiConversation className="text-white cursor-pointer w-[40px] h-[50px]" />
            </div>
        
    )
}


export  function MoonIcon(){

    return (
        
        <div className="flex justify-center home-icons py-5">
            <IoIosMoon className="text-white h-icon cursor-pointer opacity-[.5] w-[30px] h-[30px]" />
        </div>
        
    )
}


export  function NotificationIcon(){

    return (
        
        <div className="flex justify-center home-icons py-5">
            <BiBell className="text-white h-icon cursor-pointer opacity-[.5] w-[30px] h-[30px]" />
        </div>
        
    )
}


export  function SettingIcon(){

    return (
        
        <div className="flex justify-center home-icons py-5">
            <BiCog className="text-white h-icon cursor-pointer opacity-[.5] w-[30px] h-[30px]" />
        </div>
        
    )
}

export  function SunIcon(){

    return (
        
        <div className="flex justify-center home-icons py-5">
            <IoIosSunny className="text-white h-icon cursor-pointer opacity-[.5] w-[30px] h-[30px]" />
        </div>
        
    )
}

