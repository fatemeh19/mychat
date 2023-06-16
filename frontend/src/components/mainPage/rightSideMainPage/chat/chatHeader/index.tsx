"use client"

import Image from 'next/image'
import { useState } from 'react'

import { CgMoreO } from 'react-icons/cg'
import { FiPhone } from 'react-icons/fi'
import { HiOutlineVideoCamera } from 'react-icons/hi'
import { Dispatch, FC, SetStateAction } from "react";
import { useAppDispatch } from '@/src/redux/hooks'
import { setOpen } from '@/src/redux/features/popUpSlice'
import ProfileInfo from '@/src/components/profileInfo'
import ChannelInfo from '@/src/components/profileInfo/channelInfo'
import CustomizedDialogs from '@/src/components/popUp'
import AddContactForm from '@/src/components/contact/addContact/addContactForm'
import UserInfo from '@/src/components/profileInfo/userInfo'


interface ChatHeaderProps {
    infoState: boolean,
    setInfoState: Dispatch<SetStateAction<boolean>>;
}

const ChatHeader: FC<ChatHeaderProps> = ({ infoState, setInfoState }) => {

    const [open, setOpen] = useState(false)

    let closeInfoSide = () => {
        console.log('close')
        if (infoState) setInfoState(false)
        else setInfoState(true)
    }

    let handelOpenDialog = () => {
        setOpen(!open)
    }

    return (
        <div
            className=" w-full mx-auto bg-white cursor-pointer dark:bg-bgColorDark2">
            <div className="flex justify-between flex-row-reverse">
                <div className="righ flex flex-row-reverse gap-4 items-center pr-6">
                    <CgMoreO onClick={closeInfoSide} className='text-gray-400 text-xl cursor-pointer' />
                    <FiPhone className='text-gray-400 text-xl font-extrabold cursor-pointer' />
                    <HiOutlineVideoCamera className='text-gray-400 text-2xl cursor-pointer' />
                </div>
                <div className="
                    left
                    flex gap-3 items-center 
                    w-full p-3 px-6 
                    "
                    onClick={() => setOpen(true)}
                >
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

            <>
                {
                    open
                        ? <CustomizedDialogs 
                            open={open} 
                            title={'User Info'} 
                            children={<ProfileInfo />} 
                            handelOpen={handelOpenDialog}
                        />
                        : null
                }
            </>
        </div>
    )
}
export default ChatHeader