"use client"
import { FC } from "react";
import UserInfo from "./userInfo";

interface ProfileInfoProps {
    User : any
}
const ProfileInfo: FC<ProfileInfoProps> = ({User}) => {
    console.log('ProfileInfo User : ', User)

    return (
        <div>
            <UserInfo User={User}/>
        </div>
    );
}

export default ProfileInfo;