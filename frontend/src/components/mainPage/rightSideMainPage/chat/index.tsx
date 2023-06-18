"use client"

import { Dispatch, FC, SetStateAction } from "react";
import ChatHeader from "./chatHeader"
import ChatMessages from "./chatMessages"
import ChatSendBox from "./chatSendBox"

interface chatProps {
    infoState: boolean,
    setInfoVState: Dispatch<SetStateAction<boolean>>;
}

const Chat: FC<chatProps> = ({ infoState, setInfoVState }) => {

    return (
        // <div className="">
        <div className="flex flex-col w-full h-screen relative min-w-fit">
            <ChatHeader infoState={infoState} setInfoVState={setInfoVState} />
            <ChatMessages />
            <ChatSendBox />
        </div>
        // </div>
    )
}

export default Chat