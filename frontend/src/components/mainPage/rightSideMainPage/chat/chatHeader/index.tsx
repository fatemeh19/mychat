"use client"

import Image from 'next/image'
import { useState, Dispatch, FC, SetStateAction } from 'react'

// icons
import { CgMoreO } from 'react-icons/cg'
import { FiPhone } from 'react-icons/fi'
import { HiOutlineVideoCamera } from 'react-icons/hi'

// components
import ProfileInfo from '@/src/components/profileInfo'
import CustomizedDialogs from '@/src/components/popUp'
import { useAppSelector } from '@/src/redux/hooks'


interface ChatHeaderProps {
    infoState: boolean,
    setInfoVState: Dispatch<SetStateAction<boolean>>,
    online : boolean
}

const ChatHeader: FC<ChatHeaderProps> = ({ infoState, setInfoVState, online }) => {

    const [open, setOpen] = useState(false)
    const userContact = useAppSelector(state => state.userContact).Contact

    let closeInfoSide = () => {
        if (infoState) setInfoVState(false)
        else setInfoVState(true)
    }

    let handelOpenDialog = () => {
        setOpen(!open)
    }

    const profilePicName = userContact.profilePic ? (userContact.profilePic).split(`\\`) : '';

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
                            width={500}
                            height={500}
                            src={
                                userContact.profilePic
                                ? `/uploads/picture/${profilePicName[profilePicName.length - 1]}`
                                : '/uploads/picture/defaultProfilePic.png'
                            }
                            alt='chat profile'
                            className='rounded-full w-[50px] h-[50px] object-cover'
                        />
                    </div>
                    <div className="profile-info">
                        <h2 className='font-bold whitespace-nowrap dark:text-white'>{userContact ? userContact.name : 'user name'}</h2>
                        <p className='text-xs text-gray-400 whitespace-nowrap'>
                            {/* <span>12</span> member,&nbsp;
                            <span>5</span> online */}
                            <span>{online ? 'online' : 'offline'}</span>
                        </p>
                    </div>
                </div>
            </div>

            <>
                {
                    open
                        ? (
                            <>
                                <CustomizedDialogs
                                    open={open}
                                    title={'User Info'}
                                    children={<ProfileInfo />}
                                    handelOpen={handelOpenDialog}
                                />
                            </>
                        )
                        : null
                }
            </>
        </div>
    )
}
export default ChatHeader