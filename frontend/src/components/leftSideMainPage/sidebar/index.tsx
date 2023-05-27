"use client"

import LogoIcon from "./icons/logo";
import DashbordIcon from "./icons/dashbord";
import ChartIcon from "./icons/chart";
import ChatIcon from "./icons/chat";
import ContactsIcon from "./icons/contacts";
import CalenderIcon from "./icons/calender";
export default function SideBar(){

    return (
        <div className="h-screen bg-mainColor  pt-12">
            <LogoIcon />
            <DashbordIcon />
            <ChartIcon />
            <CalenderIcon />
            <ChatIcon />
            <ContactsIcon />
        </div>
    )
}
