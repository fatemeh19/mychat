"use client"

import { useEffect, useState } from "react"

import Chat from "./chat"
import ChatInfo from "./chatInfo"
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks"
import { fetchChat, getGroupMembers } from "@/src/helper/useAxiosRequests"
import { addMessage, addPinMessage, deleteMessageFromPinnedMessagesArray, editMessage, setChatCreated, setChatFetched, setGroupMembersInformation, setPinState, updateArrayMessages } from "@/src/redux/features/chatSlice"
import findIndex from "@/src/helper/findIndex"
import { recievedMessageInterface } from "@/src/models/interface"
import deleteMessage from "@/src/helper/deleteMessage"
import PinnedSection from "./chat/pinnedSection"
import callApi from "@/src/helper/callApi"
import { addUserContact } from "@/src/redux/features/userContactSlice"
import { useRouter } from "next/navigation"

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
    const dispatch = useAppDispatch()
    const socket = useAppSelector(state => state.socket).Socket
    const chatList = useAppSelector(state => state.userChatList).chatList
    const chatMessages = useAppSelector(state => state.chat).Chat.messages
    const pinnedMessages = useAppSelector(state => state.chat).Chat.pinnedMessages
    const openPinSection = useAppSelector(state => state.open).openPinSectin
    const userContacts = useAppSelector(state => state.userContactsList).contacts

    const router = useRouter()

    let found = false

    useEffect(() => {
        found = false
        dispatch(setChatFetched(false))
        chatList.map(async cl => {
            if (cl._id === contactId) {
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
                        // get group members information
                        const members = await getGroupMembers(cl._id, dispatch)
                        dispatch(addUserContact(userContact))
                        dispatch(setGroupMembersInformation(members))
                    } else { // mean: chatType = private => just get contact info
                        let userContact = await getContact(cl.chatInfo._id)
                        dispatch(addUserContact(userContact))
                    }
                }
            }
        })
        if (found === false) {
            dispatch(setChatCreated(false))
            const contact = userContacts.filter(contact => contact._id === contactId)[0]
            contact && dispatch(addUserContact(contact))
        }
    }, [contactId, chatList.length])

    useEffect(() => {
        socket?.on('sendMessage', (message) => {
            dispatch(addMessage(message))
        })
        socket.on('deleteMessage', (data: any) => {
            const chatMessageIds = chatMessages.map((cm: recievedMessageInterface) => cm._id)
            for (let i = 0; i < data.messageIds.length; i++) {
                deleteMessage(0, chatMessageIds.length, chatMessageIds, data.messageIds[i], dispatch)
            }
        })
        socket.on('pinUnpinMessage', (userId: string, pinnedInfo: any) => {
            const chatMessageIds = chatMessages.map((cm: recievedMessageInterface) => cm._id)
            let messageIndex = findIndex(0, chatMessages.length, chatMessageIds, pinnedInfo.messageId)

            if (pinnedInfo.pin) {
                dispatch(addPinMessage(pinnedInfo.messageId))
                dispatch(setPinState({ index: messageIndex, pinStat: { pinned: true, by: userId } }))

            } else {
                let pinIndex = findIndex(0, pinnedMessages.length, pinnedMessages, pinnedInfo.messageId)
                dispatch(deleteMessageFromPinnedMessagesArray(pinIndex))
                dispatch(setPinState({ index: messageIndex, pinStat: { pinned: false } }))
            }

        })
        socket.on('forwardMessage', (forwardInfo) => {
            forwardInfo.map((fm: recievedMessageInterface) => {
                dispatch(addMessage(fm))

            })
        })
        socket.on('editMessage', (message, subId) => {
            const chatMessageIds = chatMessages.map((cm: recievedMessageInterface) => cm._id)
            const index = findIndex(0, chatMessageIds.length, chatMessageIds, subId)
            dispatch(editMessage({ index, message }))
        })

        socket.on('deleteChat', deleteInfo => {
            router.push('/chat')
        })
        return () => {
            socket.removeAllListeners('sendMessage')
            socket.removeAllListeners('deleteMessage')
            socket.removeAllListeners('pinUnpinMessage')
            socket.removeAllListeners('forwardMessage')
            socket.removeAllListeners('editMessage')
        }
    })

    useEffect(() => {
        // console.log('pinnedMessages : ', pinnedMessages)

    }, [pinnedMessages])
    useEffect(() => {
        // console.log('chatMessages : ', chatMessages)

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
