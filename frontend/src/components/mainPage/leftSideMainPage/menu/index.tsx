"use client"

import {
    BiUser,
    BiCog,
    BiGroup,
    BiSave

} from "react-icons/bi";
import { IoIosMoon} from "react-icons/io";
import { FC } from "react";
import Image  from 'next/image'
interface MenuProps {
    handleMenu: ()  => void ,
    contactListOpenHandler:  ()  => void
}

const Menu: FC<MenuProps> = ({
    handleMenu,
    contactListOpenHandler
}) => {
    
    return (
        <>
        <div className="overflow-hidden  w-full h-[80vh] relative select-none">
            <div className="bg-mainColor w-full h-auto px-2 pt-3 pb-1">
                <Image
                        src='/images/girl-profile3.jpg'
                        className="mt-3 h-[50px] w-[50px] min-h-[70px] min-w-[70px]  object-cover rounded-full  "
                        width={500} height={0} alt="contact-profile" />

                <p className="text-white font-bold mt-3 mb-1">KOSAR</p>
                <p className="text-gray-100 mb-2 text-sm">09028087882</p>
            </div>
            <div className="flex gap-5 p-2 mt-3 cursor-pointer hover:bg-gray-100">
                <BiGroup className="text-gray-500 text-2xl"/>
                <span className="text-base">New Group</span>
            </div>
            <div className="flex gap-5 p-2 cursor-pointer hover:bg-gray-100" 
                onClick={()=>{
                    handleMenu();
                    contactListOpenHandler();
                }}>
                <BiUser className="text-gray-500 text-2xl"  />
                <span className="text-base">Contacts</span>
                
            </div>
            <div className="flex gap-5 p-2 cursor-pointer hover:bg-gray-100">
                <BiSave className="text-gray-500 text-2xl"/>
                <span className="text-base">Saved Message</span>
            </div>
            <div className="flex gap-5 p-2 cursor-pointer hover:bg-gray-100">
                <BiCog className="text-gray-500 text-2xl"/>
                <span className="text-base">Setting</span>
            </div>
            <div className="flex gap-5 p-2 cursor-pointer hover:bg-gray-100">
                <IoIosMoon className="text-gray-500 text-2xl"/>
                <span className="text-base">Night Mode</span>
            </div>
        </div>
        
    </>
    )
}

export default  Menu;