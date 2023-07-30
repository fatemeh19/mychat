"use client"

import {
    BiMenu,
    BiMessageRoundedDetail

} from "react-icons/bi";
import { useState } from 'react';
import Contacts from "../../contact";
import CustomizedDialogs from "../../popUp";
import Menu from "../../mainPage/leftSideMainPage/menu";
import EditProfile from "../../setting/editProfile";
import { useAppSelector } from "@/src/redux/hooks";
import CreateGroup from "../../group/createGroup";

export function AllMessageIcon() {

    return (

        <div className="grid gap-2 justify-center relative home-icons py-2 bg-[#0d49cb]">
            <div className="flex justify-center">
                <BiMessageRoundedDetail className="text-white cursor-pointer text-2xl dark:text-[#2563eb]" />
            </div>
            <p className="text-white  text-xs mb-2">All Chats</p>
        </div>

    )
}




export function MenuIcon() {

    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(!open)
    }
    const [contactListOpen, setContactListOpen] = useState(false)
    const contactListOpenHandler = () => {
        setContactListOpen(!contactListOpen)
    }
    const [settingOpen, setSettingOpen] = useState(false)
    const settingOpenHandler = () => {
        setSettingOpen(!settingOpen)
    }
    const [openCreateGroup, setOpenCreateGroup] = useState(false)
    const createGroupOpenHandler = () => {
        setOpenCreateGroup(!openCreateGroup)
    }
    return (

        <div className="flex justify-center logo-icon py-2  sm:hover:bg-[#0d49cb]">
            <BiMenu className="text-white cursor-pointer w-[30px] h-[40px]"
                onClick={() => { setOpen(true) }} />

            {open
                ? <CustomizedDialogs
                    open={open}
                    title=""
                    handelOpen={handleOpen}
                    menuDailog={true}
                    children={<Menu
                        handleMenu={handleOpen}
                        contactListOpenHandler={contactListOpenHandler}
                        settingOpenHandler={settingOpenHandler}
                        createGroupOpenHandler={createGroupOpenHandler}
                    />}
                />
                : null
            }
            {contactListOpen
                ? <Contacts
                    open={contactListOpen}
                    handelOpen={contactListOpenHandler} />
                : null
            }
            {settingOpen
                ? <CustomizedDialogs
                    open={settingOpen}
                    title="Info"
                    handelOpen={settingOpenHandler}
                    children={<EditProfile />} />
                : null
            }
            {
                openCreateGroup
                    ? <CreateGroup createGroupOpenHandler={createGroupOpenHandler} openCreateGroup={openCreateGroup} setOpenCreateGroup={setOpenCreateGroup} />
                    : null
            }
        </div>

    )
}

