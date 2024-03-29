"use client"

import {
    BiMenu,
    BiMessageRoundedDetail,
    BiSolidFolder

} from "react-icons/bi";
import { useEffect, useState } from 'react';
import Contacts from "../../contact";
import CustomizedDialogs from "../../popUp";
import Menu from "../../mainPage/leftSideMainPage/menu";
import EditProfile from "../../setting/editProfile";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import CreateGroup from "../../group/createGroup";
import Folders from "../../Folders";
import { fetchUserChatList, getFolderChats } from "@/src/helper/userInformation";
import { setCloseFolders, setOpenFolder } from "@/src/redux/features/folderSlice";
import { setFolderId } from "@/src/redux/features/userChatListSlice";
import Settings from "../../setting";
import NotificationsAndSounds from "../../setting/notificationsAndSounds";
import PrivacyAndSecurity from "../../setting/privacyAndSecurity/privacyAndSecurity";
import ChatSettings from "../../setting/chatSettings";
import SelectBlockUser from "../../setting/privacyAndSecurity/blockedUsers/selectBlockUser";
import BlockedUsers from "../../setting/privacyAndSecurity/blockedUsers";

export function AllMessageIcon({ open, setOpen }: { open: boolean, setOpen: (bol: boolean) => void }) {
    const dispatch = useAppDispatch()
    const folderId = useAppSelector(state => state.userChatList).folderId
    useEffect(() => {
        if (folderId == '' && !open) {
            setOpen(true)
        }
    }, [folderId])
    const clickHandler = () => {
        setOpen(true)
        dispatch(setCloseFolders())
        fetchUserChatList(dispatch)
        dispatch(setFolderId(''))
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
            dispatch(setFolderId(folder._id))
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
    const [editProfileOpen, setEditProfileOpen] = useState(false)
    const editProfileOpenHandler = () => {
        setEditProfileOpen(!editProfileOpen)
        setSettingOpen(!settingOpen)
    }
    const [notificationsAndSoundOpen, setNotificationsAndSoundOpen] = useState(false)
    const notificationsAndSoundOpenHandler = () => {
        setNotificationsAndSoundOpen(!notificationsAndSoundOpen)
        setSettingOpen(!settingOpen)
    }
    const [privacyAndSecurityOpen, setPrivacyAndSecurityOpen] = useState(false)
    const privacyAndSecurityOpenHandler = () => {
        console.log('privacyAndSecurityOpen: ', privacyAndSecurityOpen)
        setSecurityOpen(false)
        setPrivacyAndSecurityOpen(!privacyAndSecurityOpen)
        // setSettingOpen(!settingOpen)
    }
    const [securityOpen, setSecurityOpen] = useState(false)
    const securityOpenHandler = () => {
        console.log("securityOpen: ", securityOpen)
        setBlockUserOpen(true)
        setSecurityOpen(!securityOpen)
    }
    const [flag, setFlag] = useState(false)

    const [blockUserOpen, setBlockUserOpen] = useState(false)
    const blockUserOpenHandler = () => {
        console.log('blockUserOpen;', blockUserOpen)
        setBlockUserOpen(!blockUserOpen)
        securityOpenHandler()
        if (!blockUserOpen) {
            setFlag(true)
        }
    }
    const [selectBlockedUserOpen, setSelectBlockedUserOpen] = useState(false)
    const selectBlockedUserOpenHandler = () => {
        // setBlockUserOpen(false)
        console.log('selectBlockedUserOpen;', selectBlockedUserOpen)
        setSelectBlockedUserOpen(!selectBlockedUserOpen)
    }

    const [chatSettingsOpen, setChatSettingsOpen] = useState(false)
    const chatSettingsOpenHandler = () => {
        setChatSettingsOpen(!chatSettingsOpen)
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

    useEffect(() => {
        console.log('privacyAndSecurityOpen', privacyAndSecurityOpen)
        console.log('securityOpen', securityOpen)
        console.log('selectBlockedUserOpen', selectBlockedUserOpen)
        console.log('blockUserOpen', blockUserOpen)
    }, [privacyAndSecurityOpen,
        securityOpen,
        selectBlockedUserOpen,
        blockUserOpen])
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
            {contactListOpen ? <Contacts open={contactListOpen}
                handelOpen={contactListOpenHandler} />
                : null}
            {settingOpen
                ? <CustomizedDialogs
                    open={settingOpen}
                    title="Info"
                    handelOpen={settingOpenHandler}
                    children={<Settings
                        editProfileOpenHandler={editProfileOpenHandler}
                        notificationsAndSoundOpenHandler={notificationsAndSoundOpenHandler}
                        privacyAndSecurityOpenHandler={privacyAndSecurityOpenHandler}
                        chatSettingsOpenHandler={chatSettingsOpenHandler}
                        settingOpenHandler={settingOpenHandler}
                    />}
                />
                : null
            }
            {editProfileOpen
                ? <CustomizedDialogs
                    open={editProfileOpen}
                    title="Info"
                    handelOpen={editProfileOpenHandler}
                    children={<EditProfile editProfileOpen={editProfileOpen} />} />
                : null
            }
            {notificationsAndSoundOpen
                ? <CustomizedDialogs
                    open={notificationsAndSoundOpen}
                    title="notifications"
                    handelOpen={notificationsAndSoundOpenHandler}
                    children={<NotificationsAndSounds />} />
                : null
            }
            {/* {privacyAndSecurityOpen
                ? securityOpen
                    ? <CustomizedDialogs
                        open={securityOpen}
                        title="Blocked users"
                        handelOpen={securityOpenHandler}
                        children={<BlockedUsers securityOpenHandler={securityOpenHandler} />} />
                    : blockUserOpen
                        ? <CustomizedDialogs
                            open={blockUserOpen}
                            title="Select user to block"
                            handelOpen={blockUserOpenHandler}
                            children={<SelectBlockUser />} />
                        : <CustomizedDialogs
                            open={privacyAndSecurityOpen}
                            title="security"
                            handelOpen={privacyAndSecurityOpenHandler}
                            children={<PrivacyAndSecurity
                                blockUserOpenHandler={blockUserOpenHandler} flag={flag} setFlag={setFlag} />} />
                : null
            } */}
            {privacyAndSecurityOpen
                ? securityOpen
                    ? selectBlockedUserOpen
                        ? <CustomizedDialogs
                            open={selectBlockedUserOpen}
                            title="Select user to block"
                            handelOpen={selectBlockedUserOpenHandler}
                            children={<SelectBlockUser />} />
                        :
                        // <p>hi</p>
                        <CustomizedDialogs
                            open={blockUserOpen}
                            title="Blocked users"
                            handelOpen={blockUserOpenHandler}
                            children={<BlockedUsers selectBlockedUserOpenHandler={selectBlockedUserOpenHandler} />} />
                    : <CustomizedDialogs
                        open={privacyAndSecurityOpen}
                        title="Privacy and Security"
                        handelOpen={privacyAndSecurityOpenHandler}
                        children={<PrivacyAndSecurity
                            securityOpenHandler={securityOpenHandler} flag={flag} setFlag={setFlag} />} />
                : null
            }
            {chatSettingsOpen
                ? <CustomizedDialogs
                    open={chatSettingsOpen}
                    title="chat settings"
                    handelOpen={chatSettingsOpenHandler}
                    children={<ChatSettings />} />
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

