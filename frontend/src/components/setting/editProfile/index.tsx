"use client"

import {
    BiUser,
    BiPhoneCall,
    BiAt

} from "react-icons/bi";
import { FC, useState } from "react";
import ImageSelector from "./imageSeletor";
interface EditProfileProps {
    
}

const EditProfile: FC<EditProfileProps> = ({
    
}) => {
    const [img, setImg] = useState<string>('')

    return (
        <>
            <div className="p-5 w-full">
                <div className="profile grid mb-10">
                    <ImageSelector setImage={setImg} />
                    <div className="grid justify-center pt-2">
                        <p className="font-bold text-center">KOSAR</p>
                        <p className="status text-center text-sky-500 text-xs">Online</p>
                    </div>

                </div>
                <div className="flow-root">
                    <div className="float-left flex gap-3">
                        <BiUser className="text-2xl" />
                        <span className='text-sm'>Name</span>
                    </div>
                    <p className="float-right">KOSAR</p>
                </div>

                <div className="flow-root py-2">
                    <div className="float-left flex gap-3">
                        <BiPhoneCall className="text-2xl" />
                        <span className='text-sm'>Phone number</span>
                    </div>
                    <p className="float-right">09028087882</p>
                </div>

                <div className="flow-root">
                    <div className="float-left flex gap-3">
                        <BiAt className="text-2xl" />
                        <span className='text-sm'>Username</span>
                    </div>
                    <p className="float-right">@kosarhosseini78</p>
                </div>
            </div>
        </>
    )
}

export default  EditProfile;