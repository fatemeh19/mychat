"use client"

import { BiSearch } from "react-icons/bi";
import {
    AllMessageIcon,
    MenuIcon
    // @ts-ignore
} from "../../../icons/home/HomeIcons";
export default function ChatListHeader() {

    return (
        <div className="w-full  bg-mainColor  h-auto px-5  block border-b border-gray-100
        dark:bg-bgColorDark
        sm:hidden
        ">
            
            <div className="flex gap-2 relative w-full mb-3">
                <MenuIcon />
                <span className="text-md  font-bold text-white mt-4">Messanger</span>
                <BiSearch className="absolute right-0 text-white text-xl mt-4 font-bold" />
            </div>
            {/* <AllMessageIcon /> */}
            <div className="grid relative w-fit">
                <div className="flex gap-2 mb-2">
                    <span className="text-white font-semibold">All</span>
                    <span className='text-center text-xs 
                         rounded-full w-[20px] h-[20px]  bg-white'>5</span>
                </div>
                <div className="rounded-tl-xl bg-white w-full h-1 rounded-tr-xl"></div>
            </div>
        </div>
    )
}