"use client"

import Chat from "./chat"

export default function RightSideMainPage() {

    return (
        <div className="grid grid-cols-8">
            <div className="col-span-5 ">
                <Chat />
            </div>
            <div className="col-span-3 bg-green-600 ">
                two
            </div>
        </div>
    )
}
