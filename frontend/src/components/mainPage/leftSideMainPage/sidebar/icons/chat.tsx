"use client"

import { BiMessageRoundedDots } from "react-icons/bi";
export default function ChatIcon(){

    return (
        
        <div className="flex justify-center relative py-5">
            <div className="bg-white h-[30px] w-[5px] rounded-r   absolute left-0  "></div>
            <BiMessageRoundedDots className="text-white cursor-pointer w-[30px] h-[30px]" />
        </div>
        
    )
}
