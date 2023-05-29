"use client"


import SearchBox from './searchBox'
import { BiPin } from "react-icons/bi";
import { BiMessageRoundedDetail } from "react-icons/bi";
import ChatContactBox from './chatContactBox';

export default function ChatList(){

    return (
        <div className="h-screen  bg-white overflow-auto charListContainer no-scrollbar">
            <h1 className="text-4xl font-bold	px-8 pt-5">Messages</h1>
            <SearchBox  />
            <div className="flex gap-2 text-gray-500 pb-2 px-8 pt-5">
                <BiPin className="text-2xl " />
                <span>PINNED</span>
            </div>
            <ChatContactBox  chatOpenned={false} lastMessegeByContact={true} ContactName={'Contact nameeeeeeee'} status={true} lastMessage={''} ContactSeen={false} lastMessageTime={'4:30 PM'} numberOfUnSeen={'2'} recivedMessage={false} isTyping={true}  />
            <ChatContactBox  chatOpenned={true} lastMessegeByContact={false} ContactName={'Contact name2'} status={false} lastMessage={'hi, how you doin?'} ContactSeen={true} lastMessageTime={'9:36 AM'} numberOfUnSeen={''} recivedMessage={false} isTyping={false}  />
            <ChatContactBox  chatOpenned={false} lastMessegeByContact={true} ContactName={'Contact name3'} status={false} lastMessage={'Wow really cool'} ContactSeen={false} lastMessageTime={'1:15 AM'} numberOfUnSeen={''} recivedMessage={true} isTyping={false}  />

            <div className="flex gap-2 text-gray-500 pb-2 px-8 pt-8">
                <BiMessageRoundedDetail className="text-2xl " />
                <span className="semiBold">ALL MESSAGE</span>
            </div>
            <ChatContactBox  chatOpenned={false} lastMessegeByContact={true} ContactName={'Contact name'} status={false} lastMessage={''} ContactSeen={false} lastMessageTime={'4:30 PM'} numberOfUnSeen={''} recivedMessage={true} isTyping={true}  />
            <div className="px-8"><hr className="w-full text-gray-100 opacity-[.3]" /></div>
            <ChatContactBox  chatOpenned={false} lastMessegeByContact={true} ContactName={'Contact name2'} status={true} lastMessage={'hi, how you doin?'} ContactSeen={false} lastMessageTime={'9:36 AM'} numberOfUnSeen={'4'} recivedMessage={false} isTyping={false}  />
            <div className="px-8"><hr className="w-full text-gray-100 opacity-[.3]" /></div>
            <ChatContactBox  chatOpenned={false} lastMessegeByContact={true} ContactName={'Contact name3'} status={true} lastMessage={'Wow really cool'} ContactSeen={false} lastMessageTime={'1:15 AM'} numberOfUnSeen={'1'} recivedMessage={false} isTyping={false}  />
            <div className="px-8"><hr className="w-full text-gray-100 opacity-[.3]" /></div>
            <ChatContactBox  chatOpenned={false} lastMessegeByContact={false} ContactName={'Contact name2'} status={false} lastMessage={'hi, how you doin?'} ContactSeen={true} lastMessageTime={'9:36 AM'} numberOfUnSeen={''} recivedMessage={false} isTyping={false}  />
            
        </div>
    )
}
