"use client"

import {
    LogoIcon,
    DashbordIcon,
    ChatIcon,
    ContactsIcon,
    CalenderIcon,
    SettingIcon
} from "../../../icons/home/HomeIcons";

import BottomIcons from "./bottomIcons";

export default function SideBar() {

    return (
        <div className="h-screen bg-mainColor relative pt-10">
            <LogoIcon />
            <DashbordIcon />
            <CalenderIcon />
            <ChatIcon />
            <ContactsIcon />
            <SettingIcon />
            <BottomIcons />
        </div>
    )
}