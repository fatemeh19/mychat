"use client"

import ChatContactBox from './chatContactBox';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import Link from 'next/link';
import { setShowReply } from '@/src/redux/features/repliedMessageSlice';
import { useEffect, useState } from 'react';
import { checkChatPinOrUnpin, findChatInfo } from '@/src/helper/chatBoxFunctions';
import findIndex from '@/src/helper/findIndex';
import { SearchType, messageTypes } from '@/src/models/enum';
import { profilePicHandler } from '@/src/helper/userInformation';
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
        else if (UserPinnedChats && UserPinnedChats?.length != 0) {
            console.log('UserPinnedChats:', UserPinnedChats)
            findChatInfo(setChatPinInfo, chatList, UserPinnedChats)
        }
        console.log(chatPinInfo)
    }, [folderId, UserPinnedChats, folders])
    const isSearch = useAppSelector(state => state.search).isSearch
    const searchedChats = useAppSelector(state => state.search).searchedChats
    const searchedMessages = useAppSelector(state => state.search).searchedMessages
    const searchType = useAppSelector(state => state.search).searchType
    const chat = useAppSelector(state => state.chat).Chat

    return (
        <div className="chat-scrollbar w-full  
            h-[80%] 
            tablet:h-screen
            overflow-y-auto
            overflow-x-hidden
            ">
            <div>
                {
                    (chatOpenInList ? null :
                        (Object.keys(Contact).length == 0) ? null
                            :
                            <Link key={Contact._id} href={`/chat/${Contact._id}`} >
                                <ChatContactBox
                                    profilePicName={Contact.profilePic ? profilePicHandler(Contact) : '/defaults/defaultProfilePic.png'}
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
                {
                    isSearch
                        ? searchType === SearchType.chats
                            ? searchedChats.map(searchedChat => {
                                const findChat = chatList.filter(chat => chat._id === searchedChat._id)[0]
                                return <Link key={findChat._id} href={`/chat/${findChat._id}`} >
                                    <ChatContactBox
                                        profilePicName={findChat.chatInfo.profilePic ? profilePicHandler(findChat.chatInfo) : '/defaults/defaultProfilePic.png'}
                                        contactId={findChat.chatInfo._id} chatOpennedP={findChat.open}
                                        lastMessegeByContact={false}
                                        ContactName={findChat.chatInfo.name}
                                        status={Object.keys(findChat.chatInfo.status).length > 0 ?
                                            findChat.chatInfo.status : undefined}
                                        lastMessage={findChat.lastMessage} ContactSeen={false}
                                        lastMessageTime={findChat.lastMessageTime} numberOfUnSeen={''}
                                        recivedMessage={true} isTyping={false}
                                        chatbox={findChat}
                                        popup={popup}
                                    />
                                </Link>
                            })
                            : searchedMessages.map(searchedMessage => {
                                return <a key={searchedMessage._id} href={`#${chat.messages[searchedMessage.index]._id}`} >
                                    <ChatContactBox
                                        profilePicName={searchedMessage.senderInfo.profilePic ? profilePicHandler(searchedMessage.senderInfo) : '/defaults/defaultProfilePic.png'}
                                        contactId={''} chatOpennedP={false}
                                        lastMessegeByContact={false}
                                        ContactName={searchedMessage.senderInfo.name}
                                        lastMessage={searchedMessage.content.contentType === messageTypes.text ? searchedMessage.content.text : searchedMessage.content.contentType} ContactSeen={false}
                                        lastMessageTime={''} numberOfUnSeen={''}
                                        recivedMessage={true} isTyping={false}
                                        chatbox={searchedMessage}
                                        popup={popup}
                                    />
                                </a>
                            })
                        : <div>
                            <div>
                                <p>Pinned Chats</p>
                                {
                                    (chatPinInfo.length === 0) ? null
                                        :
                                        chatPinInfo.map((chatBox) => (
                                            <Link key={chatBox._id} href={`/chat/${chatBox._id}`} >
                                                {/* @ts-ignore */}

                                                <ChatContactBox
                                                    profilePicName={chatBox.chatInfo.profilePic ? profilePicHandler(chatBox.chatInfo) : '/defaults/defaultProfilePic.png'}
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
                                            checkChatPinOrUnpin(folders, UserPinnedChats, chatBox._id, folderId) &&
                                            < Link key={chatBox._id} href={`/chat/${chatBox._id}`} >
                                                {/* @ts-ignore */}

                                                <ChatContactBox
                                                    profilePicName={chatBox.chatInfo.profilePic ? profilePicHandler(chatBox.chatInfo) : '/defaults/defaultProfilePic.png'}
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

                        </div>
                }
            </div>

        </div >
    )
}