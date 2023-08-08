"use client"

import { useEffect, useState, useRef } from "react"

import Chat from "./chat"
import ChatInfo from "./chatInfo"
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks"
import { fetchChat } from "@/src/helper/useAxiosRequests"
import { addMessage, addPinMessage, deleteMessageFromMessageArray, deleteMessageFromPinnedMessagesArray, setChatCreated, setPinState, updateArrayMessages } from "@/src/redux/features/chatSlice"
import { ChatType } from "@/src/models/enum"
import CustomizedDialogs from "../../popUp"
import findIndex from "@/src/helper/findIndex"
import { recievedMessageInterface } from "@/src/models/interface"
import deleteMessage from "@/src/helper/deleteMessage"
import PinnedSection from "./chat/pinnedSection"
import callApi from "@/src/helper/callApi"
import { addUserContact } from "@/src/redux/features/userContactSlice"

interface IUserInfo {
    name: string,
    phoneNumber: string,
    profilePic: string,
    email: string,
    _id: string
}

const getContact = async (id: string) => {
    const token = localStorage.getItem('token')
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const res = await callApi().get(`/main/contact/${id}`, config)
    return res.data.value.contact
}

export default function RightSideMainPage({ contactId }: { contactId: any }) {

    const [infoState, setInfoVState] = useState(false)
    // const [online, setOnline] = useState(false)
    const userInfo = useAppSelector(state => state.userInfo).User
    const dispatch = useAppDispatch()
    const socket = useAppSelector(state => state.socket).Socket
    const chatList = useAppSelector(state => state.userChatList).chatList
    const chatMessages = useAppSelector(state => state.chat).Chat.messages
    const pinnedMessages = useAppSelector(state => state.chat).Chat.pinnedMessages
    const openPinSection = useAppSelector(state => state.open).openPinSectin

    let found = false

    useEffect(() => {
        found = false
        console.log('chatList: ', chatList)
        chatList.map(async cl => {
            console.log('cl._id: ', cl._id)
            console.log('contactId: ', contactId)
            if (cl._id === contactId) {
                console.log('chat is exist')
                fetchChat(cl._id, dispatch)
                dispatch(setChatCreated(true))
                found = true

                if (cl._id === contactId) {
                    // mean : chatType = group => useContact not found so chatInfo is place in it
                    if (cl._id === cl.chatInfo._id) {
                        let userContact = {
                            name: cl.chatInfo.name,
                            profilePic: cl.chatInfo.profilePic
                        }
                        dispatch(addUserContact(userContact))
                        console.log('userContact: ', userContact)
                    } else { // mean: chatType = private => just get contact info
                        let userContact = await getContact(cl.chatInfo._id)
                        dispatch(addUserContact(userContact))
                        console.log('userContact: ', userContact)
                    }
                }
            }
        })
        found === false && dispatch(setChatCreated(false))
    }, [contactId]) //chatList

    useEffect(() => {
        socket?.on('sendMessage', (message) => {
            console.log('i got new Message: ', message)
            dispatch(addMessage(message))
        })
        socket.on('deleteMessage', (data: any) => {
            console.log('delete for all')
            console.log('data : ', data)
            const chatMessageIds = chatMessages.map((cm: recievedMessageInterface) => cm._id)
            console.log('messageIds :', chatMessageIds)
            for (let i = 0; i < data.messageIds.length; i++) {
                deleteMessage(0, chatMessageIds.length, chatMessageIds, data.messageIds[i], dispatch)
            }
        })
        socket.on('pinUnpinMessage', (userId: string, pinnedInfo: any) => {

            console.log('pinnedMessages :', pinnedMessages)
            const chatMessageIds = chatMessages.map((cm: recievedMessageInterface) => cm._id)
            let messageIndex = findIndex(0, chatMessages.length, chatMessageIds, pinnedInfo.messageId)
            console.log('chat index : ', messageIndex)
            console.log('pinnedInfo: ', pinnedInfo)

            if (pinnedInfo.pin) {
                console.log('pin = true', pinnedInfo.pin)
                dispatch(addPinMessage(pinnedInfo.messageId))
                dispatch(setPinState({ index: messageIndex, pinStat: { pinned: true, by: userId } }))

            } else {
                console.log('pin = false', pinnedInfo.pin)
                let pinIndex = findIndex(0, pinnedMessages.length, pinnedMessages, pinnedInfo.messageId)
                dispatch(deleteMessageFromPinnedMessagesArray(pinIndex))
                dispatch(setPinState({ index: messageIndex, pinStat: { pinned: false } }))
            }

        })
        socket.on('forwardMessage', (forwardInfo) => {
            console.log('forwardInfo:', forwardInfo)
            forwardInfo.forwardedMessages.map((fm: recievedMessageInterface) => {
                let chatMessage = {
                    pinState: {
                        pinned: false
                    },
                    forwarded: {
                        isForwarded: true,
                        messageId: fm._id
                    },
                    seenIds: [],
                    deletedIds: [],
                    _id: Math.random()
                }
                dispatch(addMessage(chatMessage))
            })
        })
        return () => {
            socket.removeAllListeners('sendMessage')
            socket.removeAllListeners('deleteMessage')
            socket.removeAllListeners('pinUnpinMessage')
            socket.removeAllListeners('forwardMessage')
        }
    })

    useEffect(() => {
        console.log('pinnedMessages : ', pinnedMessages)

    }, [pinnedMessages])
    useEffect(() => {
        console.log('chatMessages : ', chatMessages)

    }, [chatMessages])
    return (
        <>
            {
                openPinSection
                    ? <PinnedSection />
                    : infoState
                        ? (
                            <div className="flex gap-[1px] justify-end">
                                <div className="w-full ">
                                    <Chat infoState={infoState} setInfoVState={setInfoVState} contactId={contactId} />
                                </div>
                                <div className="min-w-fit">
                                    <ChatInfo />
                                </div>
                            </div>
                        )
                        : <Chat infoState={infoState} setInfoVState={setInfoVState} contactId={contactId} />
            }


        </>
    )
}
