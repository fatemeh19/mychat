"use client"

import ChatContactBox from './chatContactBox';
import { useAppSelector } from '@/src/redux/hooks';
import Link from 'next/link';
import { profilePicNameHandler, } from '@/src/helper/userInformation';
export default function ChatListItems() {
    const Contact = useAppSelector(state => state.userContact).Contact
    const chatList = useAppSelector(state => state.userChatList).chatList
    const chatOpenInList = useAppSelector(state => state.chatOpenInList).chatOpenInList

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
                                        {Contact.profilePic ? `/uploads/picture/${profilePicNameHandler(Contact)}`
                                            : '/uploads/picture/defaultProfilePic.png'}
                                        contactId={Contact._id} chatOpennedP={true} 
                                        lastMessegeByContact={false} 
                                        ContactName={Contact.name} status={Contact.status} 
                                        lastMessage={''} ContactSeen={false} lastMessageTime={''} 
                                        numberOfUnSeen={''} recivedMessage={true} isTyping={false} />
                            </Link>
                        )
                    }
                </div>   
                <div>
                {
                        (chatList.length === 0) ? null : 
                            
                            chatList.map((chatBox) => (
                                <Link key={chatBox._id} href={`/chat/${chatBox._id}`} >
                                    {/* @ts-ignore */}
                                    
                                    <ChatContactBox
                                        profilePicName=
                                        {chatBox.chatInfo.profilePic ? `/uploads/picture/${profilePicNameHandler(chatBox.chatInfo)}`
                                            : '/uploads/picture/defaultProfilePic.png'}
                                        contactId={chatBox.chatInfo._id} chatOpennedP={chatBox.open} 
                                        lastMessegeByContact={false} 
                                        ContactName={chatBox.chatInfo.name} 
                                        status={Object.keys(chatBox.chatInfo.status).length>0 ? 
                                            chatBox.chatInfo.status : undefined} 
                                        lastMessage={chatBox.lastMessage} ContactSeen={false} 
                                        lastMessageTime={chatBox.lastMessageTime} numberOfUnSeen={''} 
                                        recivedMessage={true} isTyping={false} />
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
