"use client"

import Image from "next/image"
import { MouseEvent, useRef, useState, useEffect, FC } from "react"

import Message from "./message"
import RightClick from "@/src/components/rightClick"
import { ChatType, MessageBoxDir } from "@/src/models/enum"
import { setToggle } from "@/src/redux/features/toggleSlice"
import { recievedMessageInterface } from "@/src/models/interface"
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks"
import { addSeenIds } from "@/src/redux/features/chatSlice"
import ConfirmModal from "@/src/components/basicComponents/confirmModal"
import { addSelectMessage, addSelectedMessagesContent, addSelectedMessagesMainIds, removeSelectMessage, removeSelectMessageContent, removeSelectedMessagesMainIds, setActiveSelection } from "@/src/redux/features/selectedMessagesSlice"
import { setRepliedMessage, setShowReply } from "@/src/redux/features/repliedMessageSlice"
import findIndex1 from "@/src/helper/deleteMessage"
import findIndex from "@/src/helper/findIndex"
import CustomizedDialogs from "@/src/components/popUp"
import ChatListPopup from "@/src/components/basicComponents/chatListPopup"
import { setIsForward, setForwardMessageIds, setForwardContent } from "@/src/redux/features/forwardMessageSlice"
import { contactInterface } from "@/src/redux/features/userContactListSlice"
import { UserInterface } from "@/src/redux/features/userInfoSlice"

const initialContextMenu = {
    show: false,
    x: 0,
    y: 0
}

interface MessageBoxProps {
    msg: recievedMessageInterface
}

