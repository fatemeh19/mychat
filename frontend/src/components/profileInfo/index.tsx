"use client"
import { FC } from "react";
import UserInfo from "./userInfo";
import { useAppSelector } from "@/src/redux/hooks";

interface ProfileInfoProps {
}
const ProfileInfo: FC<ProfileInfoProps> = () => {

    

    return (
        <div>
            <UserInfo/>
        </div>
    );
}

export default ProfileInfo;