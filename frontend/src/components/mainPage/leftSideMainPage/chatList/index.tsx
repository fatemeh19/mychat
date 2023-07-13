"use client"

import SearchBox from './searchBox';
import { BiPin } from "react-icons/bi";
import { BiEdit } from "react-icons/bi";
import { BiArrowBack } from "react-icons/bi";
import ChatContactBox from './chatContactBox';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { useEffect, useState } from 'react';
import ChatListHeader from './chatListHeader';
import Link from 'next/link';
import { profilePicNameHandler } from '@/src/helper/userInformation';
export default function ChatList() {
    const Contact = useAppSelector(state => state.userContact).Contact
    const chatList = useAppSelector(state => state.userChatList).chatList
    const userInfo = useAppSelector(state => state.userInfo).User
    const socket = useAppSelector(state => state.socket).Socket
    const chatOpenInList = useAppSelector(state => state.chatOpenInList).chatOpenInList
    const openChat = useAppSelector(state => state.openChat).openChat;
    useEffect(() => {
        socket?.emit('online', userInfo._id)
        console.log('user online: '+userInfo._id)
    }, [socket])

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
            <div className="chat-scrollbar w-full 
            h-[80%] 
            tablet:h-screen
            overflow-y-auto">
                <div>
                        {
                            (Object.keys(Contact).length == 0) ? null
                            : 
                            (chatOpenInList? null : 
                                        <ChatContactBox
                                            profilePicName=
                                            {Contact.profilePic ? `/uploads/picture/${profilePicNameHandler(Contact)}`
                                                : '/uploads/picture/defaultProfilePic.png'}
                                            chatOpennedP={true} lastMessegeByContact={false} ContactName={Contact.name} status={false} lastMessage={''} ContactSeen={false} lastMessageTime={''} numberOfUnSeen={''} recivedMessage={true} isTyping={false} />
                            )
                        }
                </div>   
                <div>
                {
                        (chatList.length === 0) ? null : 

                            chatList.map((chatBox) => (
                                <Link key={chatBox._id} href={`/chat/${chatBox.contact._id}`} >
                                    {/* @ts-ignore */}
                                    <ChatContactBox
                                        profilePicName=
                                        {chatBox.contact.profilePic ? `/uploads/picture/${profilePicNameHandler(chatBox.contact)}`
                                            : '/uploads/picture/defaultProfilePic.png'}
                                        chatOpennedP={chatBox.open} lastMessegeByContact={false} ContactName={chatBox.contact.name} status={false} lastMessage={chatBox.lastMessage} ContactSeen={false} lastMessageTime={chatBox.lastMessageTime} numberOfUnSeen={''} recivedMessage={true} isTyping={false} />
                                </Link>
                            ))
                }
                </div>
                   
                 
                    

                {/* <ChatContactBox profilePicName={profilePicName}  lastMessegeByContact={true} ContactName={'Contact name'} status={false} lastMessage={''} ContactSeen={false} lastMessageTime={'4:30 PM'} numberOfUnSeen={''} recivedMessage={true} isTyping={true}  />
                <div className=""><hr className="w-full text-gray-100 opacity-[.3]" /></div>
                <ChatContactBox profilePicName={profilePicName}  lastMessegeByContact={true} ContactName={'Contact name2'} status={true} lastMessage={'hi, how you doin?'} ContactSeen={false} lastMessageTime={'9:36 AM'} numberOfUnSeen={'4'} recivedMessage={false} isTyping={false}  />
                <div className=""><hr className="w-full text-gray-100 opacity-[.3]" /></div>
                <ChatContactBox profilePicName={profilePicName}  lastMessegeByContact={true} ContactName={'Contact name3'} status={true} lastMessage={'Wow really cool'} ContactSeen={false} lastMessageTime={'1:15 AM'} numberOfUnSeen={'1'} recivedMessage={false} isTyping={false}  />
                <div className=""><hr className="w-full text-gray-100 opacity-[.3]" /></div>
                <ChatContactBox profilePicName={profilePicName}  lastMessegeByContact={false} ContactName={'Contact name2'} status={false} lastMessage={'hi, how you doin?'} ContactSeen={true} lastMessageTime={'9:36 AM'} numberOfUnSeen={''} recivedMessage={false} isTyping={false}  /> */}
            </div>
        </div>
    )
}
