"use client"

import SearchBox from './searchBox';
import { BiPin } from "react-icons/bi";
import { BiEdit } from "react-icons/bi";
import { BiMessageRoundedDetail } from "react-icons/bi";
import ChatContactBox from './chatContactBox';
import { useAppSelector } from '@/src/redux/hooks';
import { useState } from 'react';
import ChatListHeader from './chatListHeader';
export default function ChatList(){
    const selector = useAppSelector(state => state.User)
    const User = selector.User
    // console.log('user from redux : ', User)
    const profilePic = User.profilePic ? (User.profilePic).split(`\\`) : '';
    const profilePicName=User.profilePic ? profilePic[profilePic.length - 1] : '1687155573913.jpg';
    const selector2 = useAppSelector(state => state.openChat)
    const openChat = selector2.openChat
    return (
        
        <div className={`h-screen resize-x  bg-white  charListContainer overflow-none  min-w-full
         dark:bg-[rgb(36,36,36)] ${openChat ? ' sm:block hidden ' : ''}`}>
            <div className="
            lg:flex hidden 
            relative px-8 pt-5
            ">
                <h1 className="text-4xl font-bold	dark:text-white">Messages</h1>
                <BiEdit className="text-[#2563eb] absolute right-4 cursor-pointer top-8 text-xl"  />
                
            </div>

            <SearchBox />
            <ChatListHeader />
            <div className="chat-scrollbar w-full 
            h-[80%] 
            tablet:h-screen
            overflow-y-auto">
                
                {(Object.keys(User).length==0) ? null
                : <ChatContactBox profilePicName={profilePicName} chatOpennedP={true} lastMessegeByContact={false} ContactName={User.name} status={false} lastMessage={''} ContactSeen={false} lastMessageTime={''} numberOfUnSeen={''} recivedMessage={true} isTyping={false}  />
                
                }

                
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
