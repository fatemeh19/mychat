"use client"

import {LogoIcon} from "../../home/HomeIcons";
import {DashbordIcon} from "../../home/HomeIcons";
import {ChatIcon} from "../../home/HomeIcons";
import {ContactsIcon} from "../../home/HomeIcons";
import {CalenderIcon} from "../../home/HomeIcons";
import {SettingIcon} from "../../home/HomeIcons";
import BottomIcons from "./bottomIcons";


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
