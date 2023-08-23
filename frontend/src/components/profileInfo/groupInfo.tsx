import { FC, useState } from "react";
import Members from "../mainPage/rightSideMainPage/chatInfo/memberInfo/members";
import InfoFiles from "../mainPage/rightSideMainPage/chatInfo/infoFiles";
import Informatin from "../mainPage/rightSideMainPage/chatInfo/information";
import InfoSetting from "../mainPage/rightSideMainPage/chatInfo/infoSetting";
import { ChatType } from "@/src/models/enum";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import CustomizedDialogs from "../popUp";
import { setOpenExceptions, setOpenGroupType, setOpenPermissions } from "@/src/redux/features/openSlice";
import EditGroupChat from "../popUp/editPopup/editGroupChat";
import { setIsEditChat } from "@/src/redux/features/chatSlice";
import Permissions from "../popUp/editPopup/parts/permissions";
import PermissionExceptions from "../popUp/editPopup/parts/permissions/Exceptions/permissionsExceptions";
import GroupSettings from "../popUp/editPopup/parts/groupSettings";

interface GroupInfoProps {

}

const GroupInfo: FC<GroupInfoProps> = () => {

    const dispatch = useAppDispatch()
    const isEditChat = useAppSelector(state => state.chat).isEditChat
    const chatType = useAppSelector(state => state.chat).Chat.chatType
    const openPermissions = useAppSelector(state => state.open).openPermissions
    const openExceptions = useAppSelector(state => state.open).openExceptions
    const openGroupType = useAppSelector(state => state.open).openGroupType

    return (
        <div className="overflow-auto overflow-x-hidden chat-scrollbar bg-gray-100">
            <div className="gap-3 flex flex-col ">
                <Informatin />
                <InfoSetting chatType={ChatType.group} />
                <InfoFiles />
                <Members />
            </div>


            {
                isEditChat
                    ? openPermissions
                        ? openExceptions
                            ? <CustomizedDialogs title="Exceptions" open={openExceptions} handelOpen={() => dispatch(setOpenExceptions(!openExceptions))} children={<PermissionExceptions />} />
                            : <CustomizedDialogs title="Permissions" open={openPermissions} handelOpen={() => dispatch(setOpenPermissions(!openPermissions))} children={<Permissions />} />
                        : openGroupType
                            ? <CustomizedDialogs title="Group type" open={openGroupType} handelOpen={() => dispatch(setOpenGroupType(!openGroupType))} children={<GroupSettings />} />
                            : <CustomizedDialogs
                                open={isEditChat}
                                title={'Edit'}
                                children={chatType === ChatType.group
                                    ? <EditGroupChat />
                                    : <button onClick={() => { dispatch(setIsEditChat(false)) }}> edit private chat </button>}
                                handelOpen={() => dispatch(setIsEditChat(!isEditChat))}
                            />
                    : null

            }
        </div>
    );
}

export default GroupInfo;