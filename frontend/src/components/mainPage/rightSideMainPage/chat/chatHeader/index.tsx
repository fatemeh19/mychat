"use client"

import Image from 'next/image'
import { useState, useEffect, Dispatch, FC, SetStateAction } from 'react'

// icons
import { CgMoreO } from 'react-icons/cg'
import { FiPhone } from 'react-icons/fi'
import { HiOutlineVideoCamera } from 'react-icons/hi'

// components
import ProfileInfo from '@/src/components/profileInfo'
import CustomizedDialogs from '@/src/components/popUp'
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import { removeSelectMessage, setActiveSelection } from '@/src/redux/features/selectedMessagesSlice'
import { updateArrayMessages } from '@/src/redux/features/chatSlice'
import ConfirmModal from '@/src/components/basicComponents/confirmModal'
import findIndex from '@/src/helper/deleteMessage'
import { recievedMessageInterface } from '@/src/models/interface'
import deleteMessage from '@/src/helper/deleteMessage'
import PinnedMessages from './pinnedMessages'


interface ChatHeaderProps {
    infoState: boolean,
    setInfoVState: Dispatch<SetStateAction<boolean>>,
}

const ChatHeader: FC<ChatHeaderProps> = ({ infoState, setInfoVState }) => {

    const [showConfirm, setShowConfirm] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)
    const [confirmInfo, setConfirmInfo] = useState({
        confirmTitle: '',
        confirmDiscription: '',
        confirmOption: '',
    })

    const dispatch = useAppDispatch()

    const socket = useAppSelector(state => state.socket).Socket
    const userContact = useAppSelector(state => state.userContact).Contact
    const activeSelection = useAppSelector(state => state.selectedMessage).activeSelection
    const selectedMessages = useAppSelector(state => state.selectedMessage).SelectedMessages
    const chatId = useAppSelector(state => state.chat).Chat._id
    const toggle = useAppSelector(state => state.toggle).Toggle
    const chatMessages = useAppSelector(state => state.chat.Chat).messages
    const pinnedMessages = useAppSelector(state => state.chat.Chat).pinnedMessages
    // const [online , setOnline] = useState(userContact.status.online)
    // const [lastSeen , setLastSeen] = useState(userContact.status.lastseen)
    const contactId = userContact._id

    useEffect(() => {
        socket?.on('onlineContact', (CId) => {
            console.log('contactId : ' + contactId)
            if (contactId == CId) {
                console.log('online contact : ' + CId)
                // setOnline(true)
            }

        });
        socket?.on('offlineContact', (CId) => {
            console.log('contactId : ' + contactId)
            if (contactId == CId) {
                console.log('offline contact : ' + CId)
                // setOnline(false)
                const now = Date.now();
                // setLastSeen(now)
            }

        });
    }, [socket, contactId])

    let closeInfoSide = () => {
        if (infoState) setInfoVState(false)
        else setInfoVState(true)
    }

    let handelOpenDialog = () => {
        setOpen(!open)
    }

    const unActiveSelection = () => {
        dispatch(setActiveSelection(false))
        dispatch(removeSelectMessage([]))
    }
    const showConfirmModal = () => {
        setOpen(true)
        setShowConfirm(true)

        setConfirmInfo({
            confirmTitle: 'Delete',
            confirmDiscription: 'Are you sure?',
            confirmOption: 'delete aAll'
        })
    }

    const deleteHandler_multipleMessage = () => {
        console.log('delete msg Done!')
        const deleteInfo = {
            chatId,
            messageIds: selectedMessages,
            deleteAll: toggle
        }
        socket.emit('deleteMessage', deleteInfo)
        dispatch(setActiveSelection(false))
        dispatch(removeSelectMessage([]))

        if (!deleteInfo.deleteAll) {
            const chatMessageIds = chatMessages.map((cm: recievedMessageInterface) => cm._id)
            for (let i = 0; i < selectedMessages.length; i++) {
                deleteMessage(0, chatMessageIds.length, chatMessageIds, selectedMessages[i], dispatch)
            }
        }
    }

    const profilePicName = userContact.profilePic ? (userContact.profilePic).split(`\\`) : '';

    return (
        <div>
            {
                activeSelection
                    ? <div className="h-[74px] w-full mx-auto bg-white cursor-pointer dark:bg-bgColorDark2">
                        <div className="flex h-full justify-between flex-row-reverse ">
                            <button className='right text-blue-500 font-semibold uppercase pr-6' onClick={unActiveSelection}>Cancle</button>
                            <div className="
                                    left
                                    flex gap-3 items-center 
                                    w-full p-3 px-6 
                                    "
                                onClick={() => setOpen(true)}
                            >
                                <button className='bg-blue-500 p-2 px-4 rounded-md text-white font-medium uppercase'>
                                    Forward
                                    {selectedMessages.length !== 0 && <span className='ml-1 text-blue-100'>{selectedMessages.length}</span>}
                                </button>
                                <button className='bg-blue-500 p-2 px-4 rounded-md text-white font-medium uppercase' onClick={showConfirmModal}>
                                    Delete
                                    {selectedMessages.length !== 0 && <span className='ml-1 text-blue-100'>{selectedMessages.length}</span>}
                                </button>
                            </div>
                        </div>
                    </div>
                    : <div>
                        <div
                            className=" w-full h-[74px] mx-auto bg-white cursor-pointer dark:bg-bgColorDark2">
                            <div className="flex justify-between flex-row-reverse">
                                {/* <div className="righ flex flex-row-reverse gap-4 items-center pr-6">
                                <CgMoreO onClick={closeInfoSide} className='text-gray-400 text-xl cursor-pointer' />
                                <FiPhone className='text-gray-400 text-xl font-extrabold cursor-pointer' />
                                <HiOutlineVideoCamera className='text-gray-400 text-2xl cursor-pointer' />
                            </div> */}
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
                                                    ? `/uploads/photo/${profilePicName[profilePicName.length - 1]}`
                                                    : '/uploads/photo/defaultProfilePic.png'
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
                                            {/* <span>{online ? 'online' : 'offline'}</span> */}
                                            {/* {online ?
                            <span className="text-sky-500">Online</span> 
                                : <span className="text-gray-500">
                                    {lastSeen? (new Date(lastSeen).getHours() +':' 
                                    + new Date(lastSeen).getMinutes()) : 'offline'}</span>
                            } */}
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
                        {

                            pinnedMessages?.length > 0
                                ? <PinnedMessages />
                                : null

                        }
                    </div>


            }
            <ConfirmModal showConfirm={showConfirm} setShowConfirm={setShowConfirm} open={open} setOpen={setOpen} confirmHandler={deleteHandler_multipleMessage} confirmInfo={confirmInfo} />
        </div >
    )
}
export default ChatHeader