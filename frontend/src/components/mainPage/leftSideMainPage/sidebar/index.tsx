"use client"

import {
    AllMessageIcon,
    MenuIcon
    // @ts-ignore
} from "../../../icons/home/HomeIcons";
export default function SideBar() {

    return (
        <div className="h-screen bg-mainColor relative pt-5 dark:bg-bgColorDark">
            
            <MenuIcon />
            <AllMessageIcon />
        </div>
    )
}