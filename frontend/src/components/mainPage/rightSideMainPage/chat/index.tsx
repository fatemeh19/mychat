"use client"

import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import ChatHeader from "./chatHeader"
import ChatMessages from "./chatMessages"
import ChatSendBox from "./chatSendBox"
import UseLocalStorage from "@/src/helper/useLocalStorate";
import callApi from "@/src/helper/callApi";
import { useAppDispatch } from "@/src/redux/hooks";
import { addUser } from "@/src/redux/features/userSlice";

interface chatProps {
    infoState: boolean,
    setInfoVState: Dispatch<SetStateAction<boolean>>;
    contactId: any,
    online : boolean
}

const getUser = async (id: string) => {
    const { token } = UseLocalStorage()
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const res = await callApi().get(`/main/contact/${id}`, config)
    
    console.log('res from get user : ', res)
    
    return res.data.value.contact

}

const Chat: FC<chatProps> = ({ infoState, setInfoVState, contactId, online }) => {

    const [User, setUser] = useState()
    const dispatch = useAppDispatch()

    useEffect(() => {
        (async () => {
            console.log('effect')
            let UserDB = await getUser(contactId)
            
            setUser(UserDB)
            dispatch(addUser(UserDB))
            console.log('user in effect : ', User)
        })()
    }, [])


    return (
        <div className="flex flex-col w-full h-screen relative min-w-fit">
            <ChatHeader infoState={infoState} setInfoVState={setInfoVState} User={User} online={online}/>
            <ChatMessages />
            <ChatSendBox />
        </div>
    )
}

export default Chat