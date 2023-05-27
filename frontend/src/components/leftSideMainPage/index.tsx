"use client"

import SideBar from "./sideBar"

export default function LeftSideMainPage(){

    return (
        <div className="grid grid-cols-6">
            <div className="col-span-1">
                <SideBar />
            </div>
            <div className="col-span-5 bg-yellow-300">
                f
            </div>
        </div>
    )
}
