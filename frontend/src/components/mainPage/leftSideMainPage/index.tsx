"use client"

import SideBar from "./sidebar"
import ChatList from "./chatList"
import { useEffect } from "react"
import { fetchUserContactsListData, fetchUserProfileData } from "@/src/helper/userInformation"
import { useAppDispatch } from "@/src/redux/hooks"


export default function LeftSideMainPage(){
    const dispatch=useAppDispatch()
    useEffect(() => {
        fetchUserContactsListData(dispatch);
        fetchUserProfileData(dispatch);
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