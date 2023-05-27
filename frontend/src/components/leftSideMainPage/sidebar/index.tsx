"use client"

import LogoIcon from "./icons/logo";
import DashbordIcon from "./icons/dashbord";
import ChatIcon from "./icons/chat";
import ContactsIcon from "./icons/contacts";
import CalenderIcon from "./icons/calender";
import SettingIcon from "./icons/setting";
import BottomIcons from "./BottomIcons";


export default function SideBar(){

    return (
        <div className="h-screen bg-mainColor relative pt-12">
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
