"use client"

import Image from "next/image"
import { MouseEvent, useRef, useState } from "react"

import Message from "./message"
import { useAppSelector } from "@/src/redux/hooks"
import RightClick from "@/src/components/rightClick"
import { ChatType, MessageBoxProps } from "@/src/models/enum"
import { recievedMessageInterface } from "@/src/models/interface"
import CustomizedDialogs from "@/src/components/popUp"

const initialContextMenu = {
    show: false,
    x: 0,
    y: 0
}

const MessageBox = ({ msg }: { msg: recievedMessageInterface }) => {
    const [children, setChildren] = useState<Element>()
    const User = useAppSelector(state => state.userInfo).User
    const Contact = useAppSelector(state => state.userContact).Contact
    const chatType = useAppSelector(state => state.chat).chatType
    let sender;

    const socket = useAppSelector(state => state.socket).Socket
    const chatId = useAppSelector(state => state.chat).Chat._id


    const [contextMenu, setContextMenu] = useState(initialContextMenu)

    let information = {
        dir: MessageBoxProps.rtl,
        name: '',
        profilePic: ''
    }

    msg.senderId === User._id
        ? sender = User
        : sender = Contact

    const profilePic = sender.profilePic ? (sender.profilePic).split(`\\`) : '';
    information.dir = sender === User ? MessageBoxProps.rtl : MessageBoxProps.ltr
    information.name = sender.name
    information.profilePic = sender.profilePic ? profilePic[profilePic.length - 1] : '';

    const messageBox = useRef<HTMLDivElement>(null)

    const handleContextMenu = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        e.preventDefault()
        const { clientX, clientY } = e
        // access to currentTarget = currentTarget = div:messageBox
        setContextMenu({ show: true, x: clientX, y: clientY })
        // const message = e.currentTarget.children[0].children[0].children[0].children[0]
        const message = e.currentTarget
        setChildren(message)
    }
    const closeContextMenu = () => setContextMenu(initialContextMenu)

    const [confim, setConfirm] = useState(false)
    const [open, setOpen] = useState(false)
    const handelOpen = () => setOpen(!open)

    const deleteHandler = () => {
        setOpen(true)
        setConfirm(true)
        closeContextMenu()

        console.log('delete msg : ', msg._id)
    }
    const deleteH = () => {
        console.log('delete msg Done!')
        const deleteInfo = {
            chatId,
            messageIds: [msg._id],
            deleteAll: true
        }
        socket.emit('deleteMessage', deleteInfo)
        setConfirm(false)
    }
    return (
        <div className="messageBox"  >
            {contextMenu.show && <RightClick x={contextMenu.x} y={contextMenu.y} closeContextMenu={closeContextMenu} child={children} msg={msg} deleteHandler={deleteHandler} />}
            <div ref={messageBox} onContextMenu={handleContextMenu} className={`flex gap-5 ${information.dir === 'rtl' ? 'flex-row-reverse' : ''} `}>
                {
                    chatType !== ChatType.private
                        ? (
                            <div className="profileImageBox relative">
                                {/* this image for box width so the text dont go under the profile image and make the opacity - 0 so we can see the second image ... i use this method til find better way */}
                                <Image
                                    src={
                                        information.profilePic
                                            ? `/uploads/picture/${information.profilePic}`
                                            : '/uploads/picture/defaultProfilePic.png'
                                    }
                                    width={45}
                                    height={0}
                                    alt=""
                                    className="rounded-full opacity-0 max-w-lg "
                                />
                                <Image
                                    src={
                                        information.profilePic
                                            ? `/uploads/picture/${information.profilePic}`
                                            : '/uploads/picture/defaultProfilePic.png'
                                    }
                                    width={45}
                                    height={0}
                                    alt=""
                                    className="rounded-full absolute top-0 left-0 max-w-lg w-[50px] h-[50px] object-cover "
                                />
                            </div>
                        )
                        : null
                }

                <div className={`content flex flex-col ${information.dir === 'rtl' ? 'items-end' : 'items-start'} mb-2`}>
                    {
                        chatType !== ChatType.private
                            ? (
                                <div className={`flex gap-2 items-end mb-2 ${information.dir === 'rtl' ? 'flex-row-reverse' : ''} `}>
                                    <h1 className="name font-bold text-sm text-center whitespace-nowrap dark:text-white">{information.name}</h1>
                                </div>
                            )
                            : null
                    }

                    <div className="gap-3 flex flex-col font-[vazir]">
                        <Message type={msg.content.contentType} dir={information.dir} msg={msg} />
                    </div>
                </div>
            </div>

            {/* ----------------------------- delete modal */}
            {confim && <CustomizedDialogs
                title='delete'
                children={<div className="px-6 pb-2 flex flex-col">
                    <p>Are you sure?</p>
                    <div className="btns flex gap-1 justify-end">
                        <button className='bg-white text-black p-2 rounded-md hover:bg-slate-300 transition duration-75' onClick={() => setConfirm(false)}>cancel</button>
                        <button className='bg-red-500 text-white p-2 rounded-md hover:bg-red-700 transition duration-75' onClick={deleteH}>confim</button>
                    </div>
                </div>}
                open={open}
                handelOpen={handelOpen}
            />}
        </div>

    )
}

export default MessageBox