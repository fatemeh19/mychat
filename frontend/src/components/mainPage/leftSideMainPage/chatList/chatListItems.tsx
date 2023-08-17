"use client"

import ChatContactBox from './chatContactBox';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import Link from 'next/link';
import { profilePicNameHandler, } from '@/src/helper/userInformation';
import { setShowReply } from '@/src/redux/features/repliedMessageSlice';
import { useEffect, useState } from 'react';
import { checkChatPinOrUnpin, findChatInfo } from '@/src/helper/chatBoxFunctions';
export default function ChatListItems({ popup }: { popup: boolean }) {
    const Contact = useAppSelector(state => state.userContact).Contact
    const folderChatList = useAppSelector(state => state.userChatList).folderChatList
    const chatList = useAppSelector(state => state.userChatList).chatList
    const chatOpenInList = useAppSelector(state => state.chatOpenInList).chatOpenInList
    const folderId = useAppSelector(state => state.userChatList).folderId
    const folders = useAppSelector(state => state.folders).folders
    const UserPinnedChats = useAppSelector(state => state.userInfo).User.pinnedChats

    const [chatPinInfo, setChatPinInfo] = useState<any[]>([]);
    useEffect(() => {
        if (folderId != '') {
            folders.map(folder => {
                if (folder._id == folderId && folder.pinnedChats.length != 0) {
                    console.log('folder pinnedChat:', folder.pinnedChats)
                    findChatInfo(setChatPinInfo, chatList, folder.pinnedChats)
                }
            })
        }
        else if (UserPinnedChats.length != 0) {
            console.log('UserPinnedChats:', UserPinnedChats)
            findChatInfo(setChatPinInfo, chatList, UserPinnedChats)
        }
        console.log(chatPinInfo)
    }, [folderId, UserPinnedChats, folders])
    return (

        <div className="chat-scrollbar w-full 
            h-[80%] 
            tablet:h-screen
            overflow-y-auto">
            <div>
                {
                    (Object.keys(Contact).length == 0) ? null
                        :
                        (chatOpenInList ? null :
                            <Link key={Contact._id} href={`/chat/${Contact._id}`} >
                                <ChatContactBox
                                    profilePicName=
                                    {Contact.profilePic ? `/uploads/photo/${profilePicNameHandler(Contact)}`
                                        : '/uploads/photo/defaultProfilePic.png'}
                                    contactId={Contact._id} chatOpennedP={true}
                                    lastMessegeByContact={false}
                                    ContactName={Contact.name} status={Contact.status}
                                    lastMessage={''} ContactSeen={false} lastMessageTime={''}
                                    numberOfUnSeen={''} recivedMessage={true} isTyping={false} popup={popup} />
                            </Link>
                        )
                }
            </div>
            <div>
                <p>Pinned Chats</p>
                {
                    (chatPinInfo.length === 0) ? null
                        :
                        chatPinInfo.map((chatBox) => (
                            <Link key={chatBox._id} href={`/chat/${chatBox._id}`} >
                                {/* @ts-ignore */}

                                <ChatContactBox
                                    profilePicName=
                                    {chatBox.chatInfo.profilePic ? `/uploads/photo/${profilePicNameHandler(chatBox.chatInfo)}`
                                        : '/uploads/photo/defaultProfilePic.png'}
                                    contactId={chatBox.chatInfo._id} chatOpennedP={chatBox.open}
                                    lastMessegeByContact={false}
                                    ContactName={chatBox.chatInfo.name}
                                    status={Object.keys(chatBox.chatInfo.status).length > 0 ?
                                        chatBox.chatInfo.status : undefined}
                                    lastMessage={chatBox.lastMessage} ContactSeen={false}
                                    lastMessageTime={chatBox.lastMessageTime} numberOfUnSeen={''}
                                    recivedMessage={true} isTyping={false}
                                    chatbox={chatBox}
                                    popup={popup}
                                />
                            </Link>

                        )


                        )
                }
            </div>
            <div>
                <p>all Chats</p>
                {
                    (folderChatList.length === 0) ? null :

                        folderChatList.map((chatBox) => (
                            checkChatPinOrUnpin(folders, UserPinnedChats, chatBox._id, folderId) ? null :
                                < Link key={chatBox._id} href={`/chat/${chatBox._id}`} >
                                    {/* @ts-ignore */}

                                    <ChatContactBox
                                        profilePicName=
                                        {chatBox.chatInfo.profilePic ? `/uploads/photo/${profilePicNameHandler(chatBox.chatInfo)}`
                                            : '/uploads/photo/defaultProfilePic.png'}
                                        contactId={chatBox.chatInfo._id} chatOpennedP={chatBox.open}
                                        lastMessegeByContact={false}
                                        ContactName={chatBox.chatInfo.name}
                                        status={Object.keys(chatBox.chatInfo.status).length > 0 ?
                                            chatBox.chatInfo.status : undefined}
                                        lastMessage={chatBox.lastMessage} ContactSeen={false}
                                        lastMessageTime={chatBox.lastMessageTime} numberOfUnSeen={''}
                                        recivedMessage={true} isTyping={false}
                                        chatbox={chatBox}
                                        popup={popup}
                                    />
                                </Link>

                        )


                        )
                }
            </div>


            {/* <ChatContactBox profilePicName={profilePicName}  lastMessegeByContact={true} ContactName={'Contact name'} status={false} lastMessage={''} ContactSeen={false} lastMessageTime={'4:30 PM'} numberOfUnSeen={''} recivedMessage={true} isTyping={true}  />
                <div className=""><hr className="w-full text-gray-100 opacity-[.3]" /></div>
                <ChatContactBox profilePicName={profilePicName}  lastMessegeByContact={true} ContactName={'Contact name2'} status={true} lastMessage={'hi, how you doin?'} ContactSeen={false} lastMessageTime={'9:36 AM'} numberOfUnSeen={'4'} recivedMessage={false} isTyping={false}  />
                <div className=""><hr className="w-full text-gray-100 opacity-[.3]" /></div>
                <ChatContactBox profilePicName={profilePicName}  lastMessegeByContact={true} ContactName={'Contact name3'} status={true} lastMessage={'Wow really cool'} ContactSeen={false} lastMessageTime={'1:15 AM'} numberOfUnSeen={'1'} recivedMessage={false} isTyping={false}  />
                <div className=""><hr className="w-full text-gray-100 opacity-[.3]" /></div>
                <ChatContactBox profilePicName={profilePicName}  lastMessegeByContact={false} ContactName={'Contact name2'} status={false} lastMessage={'hi, how you doin?'} ContactSeen={true} lastMessageTime={'9:36 AM'} numberOfUnSeen={''} recivedMessage={false} isTyping={false}  /> */}
        </div >
    )
}
