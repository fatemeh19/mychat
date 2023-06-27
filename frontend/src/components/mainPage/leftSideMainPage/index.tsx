"use client"

import SideBar from "./sidebar"
import ChatList from "./chatList"

export default function LeftSideMainPage(){
    return (
        <div className="
        grid 
        lg:grid-cols-6
        sm:grid-cols-4
        grid-cols-12
        ">
            
            <div className="
            lg:col-span-1
            sm:col-span-2 sm:block
            hidden
            ">
                <SideBar />
            </div>
            <div className="
            lg:col-span-5
            sm:col-span-2
            col-span-12
            ">
                <ChatList />
            </div>
        </div>
    )
}