"use client"
import { FC } from "react";
import UserInfo from "./userInfo";

interface ProfileInfoProps {

}
const ProfileInfo: FC<ProfileInfoProps> = () => {

    return (
        <div>
            <UserInfo />
        </div>
    );
}

export default ProfileInfo;