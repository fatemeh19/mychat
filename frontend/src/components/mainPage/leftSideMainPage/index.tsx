"use client"

import SideBar from "./sidebar"
import ChatList from "./chatList"
import { useEffect } from "react"
import { fetchUserChatList, fetchUserContactsListData, fetchUserProfileData, getFolders } from "@/src/helper/userInformation"
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks"
import { io } from "socket.io-client";
import { addSocket } from "@/src/redux/features/socketSlice"


export default function LeftSideMainPage() {
    const dispatch = useAppDispatch()
    const token = localStorage.getItem('token')
    let barearToken = 'Bearer ' + token


    useEffect(() => {
        fetchUserContactsListData(dispatch);
        fetchUserProfileData(dispatch);
        fetchUserChatList(dispatch);
        getFolders(dispatch)
        const socketIO = io('http://localhost:3000', {
            auth: {
                token: barearToken
            }
        })
        dispatch(addSocket(socketIO))

    }, [])

    window.addEventListener('load', () => {
        console.log('loading ...')
        if (!("Notification" in window)) {
            // Check if the browser supports notifications
            alert("This browser does not support desktop notification");
        } else if (Notification.permission !== "denied") {
            // We need to ask the user for permission
            Notification.requestPermission()
        }
    })


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