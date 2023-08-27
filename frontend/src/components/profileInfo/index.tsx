"use client"
import { FC } from "react";
import UserInfo from "./userInfo";
import { useAppSelector } from "@/src/redux/hooks";
import { ChatType } from "@/src/models/enum";
import GroupInfo from "./groupInfo";

interface ProfileInfoProps {
}
const ProfileInfo: FC<ProfileInfoProps> = () => {

    const chatType = useAppSelector(state => state.chat.Chat).chatType

    switch (chatType) {
        case ChatType.private:
            return <UserInfo />
        case ChatType.group:
            return <GroupInfo />
        default:

            break;
    }
    return (<></>);
}

export default ProfileInfo;