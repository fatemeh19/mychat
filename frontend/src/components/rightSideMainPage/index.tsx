"use client"

import Chat from "./chat"

export default function RightSideMainPage() {

    return (
        <div className="grid grid-cols-12 gap-[2px]">
            <div className="col-span-8  ">
                <Chat />
            </div>
            <div className="col-span-4 bg-green-600 ">
                two
            </div>
        </div>
    )
}
