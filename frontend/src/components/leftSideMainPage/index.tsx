"use client"

import SideBar from "./sideBar"
import ChatList from "./chatList"

export default function LeftSideMainPage(){

    return (
        <div className="grid grid-cols-6">
            <div className="col-span-1">
                <SideBar />
            </div>
<<<<<<< HEAD
            <div className="col-span-3 ">
                <ChatList />
=======
            <div className="col-span-5 bg-yellow-300">
                f
>>>>>>> 9f1a6c2b1eee64e834360b29192d42d92a689a25
            </div>
        </div>
    )
}
