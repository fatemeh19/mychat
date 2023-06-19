"use client"

import { Dispatch, FC, SetStateAction } from "react";
import ChatHeader from "./chatHeader"
import ChatMessages from "./chatMessages"
import ChatSendBox from "./chatSendBox"
import UseLocalStorage from "@/src/helper/useLocalStorate";
import callApi from "@/src/helper/callApi";

interface chatProps {
    infoState: boolean,
    setInfoVState: Dispatch<SetStateAction<boolean>>;
    userId: any
}

async function getUser(id: string) {
    const { token } = UseLocalStorage()
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const res = await callApi().get(`/main/user/contact/${id}`, config)
    console.log('res in user : ', res)

}

const Chat:FC<chatProps> = ({ infoState, setInfoVState, userId }) => {
    // const User = await getUser(params.userId)
    // console.log('User : ', User)

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