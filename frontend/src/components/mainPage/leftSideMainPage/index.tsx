"use client"

import SideBar from "./sidebar"
import ChatList from "./chatList"
import { useEffect, useRef } from "react"
import { fetchUserContactsListData, fetchUserProfileData } from "@/src/helper/userInformation"
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks"
import { io } from "socket.io-client";


export default function LeftSideMainPage() {
    const dispatch = useAppDispatch()
    const selector = useAppSelector(state => state.userInfo)
    const userInfo = selector.User
    // const { current: socket } = useRef(io('http://localhost:3000/'))
    const { current: socket } = useRef(io('http://localhost:3000/'))
    socket.emit('online', userInfo._id)
    const socketInitializer = async () => {
    }
    useEffect(() => {
        fetchUserContactsListData(dispatch);
        fetchUserProfileData(dispatch);
        socketInitializer();
    }, [])
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