const MessageBox: FC<MessageBoxProps> = ({ msg }) => {

    // states
    const [contextMenu, setContextMenu] = useState(initialContextMenu)
    const [forwardPopupOpen, setForwardPopupOpen] = useState(false)
    const [children, setChildren] = useState<Element>()
    const [showConfirm, setShowConfirm] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)
    const [confirmHandler, setConfirmHandler] = useState<() => void>(() => { })
    const [confirmInfo, setConfirmInfo] = useState({
        confirmTitle: '',
        confirmDiscription: '',
        confirmOption: '',
    })
    const [information, setInformation] = useState({
        dir: MessageBoxDir.rtl,
        name: '',
        profilePic: ''
    })

    // ref
    const messageBoxRef = useRef<HTMLDivElement>(null)
    const selectIconRef = useRef<HTMLDivElement>(null)

    const dispatch = useAppDispatch()

    // selectors
    const User = useAppSelector(state => state.userInfo).User
    const Contact = useAppSelector(state => state.userContact).Contact
    const socket = useAppSelector(state => state.socket).Socket
    const chatId = useAppSelector(state => state.chat).Chat._id
    const chatType = useAppSelector(state => state.chat).Chat.chatType
    const selectedMessages = useAppSelector(state => state.selectedMessage).SelectedMessages
    const activeSelectedMessages = useAppSelector(state => state.selectedMessage).activeSelection
    const chatMessages = useAppSelector(state => state.chat).Chat.messages
    const deleteToggle = useAppSelector(state => state.toggle).Toggle
    const selectedMessagesContent = useAppSelector(state => state.selectedMessage).selectedMessagesContent
    const SelectedMessagesMainIds = useAppSelector(state => state.selectedMessage).SelectedMessagesMainIds
    const userContactList = useAppSelector(state => state.userContactsList).contacts

    // let information = {
    //     dir: MessageBoxDir.rtl,
    //     name: '',
    //     profilePic: ''
    // }

    // let sender;
    // msg.messageInfo.senderId === User._id
    //     ? sender = User
    //     // if sender not user then we should search the sender in groupMembers(chat member) if private then contactId
    //     : sender = Contact

    const [sender, setSender] = useState<contactInterface | UserInterface>()
    useEffect(() => {
        if (msg.messageInfo.senderId === User._id) {
            // @ts-ignore
            setSender(User)
        } else {
            const userContactListIds = userContactList.map(uc => uc._id)
            console.log('userContactListIds: ', userContactListIds)
            let index = findIndex(0, userContactListIds.length, userContactListIds, msg.messageInfo.senderId)
            console.log('index:', index)
            console.log('userContactList[index]: ', userContactList[index])
            // @ts-ignore
            setSender(userContactList[index])
        }

        const profilePic = sender?.profilePic ? (sender.profilePic).split(`\\`) : '';
        information.dir = sender?._id === User._id ? MessageBoxDir.rtl : MessageBoxDir.ltr
        // @ts-ignore
        information.name = sender?.name
        information.profilePic = sender?.profilePic ? profilePic[profilePic.length - 1] : '';

        setInformation({
            dir: sender?._id === User._id ? MessageBoxDir.rtl : MessageBoxDir.ltr,
            // @ts-ignore
            name: sender?.name,
            profilePic: sender?.profilePic ? profilePic[profilePic.length - 1] : ''
        })

        const contactIds = userContactList.map(contact => contact._id)
        // @ts-ignore
        const index = findIndex(0, contactIds.length, contactIds, sender?._id)
        console.log('index')

    }, [])



    const handleContextMenu = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        e.preventDefault()
        const { clientX, clientY } = e
        // access to currentTarget = currentTarget = div:messageBox
        setContextMenu({ show: true, x: clientX, y: clientY })
        const message = e.currentTarget
        setChildren(message)
    }

    const closeContextMenu = () => setContextMenu(initialContextMenu)

    const showConfirmModal = (type: string) => {
        setOpen(true)
        setShowConfirm(true)
        closeContextMenu()
        console.log('type: ', type)
        switch (type) {
            case 'Delete':
                console.log('this is delete handler')
                setConfirmHandler(() => deleteHandler_oneMessage)
                setConfirmInfo({
                    confirmTitle: 'Delete',
                    confirmDiscription: 'Are you sure?',
                    confirmOption: 'delete All'
                })
                break;
            case 'Pin':
                setConfirmHandler(() => pinMessage)
                setConfirmInfo({
                    confirmTitle: 'Pin message',
                    confirmDiscription: 'Pin this message in the chat?',
                    confirmOption: 'Notify all members'
                })
                break;
            default:

                break;
        }
    }

    const deleteHandler_oneMessage = () => {
        console.log('delete msg Done!')
        const deleteInfo = {
            chatId,
            messageIds: [msg._id],
            deleteAll: deleteToggle
        }
        socket.emit('deleteMessage', deleteInfo)
        setShowConfirm(false)

        // delete user message whene deleteAll is false : delete message jus for user
        if (!deleteInfo.deleteAll) {
            const chatMessageIds = chatMessages.map((cm: recievedMessageInterface) => cm._id)
            findIndex1(0, chatMessageIds.length, chatMessageIds, msg._id, dispatch)
        }
        dispatch(setToggle(false))
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
            dispatch(addSelectedMessagesContent(msg))
            dispatch(addSelectedMessagesMainIds(msg.messageInfo._id))
            selectedMessages.map(selectedMsg => {
                if (selectedMsg === msg._id) {
                    counter = counter + 1
                    if (counter === 1) {
                        // selected farii ids
                        const filteredSelectedMessage = selectedMessages.filter(sMsg => sMsg !== msg._id)
                        dispatch(removeSelectMessage(filteredSelectedMessage))

                        // selected main ids
                        const filteredSelectedMessageMainIds = SelectedMessagesMainIds.filter(sMsgMIds => sMsgMIds !== msg.messageInfo._id)
                        dispatch(removeSelectedMessagesMainIds(filteredSelectedMessageMainIds))

                        // selected msg content
                        const filteredSelectedMessageContent = selectedMessagesContent.filter(sMsg => sMsg._id !== msg._id)
                        dispatch(removeSelectMessageContent(filteredSelectedMessageContent))

                        circleStyle.background = 'transparent'
                        circleStyle.borderColor = 'black'
                    }
                }
            })
        }
    }

    const messageDoubleClickHandler = (e: MouseEvent<HTMLDivElement | HTMLLIElement, globalThis.MouseEvent>) => {
        console.log(e)
        console.log(e.currentTarget)

        dispatch(setForwardMessageIds([]))
        dispatch(setIsForward(false))
        dispatch(setShowReply(true))
        dispatch(setRepliedMessage(msg))
        closeContextMenu()

    }

    const pinMessage = () => {
        console.log('pin message done')
        let pinState = false
        console.log('msg.pinStat.pinned:', msg)
        msg.pinStat.pinned ? pinState = false : pinState = true

        const pinnedInfo = {
            chatId,
            messageId: msg._id,
            pin: pinState
        }
        socket.emit('pinUnpinMessage', pinnedInfo)

        closeContextMenu()
        setShowConfirm(false)

    }

    const forwardPopupOpenHandler = () => {
        setForwardPopupOpen(!forwardPopupOpen)
    }
    const forwardMessage = () => {
        setForwardPopupOpen(true)
        dispatch(setShowReply(true))
        dispatch(setIsForward(true))
        dispatch(setForwardMessageIds([msg.messageInfo._id]))
        dispatch(addSelectedMessagesContent(msg))
        console.log('forwarding ...')
        closeContextMenu()

    }


    useEffect(() => {
        if (msg.messageInfo.senderId !== User._id) {
            // console.log('emit seenMessageId : ', msg._id)
            socket.emit('seenMessage', chatId, msg._id)
        }

        socket.on('seenMessage', (messageId, userId) => {
            // console.log('messageId : ' + messageId)
            // console.log('userId : ' + userId)
            if ((messageId === msg._id) && (User._id === msg.messageInfo.senderId) && (User._id !== userId)) {
                console.log('your message seen')
                const chatMessageIds = chatMessages.map((cm: recievedMessageInterface) => cm._id)
                let messageIndex = findIndex(0, chatMessages.length, chatMessageIds, msg._id)
                // console.log('messageIndex', messageIndex)
                dispatch(addSeenIds({ index: messageIndex, userId: userId }))
            }

        });


    }, [User, socket])

    return (
        // id for scroll to repliedMessage
        <div className="messageBox select-none cursor-default" id={msg._id} onDoubleClick={messageDoubleClickHandler} ref={messageBoxRef} onClick={selectHandler} >
            {contextMenu.show &&
                <RightClick
                    x={contextMenu.x}
                    y={contextMenu.y}
                    closeContextMenu={closeContextMenu}
                    child={children}
                    msg={msg}
                    showConfirmModal={showConfirmModal}
                    activeSelection={activeSelection}
                    activeReply={messageDoubleClickHandler}
                    pinMessage={pinMessage}
                    forwardMessage={forwardMessage}
                />
            }
            <div onContextMenu={handleContextMenu} className={`flex items-center gap-1 rounded-xl ${information.dir === 'rtl' ? 'flex-row-reverse' : ''} `}>
                {activeSelectedMessages && <div ref={selectIconRef} className={` w-[15px] h-[15px] border-[1px] border-black rounded-full transition-all duration-100`} > </div>}
                {
                    chatType !== ChatType.private
                        ? msg.messageInfo.senderId !== User._id
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
                        : null
                }

                <div className={`content flex flex-col mb-2 ${information.dir === 'rtl' ? 'items-end' : 'items-start'}`}>
                    {
                        chatType !== ChatType.private
                            ? msg.messageInfo.senderId !== User._id
                                ? (
                                    <div className={`flex gap-2 items-end mb-2 ${information.dir === 'rtl' ? 'flex-row-reverse' : ''} `}>
                                        <h1 className="name font-bold text-sm text-center whitespace-nowrap dark:text-white">{information.name}</h1>
                                    </div>
                                )
                                : null
                            : null
                    }

                    <div className="gap-3 flex flex-col font-[vazir]">
                        <Message type={msg.messageInfo.content.contentType} dir={information.dir} msg={msg} messageBoxRef={messageBoxRef} />
                    </div>
                </div>
            </div>
            {/* ----------------------------- delete modal */}

            <ConfirmModal showConfirm={showConfirm} setShowConfirm={setShowConfirm} open={open} setOpen={setOpen} confirmHandler={confirmHandler} confirmInfo={confirmInfo} />
            {forwardPopupOpen
                ? <CustomizedDialogs
                    open={forwardPopupOpen}
                    title="Forward to ..."
                    handelOpen={forwardPopupOpenHandler}
                    children={<ChatListPopup setForwardPopupOpen={setForwardPopupOpen} />} />
                : null
            }
        </div>
    )
}

export default MessageBox