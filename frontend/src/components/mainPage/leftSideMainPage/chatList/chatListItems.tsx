"use client"

import ChatContactBox from './chatContactBox';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import Link from 'next/link';
import { profilePicNameHandler, } from '@/src/helper/userInformation';
import { setShowReply } from '@/src/redux/features/repliedMessageSlice';
import findIndex from '@/src/helper/findIndex';
import { SearchType } from '@/src/models/enum';
export default function ChatListItems({ popup }: { popup: boolean }) {
    const Contact = useAppSelector(state => state.userContact).Contact
    const chatList = useAppSelector(state => state.userChatList).chatList
    const chatOpenInList = useAppSelector(state => state.chatOpenInList).chatOpenInList
    const isSearch = useAppSelector(state => state.search).isSearch
    const searchedChats = useAppSelector(state => state.search).searchedChats
    const searchedMessages = useAppSelector(state => state.search).searchedMessages
    const searchType = useAppSelector(state => state.search).searchType
    const chat = useAppSelector(state => state.chat).Chat

    const dispatch = useAppDispatch()


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
                {
                    isSearch
                        ? searchType === SearchType.chats
                            ? searchedChats.map(searchedChat => {
                                const findChat = chatList.filter(chat => chat._id === searchedChat._id)[0]
                                console.log('findChat : ', findChat)

                                // return <p key={searchedChat._id}>searching</p>

                                return <Link key={findChat._id} href={`/chat/${findChat._id}`} >
                                    {/* @ts-ignore */}

                                    <ChatContactBox
                                        profilePicName=
                                        {findChat.chatInfo.profilePic ? `/uploads/photo/${profilePicNameHandler(findChat.chatInfo)}`
                                            : '/uploads/photo/defaultProfilePic.png'}
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
                                console.log('searchMessage : ', searchedMessage)

                                return <Link key={searchedMessage._id} href={`#${searchedMessage._id}`} >
                                    {/* @ts-ignore */}

                                    <ChatContactBox
                                        profilePicName=
                                        {searchedMessage.senderInfo[0].profilePic ? `/uploads/photo/${profilePicNameHandler(searchedMessage.senderInfo[0])}`
                                            : '/uploads/photo/defaultProfilePic.png'}
                                        contactId={''} chatOpennedP={false}
                                        lastMessegeByContact={false}
                                        ContactName={searchedMessage.senderInfo[0].name}
                                        lastMessage={searchedMessage.content.text} ContactSeen={false}
                                        lastMessageTime={''} numberOfUnSeen={''}
                                        recivedMessage={true} isTyping={false}
                                        chatbox={searchedMessage}
                                        popup={popup}
                                    />
                                </Link>
                            })
                        : (chatList.length === 0)
                            ? null
                            : chatList.map((chatBox) => (
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
    )
}
