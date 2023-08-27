"use client"

import SearchBox from './searchBox';
import { BiEdit } from "react-icons/bi";
import { BiArrowBack } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { useEffect, useState } from 'react';
import ChatListHeader from './chatListHeader';
import { userHandler } from '@/src/helper/userInformation';
import ChatListItems from './chatListItems';
import callApi from '@/src/helper/callApi';
import { setSearchedChats, setSearchedMessages } from '@/src/redux/features/searchSlice';
export default function ChatList() {

    const dispatch = useAppDispatch()

    const socket = useAppSelector(state => state.socket).Socket
    const openChat = useAppSelector(state => state.open).openChat;
    const isSearch = useAppSelector(state => state.search).isSearch

    const [userId, setUserId] = useState('')

    const userIdHandler = async () => {
        let user = await userHandler();
        setUserId(user._id)
        socket?.emit('online', userId)
        // console.log('user online: ' + userId)

    }

    useEffect(() => {
        socket.on('searchChat', chats => {
            dispatch(setSearchedChats(chats))
        })
        socket.on('searchMessage', messages => {
            dispatch(setSearchedMessages(messages))
        })

        return () => {
            socket.removeAllListeners('searchChat')
            socket.removeAllListeners('searchMessage')
        }
    }, [socket])
    useEffect(() => {
        userIdHandler()
    }, [socket, userId])

    return (

        <div className={`h-screen resize-x  bg-white  charListContainer overflow-none  min-w-full
         dark:bg-[rgb(36,36,36)] ${openChat ? ' sm:block hidden ' : ''}`}>
            <div className="
            lg:flex hidden 
            relative px-8 pt-5
            ">
                <h1 className="text-4xl font-bold	dark:text-white">Messages</h1>
                <BiEdit className="text-[#2563eb] absolute right-4 cursor-pointer top-8 text-xl" />

            </div>

            <SearchBox />
            <ChatListHeader />
            <div className="tablet:block hidden py-4 text-center">
                <BiArrowBack className="text-3xl tablet:block hidden text-gray-500 m-auto mb-3" />
            </div>
            <ChatListItems popup={false} />
        </div>
    )
}