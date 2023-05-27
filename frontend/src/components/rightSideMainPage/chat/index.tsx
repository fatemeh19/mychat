"use client"

import ChatHeader from "./chatHeader"
import ChatMessages from "./chatMessages"
import ChatSendBox from "./chatSendBox"

export default function Chat() {

    return (
        // <div className="">
        <div className="container flex flex-col w-full">
            <ChatHeader />
            <ChatMessages />
            <ChatSendBox />
        </div>
        // </div>
    )
}
