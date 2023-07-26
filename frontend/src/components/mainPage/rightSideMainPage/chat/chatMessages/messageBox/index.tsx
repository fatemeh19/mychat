"use client"

import Image from "next/image"
import { MouseEvent, useRef, useState, useEffect, FC } from "react"

import Message from "./message"
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks"
import RightClick from "@/src/components/rightClick"
import { ChatType, MessageBoxDir } from "@/src/models/enum"
import { recievedMessageInterface } from "@/src/models/interface"
import CustomizedDialogs from "@/src/components/popUp"
import { addSelectMessage, removeSelectMessage, setActiveSelection } from "@/src/redux/features/selectedMessagesSlice"

const initialContextMenu = {
    show: false,
    x: 0,
    y: 0
}

interface MessageBoxProps {
    msg: recievedMessageInterface
}

const MessageBox: FC<MessageBoxProps> = ({ msg }) => {

    const [contextMenu, setContextMenu] = useState(initialContextMenu)
    const [children, setChildren] = useState<Element>()
    const [confim, setConfirm] = useState(false)
    const [open, setOpen] = useState(false)

    const messageBoxRef = useRef<HTMLDivElement>(null)
    const selectIconRef = useRef<HTMLDivElement>(null)


    const dispatch = useAppDispatch()

    const User = useAppSelector(state => state.userInfo).User
    const Contact = useAppSelector(state => state.userContact).Contact
    const socket = useAppSelector(state => state.socket).Socket
    const chatId = useAppSelector(state => state.chat).Chat._id
    const chatType = useAppSelector(state => state.chat).chatType
    const selectedMessages = useAppSelector(state => state.selectedMessage).SelectedMessages
    const activeSelectedMessages = useAppSelector(state => state.selectedMessage).activeSelection


    let information = {
        dir: MessageBoxDir.rtl,
        name: '',
        profilePic: ''
    }

    let sender;
    msg.senderId === User._id
        ? sender = User
        : sender = Contact

    const profilePic = sender.profilePic ? (sender.profilePic).split(`\\`) : '';
    information.dir = sender === User ? MessageBoxDir.rtl : MessageBoxDir.ltr
    information.name = sender.name
    information.profilePic = sender.profilePic ? profilePic[profilePic.length - 1] : '';


    const handleContextMenu = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        e.preventDefault()
        const { clientX, clientY } = e
        // access to currentTarget = currentTarget = div:messageBox
        setContextMenu({ show: true, x: clientX, y: clientY })
        const message = e.currentTarget
        setChildren(message)
    }
    const closeContextMenu = () => setContextMenu(initialContextMenu)

    const handelOpen = () => setOpen(!open)

    const showConfirmModal = () => {
        setOpen(true)
        setConfirm(true)
        closeContextMenu()
        console.log('delete msg : ', msg._id)
    }
    const deleteHandler_oneMessage = () => {
        console.log('delete msg Done!')
        const deleteInfo = {
            chatId,
            messageIds: [msg._id],
            deleteAll: true
        }
        socket.emit('deleteMessage', deleteInfo)
        setConfirm(false)
    }
    const activeSelection = (e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>) => {
        dispatch(setActiveSelection(true))
        closeContextMenu()
    }
    let counter = 0
    const selectHandler = () => {
        if (activeSelectedMessages) {
            // @ts-ignore
            const circleStyle = selectIconRef.current.style
            circleStyle.background = '#2563eb'
            circleStyle.borderColor = '#2563eb'

            // @ts-ignore
            dispatch(addSelectMessage(msg._id))
            selectedMessages.map(selectedMsg => {
                if (selectedMsg === msg._id) {
                    counter = counter + 1
                    console.log(counter)
                    if (counter === 1) {
                        console.log('removin tekrari')
                        const filteredSelectedMessage = selectedMessages.filter(sMsg => sMsg !== msg._id)
                        dispatch(removeSelectMessage(filteredSelectedMessage))
                        circleStyle.background = 'transparent'
                        circleStyle.borderColor = 'black'
                    }
                }
            })
        }

    }

    useEffect(() => {
        console.log('select messages : ', selectedMessages)
    }, [selectedMessages])
    return (
        <div className="messageBox" ref={messageBoxRef} onClick={selectHandler}>
            {contextMenu.show &&
                <RightClick
                    x={contextMenu.x}
                    y={contextMenu.y}
                    closeContextMenu={closeContextMenu}
                    child={children}
                    msg={msg}
                    showConfirmModal={showConfirmModal}
                    activeSelection={activeSelection}

                />
            }
            <div onContextMenu={handleContextMenu} className={`flex items-center gap-1 rounded-xl ${information.dir === 'rtl' ? 'flex-row-reverse' : ''} `}>
                {activeSelectedMessages && <div ref={selectIconRef} className={` w-[15px] h-[15px] border-[1px] border-black rounded-full transition-all duration-100`} > </div>}
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

                <div className={`content flex flex-col mb-2 ${information.dir === 'rtl' ? 'items-end' : 'items-start'}`}>
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
                        <button className='bg-red-500 text-white p-2 rounded-md hover:bg-red-700 transition duration-75' onClick={deleteHandler_oneMessage}>confim</button>
                    </div>
                </div>}
                open={open}
                handelOpen={handelOpen}
            />}
        </div>

    )
}

export default MessageBox