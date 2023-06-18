"use client"

import { HiOutlineHandRaised } from 'react-icons/hi2'

export default function MoreAction() {

    return (
        <div className="w-full flex flex-col gap-5 items-start p-5 bg-white
                shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)] ">
            {/* <div className='flex gap-7 bg-green-400'>
            <HiOutlineHandRaised className='text-2xl items-start w-[-webkit-fill-available]' />
                <p className='text-sm'>
                    Block user
                </p>
            </div> */}
            <div className='flex gap-7 text-red-500 cursor-pointer'>
                <HiOutlineHandRaised className='text-2xl' />
                <p className='text-sm'>
                    Block user
                </p>
            </div>
        </div>
    )
}
