"use client"

import Image from "next/image"


export default function Informatin() {

    return (
        <div className="w-full flex gap-5 items-center p-5 bg-white
        shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)]">
            <Image
                width={70}
                height={0}
                src={'/images/girl-profile3.jpg'}
                alt=""
                className="rounded-full"
            />
            <div>
                <h1 className="font-semibold">fatemeh</h1>
                <p className="whitespace-nowrap text-gray-400 text-sm">last seen within a week</p>
            </div>
        </div>
    )
}
