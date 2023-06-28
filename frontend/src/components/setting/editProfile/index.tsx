"use client"

import {
    BiUser,
    BiPhoneCall,
    BiAt

} from "react-icons/bi";
import { FC, useState } from "react";
import ImageSelector from "./imageSeletor";
import { useAppSelector } from "@/src/redux/hooks";
interface EditProfileProps {
    
}

const EditProfile: FC<EditProfileProps> = ({
    
}) => {
    const [img, setImg] = useState<string>('')
    const selector = useAppSelector(state => state.userInfo)
    const userInfo = selector.User
    const profilePicName =userInfo.profilePic ? userInfo.profilePic.split(`\\`) : '';
    return (
        <>
            <div className="p-5 w-full">
                <div className="profile grid mb-10">
                    <ImageSelector imageName={userInfo.profilePic ? `/uploads/picture/${profilePicName[profilePicName.length - 1]}`
                    : '/uploads/picture/defaultProfilePic.png'} 
                     setImage={setImg} />
                    <div className="grid justify-center pt-2">
                        <p className="font-bold text-center">{userInfo.name}</p>
                        <p className="status text-center text-sky-500 text-xs">Online</p>
                    </div>

                </div>
                <div className="flow-root">
                    <div className="float-left flex gap-3">
                        <BiUser className="text-2xl" />
                        <span className='text-sm'>Name</span>
                    </div>
                    <p className="float-right">{userInfo.name}</p>
                </div>

                <div className="flow-root py-2">
                    <div className="float-left flex gap-3">
                        <BiPhoneCall className="text-2xl" />
                        <span className='text-sm'>Phone number</span>
                    </div>
                    <p className="float-right">{userInfo.phoneNumber}</p>
                </div>

                <div className="flow-root">
                    <div className="float-left flex gap-3">
                        <BiAt className="text-2xl" />
                        <span className='text-sm'>Email</span>
                    </div>
                    <p className="float-right">{userInfo.email}</p>
                </div>
            </div>
        </>
    )
}

export default  EditProfile;