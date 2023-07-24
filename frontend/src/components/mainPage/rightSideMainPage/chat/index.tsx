"use client"

import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import ChatHeader from "./chatHeader"
import ChatMessages from "./chatMessages"
import ChatSendBox from "./chatSendBox"
import callApi from "@/src/helper/callApi";
import { useAppDispatch } from "@/src/redux/hooks";
import { addUserContact } from "@/src/redux/features/userContactSlice";
import { Suspense } from 'react'

interface chatProps {
    infoState: boolean,
    setInfoVState: Dispatch<SetStateAction<boolean>>;
    contactId: any
}

const getContact = async (id: string) => {
    const token = localStorage.getItem('token')
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const res = await callApi().get(`/main/contact/${id}`, config)
    console.log('get userContact : ', res)
    return res.data.value.contact
}

const Chat: FC<chatProps> = ({ infoState, setInfoVState, contactId }) => {

    const dispatch = useAppDispatch()
    console.log('run chat component')

    useEffect(() => {
        (async () => {
            let userContact = await getContact(contactId)
            dispatch(addUserContact(userContact))
        })()

    }, [])

    return (
        <div className="flex flex-col w-full h-screen min-w-fit">
            <ChatHeader infoState={infoState} setInfoVState={setInfoVState} />
            <Suspense fallback={<p>Loading chat ...</p>} >
                <ChatMessages />

            </Suspense>
            <ChatSendBox contactId={contactId} />
        </div>
    )
}

export default Chat