"use client"

import ConfirmModal from "@/src/components/basicComponents/confirmModal";
import ChatRightClick from "@/src/components/rightClick/chatRightClick";
import callApi from "@/src/helper/callApi";
import { checkChatPinOrUnpin, handler } from "@/src/helper/chatBoxFunctions";
import { setChatOpenInList } from "@/src/redux/features/chatOpenInListSlice";
import { addFoldersList, folderInterface } from "@/src/redux/features/folderSlice";
import { setOpenChat } from "@/src/redux/features/openSlice";
import { setShowReply } from "@/src/redux/features/repliedMessageSlice";
import { setActiveSelection } from "@/src/redux/features/selectedMessagesSlice";
import { addChatList, openHandle } from "@/src/redux/features/userChatListSlice";
import { addUserInfo } from "@/src/redux/features/userInfoSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import Image from "next/image"
import { FC, MouseEvent, useEffect, useRef, useState } from "react"
import { BiCheckDouble } from "react-icons/bi";

interface chatContactProps {
    status?: {
        online: boolean,
        lastseen: string | Date | number
    },
    lastMessage: string,
    ContactSeen: Boolean,
    lastMessageTime: string,
    numberOfUnSeen: string,
    recivedMessage: Boolean,
    lastMessegeByContact: Boolean,
    isTyping: Boolean,
    ContactName: string,
    chatOpennedP?: Boolean,
    profilePicName: string,
    contactId: string,
    chatbox?: any,
    popup: boolean
}
const initialContextMenu = {
    show: false,
    x: 0,
    y: 0
}
const ChatContactBox: FC<chatContactProps> = ({
    status,
    lastMessage,
    ContactSeen,
    lastMessageTime,
    numberOfUnSeen,
    recivedMessage,
    lastMessegeByContact,
    isTyping,
    ContactName,
    chatOpennedP,
    profilePicName,
    contactId,
    chatbox,
    popup
}) => {
    const dispatch = useAppDispatch()
    const [online, setOnline] = useState(status?.online)
    // const [chatOpenned, setChatOpenned] = useState(chatOpennedP)
    const socket = useAppSelector(state => state.socket).Socket
    // change chatList to folderChatList state bc i add chats in this state 
    const chatList = useAppSelector(state => state.userChatList).folderChatList
    const folderIdInPin = useAppSelector(state => state.userChatList).folderId
    const chatMessages = useAppSelector(state => state.chat).Chat.messages
    const folders = useAppSelector(state => state.folders).folders
    const User = useAppSelector(state => state.userInfo).User
    const [lastMesText, setLastMesText] = useState(lastMessage)
    const [lastMesTime, setLastMesTime] = useState(lastMessageTime)
    const [contextMenu, setContextMenu] = useState(initialContextMenu)
    const [open, setOpen] = useState<boolean>(false)
    const [openPin, setOpenPin] = useState<boolean>(false)

    const [folderId, setFolderId] = useState('')
    const [showConfirm, setShowConfirm] = useState<boolean>(false)
    const [showConfirmPin, setShowConfirmPin] = useState<boolean>(false)
    const [confirmInfo, setConfirmInfo] = useState({
        confirmDiscription: '',
        confirmTitle: ''
    })
    const token = localStorage.getItem('token')
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const date = new Date(lastMesTime);
    const time = date.getHours() + ":" + date.getMinutes()


    useEffect(() => {
        if (chatOpennedP && (chatMessages != undefined)) {
            if (chatMessages?.length > 0) {
                // if(chatMessages[chatMessages?.length - 1].messageInfo.senderId==contactId){

                // }
                if (chatMessages[chatMessages?.length - 1].messageInfo.content.file
                    && chatMessages[chatMessages?.length - 1].messageInfo.content.text == ''
                ) {
                    let text = chatMessages[chatMessages?.length - 1].messageInfo.content.file.originalName
                    setLastMesText((text ? text : ''))
                }
                else {
                    setLastMesText(chatMessages[chatMessages?.length - 1].messageInfo.content.text)
                }
                setLastMesTime(chatMessages[chatMessages?.length - 1].messageInfo.updatedAt)
                // console.log(lastMesText)

                //add chat on top of the list bc this chat have new message
                if (chatbox != undefined) {
                    // const fromIndex = chatList.indexOf(chatbox)
                    // // console.log(fromIndex)
                    // dispatch(addChatToTop(fromIndex))
                    let counter = 0
                    chatList.map(chat => {
                        // @ts-ignore
                        if (chat._id === chatbox._id) {
                            counter = counter + 1
                            if (counter === 1) {
                                const filterChatList = chatList.filter(chat => chat._id !== chatbox._id)
                                filterChatList.push(chatbox)
                                dispatch(addChatList(filterChatList))
                            }
                        }
                    })

                    const fromIndex = chatList.indexOf(chatbox)
                    // console.log(fromIndex)
                    // dispatch(addChatToTop(fromIndex))
                }
            }
        }
        // })
    }, [chatMessages, chatOpennedP])
    useEffect(() => {
        socket?.on('onlineContact', (CId) => {
            if (contactId == CId) {
                setOnline(true)
            }

        });
        socket?.on('offlineContact', (CId) => {
            if (contactId == CId) {
                setOnline(false)
            }

        });
    }, [socket, contactId])




    const contaxtMenuHandler = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        e.preventDefault()
        const { clientX, clientY } = e
        // access to currentTarget = currentTarget = div:messageBox
        setContextMenu({ show: true, x: clientX, y: clientY })
        // const member = e.currentTarget
    }

    const closeContextMenu = () => setContextMenu(initialContextMenu)

    const showConfirmModal = (title: string, folderId: string) => {
        setOpen(true)
        setShowConfirm(true)
        setFolderId(folderId)
        closeContextMenu()
        setConfirmInfo({
            confirmDiscription: 'Add Chat To Folder?',
            confirmTitle: title
        })

    }
    const showConfirmModalPin = (title: string) => {
        setOpenPin(true)
        setShowConfirmPin(true)
        closeContextMenu()
        setConfirmInfo({
            confirmDiscription: 'Pin/UnPin Chat in list?',
            confirmTitle: title
        })

    }
    const pinUnpinChat = async () => {
        try {
            let body = {
                pin: checkChatPinOrUnpin(folders, User.pinnedChats, chatbox._id, folderIdInPin),
                allChats: true,
                folderId: ''
            }
            if (folderIdInPin != '') {
                body.allChats = false
                body.folderId = folderIdInPin

            }

            const res = await callApi().patch(`/main/chat/pinUnpin/${chatbox._id}`, body, config)
            console.log('pinUnpin res : ', res)
            if (res.status === 200) {
                let filteredSelectedfolder: folderInterface[] = []
                let userInfo;
                if (body.pin) {
                    if (folderIdInPin != '') {
                        for (let i = 0; i < folders.length; i++) {
                            filteredSelectedfolder.push(folders[i])
                            if (folders[i]._id == folderIdInPin) {
                                filteredSelectedfolder[i].pinnedChats.push(chatbox._id)
                            }
                        }
                        dispatch(addFoldersList(filteredSelectedfolder))
                    }
                    else {
                        userInfo = User;
                        // console.log('userInfo:', userInfo)
                        userInfo.pinnedChats.push(chatbox._id)
                        dispatch(addUserInfo(userInfo))
                    }
                }
                else if (!body.pin) {
                    if (folderIdInPin != '') {
                        for (let i = 0; i < folders.length; i++) {
                            filteredSelectedfolder.push(folders[i])
                            if (folders[i]._id == folderId) {
                                filteredSelectedfolder[i].pinnedChats.filter(chat => chat !== chatbox._id)
                            }
                        }
                        dispatch(addFoldersList(filteredSelectedfolder))
                    }
                    else {
                        userInfo = User;
                        userInfo.pinnedChats.filter(chat => chat !== chatbox._id)
                        dispatch(addUserInfo(userInfo))
                    }
                }

            }


        } catch (error) {
            console.log('error in catch text info : ', error)
        }
    }
    const addOrRemoveChatToFolder = () => {
        folders.map(async (folder) => {
            if (folder._id === folderId) {
                let body = {
                    chatId: chatbox._id,
                    add: true
                }
                folder.chats.map(chat => {
                    if (chat.chatInfo === chatbox._id) {
                        body.add = false
                    }
                })
                const res = await callApi().patch(`/main/folder/addRemoveChat/${folderId}`, body, config)
                console.log('addRemoveChat res : ', res)
                if (res.status === 200) {
                    let filteredSelectedfolder: folderInterface[] = []
                    if (body.add) {
                        for (let i = 0; i < folders.length; i++) {
                            filteredSelectedfolder.push(folders[i])
                            if (folders[i]._id == folderId) {
                                let chat = {
                                    pinned: false,
                                    _id: '',
                                    chatInfo: body.chatId,

                                }
                                filteredSelectedfolder[i].chats.push(chat)
                            }
                        }
                    }
                    else if (!body.add) {
                        for (let i = 0; i < folders.length; i++) {
                            filteredSelectedfolder.push(folders[i])
                            if (folders[i]._id == folderId) {
                                filteredSelectedfolder[i].chats.filter(chat => chat.chatInfo !== body.chatId)
                            }
                        }
                    }
                    dispatch(addFoldersList(filteredSelectedfolder))

                }
            }
        })

    }



    return (

        <div onContextMenuCapture={contaxtMenuHandler}
            onClick={() => handler(chatList, dispatch, contactId, popup)}
            className={`container cursor-pointer w-full flex p-5  gap-5 container-chatbox hover:bg-gray-50 
        lg:gap-5  lg:p-5 lg:justify-normal 
        ${popup ? '' : 'tablet:px-2 tablet:py-3 tablet:gap-0 tablet:justify-center'} 
        ${chatOpennedP ? "bg-gray-50 dark:bg-[rgb(132,153,196)]" : ''}`}>

            {contextMenu.show && <ChatRightClick
                x={contextMenu.x}
                y={contextMenu.y}
                chatId={chatbox._id}
                chatPin={!checkChatPinOrUnpin(folders, User.pinnedChats, chatbox._id, folderIdInPin)}
                closeContextMenu={closeContextMenu}
                showConfirmModal={showConfirmModal}
                showConfirmModalPin={showConfirmModalPin}
            />}

            <div className='relative contactProfile h-full'>
                {(online) ?
                    <div className="rounded-full w-[15px] h-[15px] pt-[3px] flex justify-center bg-white absolute bottom-0 right-0 
                    dark:bg-[rgb(36,36,36)]
                    tablet:top-0">
                        <div className="rounded-full w-[10px] h-[10px]  bg-green-500"></div>
                    </div>
                    : null}
                {lastMessegeByContact ?
                    (recivedMessage ? null :
                        (<span className='hidden right-0 bottom-0 text-center text-xs 
                        font-bold absolute rounded-full px-[7px] py-[2px]  bg-mainColor text-white
                        tablet:block'>
                            {numberOfUnSeen}</span>)
                    )
                    : null

                }
                <Image
                    src={profilePicName}
                    className="
                    
                    h-[50px] w-[50px] min-h-[50px] min-w-[50px]
                    object-cover rounded-full  " width={500} height={0} alt="contact-profile" />
            </div>
            <div className={`
                contactMessageDetail w-full 
                lg:grid 
                ${popup ? '' : 'tablet:hidden'}
                grid
            `}>
                <div className="relative   w-full">
                    <span className='text-md font-bold contact-name w-3/5 inline-block truncate dark:text-white '>{ContactName}</span>
                    <div className="right-0 font-semibold text-sm top-[3px] absolute messageTimeSent text-gray-400">
                        <span className="last-mes-time">{lastMesTime != '' ? new Date(lastMesTime).getHours() + " : " + new Date(lastMesTime).getMinutes() : lastMesTime}</span>

                    </div>
                </div>
                <div className="relative mess-detail2 w-full">
                    {
                        popup
                            ? chatbox._id === chatbox.chatInfo._id
                                ? <p>group</p>
                                : <p>{time}</p>
                            : isTyping ?
                                <span className='text-sm text-green-500'>Typing...</span>
                                : <span className={"text-sm truncate last-mes w-5/6 inline-block "
                                    + (recivedMessage ? "text-gray-400" : (ContactSeen ?
                                        (chatOpennedP ? "dark:text-white" : "text-gray-400") : "dark:text-white"))}>
                                    {lastMesText}</span>

                    }
                    {lastMessegeByContact ?
                        (recivedMessage ? null :
                            (<span className=' right-0 top-[3px] text-center text-xs font-bold absolute rounded-full px-[7px] py-[2px]  bg-mainColor text-white'>{numberOfUnSeen}</span>)
                        )
                        : (ContactSeen ?
                            <BiCheckDouble className="check-mes-seen text-green-500 top-[3px] text-[25px] right-0 absolute" />
                            : null
                        )
                    }


                </div>
            </div>
            <ConfirmModal showConfirm={showConfirm} setShowConfirm={setShowConfirm} open={open} setOpen={setOpen} confirmHandler={addOrRemoveChatToFolder} confirmInfo={confirmInfo} />
            <ConfirmModal showConfirm={showConfirmPin} setShowConfirm={setShowConfirmPin} open={openPin} setOpen={setOpenPin} confirmHandler={pinUnpinChat} confirmInfo={confirmInfo} />
        </div>

    )
}

export default ChatContactBox