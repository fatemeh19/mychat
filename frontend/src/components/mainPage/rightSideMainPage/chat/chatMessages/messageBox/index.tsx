"use client"

import Image from "next/image"

const MessageBox = () => {

    return (
        <div className="">
            <div className="flex gap-3">
                <Image
                    src={'/images/girl-profile3.jpg'}
                    width={45}
                    height={0}
                    alt=""
                    className="rounded-full"
                />
                <div className="content flex flex-col">
                    <div className="flex gap-2 items-end  ">
                        <h1 className="name font-bold text-sm text-center">Putri Tanjak</h1>
                        <p className="date text-xs text-[#9a9a9a] mb-[.5px]">9:12 AM</p>
                    </div>
                    {/* message content */} message
                </div>
            </div>
        </div>
    )
}

export default MessageBox