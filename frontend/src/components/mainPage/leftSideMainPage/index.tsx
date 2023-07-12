"use client"

import SideBar from "./sidebar"
import ChatList from "./chatList"
import { useEffect } from "react"
import { fetchUserContactsListData, fetchUserProfileData } from "@/src/helper/userInformation"
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks"
import { io } from "socket.io-client";
import { addSocket } from "@/src/redux/features/socketSlice"


export default function LeftSideMainPage() {
    const dispatch = useAppDispatch()

    const userInfo = useAppSelector(state => state.userInfo).User
    const contactId = useAppSelector(state => state.userContact).Contact._id
    const socket = useAppSelector(state => state.socket).Socket

    const token = localStorage.getItem('token')
    let barearToken = 'Bearer ' + token


    useEffect(() => {
        fetchUserContactsListData(dispatch);
        fetchUserProfileData(dispatch);
    }, [])
    
    useEffect(() => {
        socket?.emit('online', userInfo._id)
        console.log('user online')
        // const socketIO = io('http://localhost:3000', {
        //     auth: {
        //         token: barearToken
        //     }
        // })
        // dispatch(addSocket(socketIO))
    }, [socket])

    return (
        <div className="
        grid 
        lg:grid-cols-6
        tablet:grid-cols-2
        grid-cols-12
        ">

            <div className="
            tablet:col-span-1 
            sm:block
            hidden
            ">
                <SideBar />
            </div>
            <div className="
            lg:col-span-5
            tablet:col-span-1
            col-span-12
            ">
                <ChatList />
            </div>
        </div>
    )
}