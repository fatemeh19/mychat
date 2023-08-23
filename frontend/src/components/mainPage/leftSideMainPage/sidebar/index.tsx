"use client"

import { useAppSelector } from "@/src/redux/hooks";
import { useEffect, useState } from "react";
import {
    AllMessageIcon,
    MenuIcon,
    ShowFolder
    // @ts-ignore
} from "../../../icons/home/HomeIcons";
export default function SideBar() {
    const folders = useAppSelector(state => state.folders).folders
    const [open, setOpen] = useState(true)

    // useEffect(() => {
    //     console.log('folders : ', folders)
    // }, [folders])

    return (
        <div className="h-screen bg-mainColor relative  dark:bg-bgColorDark">

            <MenuIcon />
            <AllMessageIcon open={open} setOpen={setOpen} />
            {
                (folders.length === 0) ? null
                    : folders.map((folder) => (
                        <ShowFolder key={folder._id} folder={folder} setOpen={setOpen} />
                    ))
            }
        </div>
    )
}