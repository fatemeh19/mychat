"use client"

import {
    BiMenu,
    BiMessageRoundedDetail,
    BiSolidFolder

} from "react-icons/bi";
import { useState } from 'react';
import Contacts from "../../contact";
import CustomizedDialogs from "../../popUp";
import Menu from "../../mainPage/leftSideMainPage/menu";
import EditProfile from "../../setting/editProfile";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import CreateGroup from "../../group/createGroup";
import Folders from "../../Folders";
import { fetchUserChatList, getFolderChats } from "@/src/helper/userInformation";
import { setCloseFolders, setOpenFolder } from "@/src/redux/features/folderSlice";

export function AllMessageIcon({ open, setOpen }: { open: boolean, setOpen: (bol: boolean) => void }) {
    const dispatch = useAppDispatch()
    const clickHandler = () => {
        setOpen(true)
        dispatch(setCloseFolders())
        fetchUserChatList(dispatch)

    }
    return (

        <div onClick={clickHandler} className={open ? "text-white grid gap-2 justify-center relative home-icons py-2 bg-[#0d49cb]"
            : "text-gray-300 grid gap-2 justify-center relative home-icons py-2 bg-transparent"}
        >
            <div className="flex justify-center">
                <BiMessageRoundedDetail className="text-white cursor-pointer text-2xl dark:text-[#2563eb]" />
            </div>
            <p className="text-white  text-xs mb-2">All Chats</p>
        </div>

    )
}
export function ShowFolder({ folder, setOpen }: { folder: any, setOpen: (bol: boolean) => void }) {
    const dispatch = useAppDispatch()
    const chatList = useAppSelector(state => state.userChatList).chatList

    const folderClickHandler = () => {
        setOpen(false)
        if (folder.open == false) {
            dispatch(setOpenFolder(folder._id))
        }

        getFolderChats(folder._id, dispatch, chatList)
    }
    return (

        <div onClick={folderClickHandler}
            key={folder._id} className={folder.open ? "text-white grid gap-2 justify-center relative home-icons py-2 bg-[#0d49cb]"
                : "text-gray-300 grid gap-2 justify-center relative home-icons py-2 bg-transparent"}
        >
            <div className="flex justify-center">
                <BiSolidFolder className=" cursor-pointer text-2xl dark:text-[#2563eb]" />
            </div>
            <p className="text-xs mb-2">{folder.name}</p>
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
    const [openFolderSetting, setOpenFolderSetting] = useState(false)
    const folderSettingHandler = () => {
        setOpenFolderSetting(!openFolderSetting)
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
                        folderSettingHandler={folderSettingHandler}
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
            {openFolderSetting
                ? <CustomizedDialogs
                    open={openFolderSetting}
                    title="Folders"
                    handelOpen={folderSettingHandler}
                    children={<Folders />} />
                : null
            }
        </div>

    )
}

