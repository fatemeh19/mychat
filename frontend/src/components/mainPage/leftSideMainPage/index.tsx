"use client"

import SideBar from "./sidebar"
import ChatList from "./chatList"

export default function LeftSideMainPage(){
    console.log(localStorage.getItem('token'))
    return (
        <div className="grid grid-cols-6">
            <div className="col-span-1">
                <SideBar />
            </div>
            <div className="col-span-5 ">
                <ChatList />
            </div>
        </div>
    )
}