"use client"

import Image from 'next/image'

import { CgMoreO } from 'react-icons/cg'
import { FiPhone } from 'react-icons/fi'
import { HiOutlineVideoCamera } from 'react-icons/hi'
import { Dispatch, FC, SetStateAction } from "react";


interface ChatHeaderProps {
    infoState: boolean,
    setInfoVState: Dispatch<SetStateAction<boolean>>;
}

const ChatHeader: FC<ChatHeaderProps> = ({ infoState, setInfoVState }) => {

    let closeInfoSide = () => {
        console.log('close')
        if (infoState) setInfoVState(false)
        else setInfoVState(true)
    }

    return (
        <div className="w-full mx-auto bg-white dark:bg-bgColorDark2">
            <div className="flex justify-between flex-row-reverse p-3 px-6">
                <div className="righ flex flex-row-reverse gap-4 items-center">
                    <CgMoreO onClick={closeInfoSide} className='text-gray-400 text-xl cursor-pointer' />
                    <FiPhone className='text-gray-400 text-xl font-extrabold cursor-pointer' />
                    <HiOutlineVideoCamera className='text-gray-400 text-2xl cursor-pointer' />
                </div>
                <div className="left flex gap-3 items-center">
                    <div className="profile">
                        <Image
                            width={50}
                            height={50}
                            src={'/images/girl-profile3.jpg'}
                            alt='chat profile'
                            className='rounded-full '
                        />
                    </div>
                    <div className="profile-info">
                        <h2 className='font-bold whitespace-nowrap dark:text-white'>Design Team</h2>
                        <p className='text-xs text-gray-400 font-medium whitespace-nowrap'>
                            <span>12</span> member,&nbsp;
                            <span>5</span> online
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ChatHeader