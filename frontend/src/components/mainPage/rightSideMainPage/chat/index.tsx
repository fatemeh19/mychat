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

const getUser = async (id: string) => {
    const { token } = UseLocalStorage()
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const res = await callApi().get(`/main/user/contact/${id}`, config)
    // console.log('res in user : ', res)
    // contact
    // :
    // name: "فاطمه ویسی"
    // phoneNumber:"09919947327"
    // profilePic:"D:\\workspace\\team-project\\frontend\\public\\uploads\\1687171518494.jpg"
    // _id:"648d5b001a77b1f3fa184c90"
    return res.data

}

const Chat = async ({ infoState, setInfoVState, userId } : chatProps) => {
    // const User = await getUser(params.userId)
    // console.log('User : ', User)
    // const [message, contact] = getUser(userId)
    const data = await getUser(userId)
    // console.log('data : ', data)
    const User = data.value.contact
    console.log('chat')

    return (
        // <div className="">
        <div className="flex flex-col w-full h-screen relative min-w-fit">
            <ChatHeader infoState={infoState} setInfoVState={setInfoVState} User={User}/>
            <ChatMessages />
            <ChatSendBox />
        </div>
        // </div>
    )
}

export default Chat