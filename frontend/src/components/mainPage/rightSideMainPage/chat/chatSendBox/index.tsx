"use client"

import { RiSendPlaneFill } from 'react-icons/ri'
import { ImAttachment } from 'react-icons/im'
import { FiMic } from 'react-icons/fi'


export default function ChatSendBox() {

    return (
        <div className="bg-white w-full bottom-0 p-5 px-6">
            <div className="w-full col-span-1 bg-[#f5f5f5] flex rounded-md p-3 items-center">
                <input type="text" className='bg-transparent w-full' placeholder='Text Message' />
                <div className="icons flex text-md gap-2 mr-3 text-gray-500">
                    <ImAttachment className='cursor-pointer' />
                    <FiMic className='cursor-pointer' />

                </div>
                <div className="sendIcons border-l-2 border-gray-400 pl-3 text-xl">
                    <RiSendPlaneFill className='cursor-pointer' />
                </div>
            </div>
        </div>
    )
}
