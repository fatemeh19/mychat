"use client"

import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import ChatHeader from "./chatHeader"
import ChatMessages from "./chatMessages"
import ChatSendBox from "./chatSendBox"
import UseLocalStorage from "@/src/helper/useLocalStorate";
import callApi from "@/src/helper/callApi";
import { useAppDispatch } from "@/src/redux/hooks";
import { addUserContact } from "@/src/redux/features/userContactSlice";

interface chatProps {
    infoState: boolean,
    setInfoVState: Dispatch<SetStateAction<boolean>>;
    contactId: any,
    online : boolean,
    firstChat:boolean
}

const getUser = async (id: string) => {
    // const { token } = UseLocalStorage()
    const token = localStorage.getItem('token')
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const res = await callApi().get(`/main/contact/${id}`, config)
    
    console.log('res from get user : ', res)
    
    return res.data.value.contact

}

const Chat: FC<chatProps> = ({ infoState, setInfoVState, contactId, online, firstChat }) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        (async () => {
            // console.log('effect')
            let userContact = await getUser(contactId)
            
            dispatch(addUserContact(userContact))
            // console.log('user in effect : ', userContact)
        })()
    }, [])

    return (
        <div className="flex flex-col w-full h-screen relative min-w-fit">
            <ChatHeader infoState={infoState} setInfoVState={setInfoVState}  online={online}/>
            <ChatMessages />
            <ChatSendBox firstChat={firstChat} contactId={contactId} />
        </div>
    )
}

export default Chat