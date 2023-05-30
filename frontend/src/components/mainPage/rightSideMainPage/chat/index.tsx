"use client"

import { Dispatch, FC, SetStateAction } from "react";
import ChatHeader from "./chatHeader"
import ChatMessages from "./chatMessages"
import ChatSendBox from "./chatSendBox"

interface chatProps {
    infoState: boolean,
    setInfoState: Dispatch<SetStateAction<boolean>>;
}

const Chat: FC<chatProps> = ({ infoState, setInfoState }) => {

    return (
        // <div className="">
        <div className="flex flex-col w-full h-screen relative">
            <ChatHeader infoState={infoState} setInfoState={setInfoState} />
            <ChatMessages />
            <ChatSendBox />
        </div>
        // </div>
    )
}

export default Chat