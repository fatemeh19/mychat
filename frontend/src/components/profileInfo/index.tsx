"use client"
import { FC, createRef, useEffect } from "react";
import Informatin from "../mainPage/rightSideMainPage/chatInfo/information";
import InfoSetting from "../mainPage/rightSideMainPage/chatInfo/infoSetting";
import InfoFiles from "../mainPage/rightSideMainPage/chatInfo/infoFiles";
import MoreAction from "../mainPage/rightSideMainPage/chatInfo/moreAction";
import CustomizedDialogs from "../popUp";

interface ProfileInfoProps {

}
let infoTab;
let title
const ProfileInfo: FC<ProfileInfoProps> = () => {

    // useEffect(() => {
    //     infoTab = document.querySelector('.closeInfoTab')
    //     title = document.querySelector('.title')
    //     console.log(infoTab)
    //     infoTab?.addEventListener('scroll', (e) => {
    //         console.log(e)
    //         title.classList.add('border')
    //     })
    // }, [])

    return (
        <div>
            <CustomizedDialogs children={<h1 className="bg-green-400">this is a react node</h1>} />
        </div>
    );
}

export default ProfileInfo;