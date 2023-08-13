"use client"

import { useAppSelector } from "@/src/redux/hooks";
import {
    AllMessageIcon,
    MenuIcon,
    ShowFolder
    // @ts-ignore
} from "../../../icons/home/HomeIcons";
export default function SideBar() {
    const folders = useAppSelector(state => state.folders).folders
    return (
        <div className="h-screen bg-mainColor relative  dark:bg-bgColorDark">

            <MenuIcon />
            <AllMessageIcon />
            {
                (folders.length === 0) ? null
                    : folders.map((folder) => (
                        <ShowFolder key={folder._id} folder={folder} />
                    ))
            }
        </div>
    )
}