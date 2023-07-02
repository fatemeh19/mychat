"use client"

import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import ChatHeader from "./chatHeader"
import ChatMessages from "./chatMessages"
import ChatSendBox from "./chatSendBox"
import callApi from "@/src/helper/callApi";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { addUserContact } from "@/src/redux/features/userContactSlice";

interface chatProps {
    infoState: boolean,
    setInfoVState: Dispatch<SetStateAction<boolean>>;
    contactId: any,
    online : boolean,
    firstChat:boolean,
    setFirstChat:Dispatch<SetStateAction<boolean>>
}

const getContact = async (id: string) => {
    const token = localStorage.getItem('token')
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const res = await callApi().get(`/main/contact/${id}`, config)
    console.log('res - getContact in chat component : ', res)
    
    return res.data.value.contact
}

const Chat: FC<chatProps> = ({ infoState, setInfoVState, contactId, online, firstChat, setFirstChat }) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        (async () => {
            let userContact = await getContact(contactId)
            dispatch(addUserContact(userContact))
        })()
        
    }, [])

    return (
        <div className="flex flex-col w-full h-screen relative min-w-fit">
            <ChatHeader infoState={infoState} setInfoVState={setInfoVState}  online={online}/>
            <ChatMessages />
            <ChatSendBox firstChat={firstChat} setFirstChat={setFirstChat} contactId={contactId} />
        </div>
    )
}

export default Chat