"use client"

import { setChatOpenInList } from "@/src/redux/features/chatOpenInListSlice";
import { setOpenChat } from "@/src/redux/features/openSlice";
import { addChatToTop, openHandle } from "@/src/redux/features/userChatListSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import Image from "next/image"
import { FC, LegacyRef, useEffect, useRef, useState } from "react"
import { BiCheckDouble } from "react-icons/bi";
import { GiCheckMark } from "react-icons/gi";
import { useDispatch } from "react-redux";
import io from 'socket.io-client'
// import { Socket } from "socket.io-client"

interface chatBoxProps {
    chatName: string,
    profilePicName: string,
    chatId: string,
    selectChat?: (chatId: string, chatBoxRef: LegacyRef<HTMLDivElement> | undefined) => void,
}

const ChatBox: FC<chatBoxProps> = ({
    chatName,
    profilePicName,
    chatId,
    selectChat
}) => {
    // const dispatch = useAppDispatch()
    // const [online, setOnline] = useState(status?.online)
    // // const [lastSeen , setLastSeen] = useState(status?.lastseen)
    // const [chatOpenned, setChatOpenned] = useState(chatOpennedP)
    // const socket = useAppSelector(state => state.socket).Socket
    // const chatList = useAppSelector(state => state.userChatList).chatList
    // const chatMessages = useAppSelector(state => state.chat).Chat.messages
    // const [lastMesText, setLastMesText] = useState(lastMessage)
    // const [lastMesTime, setLastMesTime] = useState(lastMessageTime)

    const chatBoxRef = useRef<HTMLDivElement>(null)
    return (
        <div key={chatId}
            onClick={() =>
                selectChat ? selectChat(chatId, chatBoxRef) : null
            }
            className='container cursor-pointer w-full flex p-5 gap-5 container-chatbox hover:bg-gray-50 '

        >
            <div className={''} ref={chatBoxRef}>
                <Image
                    src={profilePicName}
                    className="w-[56px] h-[56px] object-cover rounded-full
                             border-2 border-white"
                    width={500} height={50} alt="contact-profile" />
                <div className="w-5 h-5 bg-blue-500 absolute bottom-0 right-0 rounded-full flex items-center justify-center">
                    <GiCheckMark className="text-white" />
                </div>
            </div>
            <div className='contactMessageDetail w-full '>
                <div className="relative   w-full">
                    <span className='text-md font-bold contact-name w-3/5 inline-block truncate dark:text-white '>
                        {chatName}</span>

                </div>
                <div className="relative mess-detail2 w-full">

                </div>
            </div>
        </div>

    )
}

export default ChatBox