"use client"

import Image from "next/image"
import { FC } from "react"

interface NoContactProps {
    
}

const NoContact: FC<NoContactProps> = ({
    
}) => {
    return (
        <div className="grid gap-0 items-center justify-center w-full h-full">
            <div className='flex justify-center w-full'>
                <Image src={"/images/duck.gif"} 
            width={500} height={0} alt="0 contact"
            className="w-[180px] h-[200px]"/>
            </div>
            <h1 className="w-full font-bold mt-2 text-gray-800">
                You have no contact in Messenger
            </h1>
            
        </div>
    )
}

export default NoContact