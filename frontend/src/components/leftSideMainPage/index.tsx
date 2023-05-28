"use client"

import SideBar from "./sideBar"
import ChatList from "./chatList"

export default function LeftSideMainPage(){

    return (
        <div className="grid grid-cols-4">
            <div className="col-span-1">
                <SideBar />
            </div>
            <div className="col-span-3 ">
                <ChatList />
            </div>
        </div>
    )
}
