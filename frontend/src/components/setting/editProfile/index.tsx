"use client"

import {
    BiUser,
    BiPhoneCall,
    BiAt

} from "react-icons/bi";
import { FC, useEffect, useState } from "react";
import ImageSelector from "./imageSeletor";
import { useAppSelector } from "@/src/redux/hooks";
import CustomizedDialogs from "../../popUp";
import NotificationsAndSounds from "../notificationsAndSounds";
import EditName from "./editName";
import EditUsername from "./editUsername";
import EditPhoneNumber from "./editPhoneNumber";
interface EditProfileProps {

}

const EditProfile: FC<EditProfileProps> = ({

}) => {
    const [img, setImg] = useState<string>('')
    const User = useAppSelector(state => state.userInfo).User

    const [userInfo, setUserInfo] = useState({
        name: User.name,
        lastName: User.lastname,
        phoneNumber: User.phoneNumber,
        email: User.email,
        username: User.username,
        profilePic: User.profilePic
    })

    const [nameOpen, setNameOpen] = useState(false)
    const [usernameOpen, setUsernameOpen] = useState(false)
    const [phoneNumberOpen, setPhoneNumberOpen] = useState(false)
    const [emailOpen, setEmailOpen] = useState(false)

    useEffect(() => {
        console.log('userInfo in editProfile : ', userInfo)
        console.log('img in editProfile : ', img)
    }, [userInfo, img])

    useEffect(() => {
        return () => {
            // send data to server wen popUp close ...
            console.log('send data to server ...')

        }
    }, [])
    return (
        <>
            {/* <div className="w-full flex gap-5 items-center px-5 pb-3 bg-white shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)]"> */}

            <div className="w-full">
                <div className=" p-5 profile grid mb-3">
                    <ImageSelector userInfo={userInfo} setImage={setImg} />
                    <div className="grid justify-center pt-2">
                        <p className="font-bold text-center">{User.name}</p>
                        <p className="status text-center text-sky-500 text-xs">Online</p>
                    </div>

                </div>
                <div className="p-4 flow-root cursor-pointer hover:bg-gray-200 transition-all duration-150"
                    onClick={() => setNameOpen(!nameOpen)}>
                    <div className="float-left flex gap-3">
                        <BiUser className="text-2xl" />
                        <span className='text-sm'>Name</span>
                    </div>
                    <p className="float-right">{userInfo.name}</p>
                </div>

                <div className="p-4 flow-root cursor-pointer hover:bg-gray-200 transition-all duration-150"
                    onClick={() => setPhoneNumberOpen(!phoneNumberOpen)}>
                    <div className="float-left flex gap-3">
                        <BiPhoneCall className="text-2xl" />
                        <span className='text-sm'>Phone number</span>
                    </div>
                    <p className="float-right">{userInfo.phoneNumber}</p>
                </div>

                <div className="p-4 flow-root cursor-pointer hover:bg-gray-200 transition-all duration-150"
                    onClick={() => setEmailOpen(!emailOpen)}>
                    <div className="float-left flex gap-3">
                        <BiAt className="text-2xl" />
                        <span className='text-sm'>Email</span>
                    </div>
                    <p className="float-right">{userInfo.email}</p>
                </div>
                {User.username && <div className="p-4 flow-root cursor-pointer hover:bg-gray-200 transition-all duration-150"
                    onClick={() => setUsernameOpen(!usernameOpen)}>
                    <div className="float-left flex gap-3">
                        <BiAt className="text-2xl" />
                        <span className='text-sm'>username</span>
                    </div>
                    <p className="float-right">{User.username}</p>
                </div>}
            </div>

            {nameOpen && <CustomizedDialogs title="Edit you name" children={<EditName setNameOpen={setNameOpen} User={User} setUserInfo={setUserInfo} />} open={nameOpen} handelOpen={() => setNameOpen(!nameOpen)} />}
            {usernameOpen && <CustomizedDialogs title="Username" children={<EditUsername setUsernameOpen={setUsernameOpen} User={User} setUserInfo={setUserInfo} />} open={usernameOpen} handelOpen={() => setUsernameOpen(!usernameOpen)} />}
            {phoneNumberOpen && <CustomizedDialogs title="" children={<EditPhoneNumber User={User} setPhonNumberOpen={setPhoneNumberOpen} setUserInfo={setUserInfo} />} open={phoneNumberOpen} handelOpen={() => setPhoneNumberOpen(!phoneNumberOpen)} />}
            {emailOpen && <CustomizedDialogs title="" children={<p className="font-medium text-sm py-7 px-5">You can only change your email using mobile app. Please use an official app on your phone to update your email</p>} open={emailOpen} handelOpen={() => setEmailOpen(!emailOpen)} />}
        </>
    )
}

export default EditProfile;