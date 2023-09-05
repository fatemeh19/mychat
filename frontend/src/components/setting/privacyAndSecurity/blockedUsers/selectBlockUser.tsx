import { FC, MouseEvent, useEffect, useState } from "react";
import SearchBox from "../../../mainPage/leftSideMainPage/chatList/searchBox";
import { useAppSelector } from "@/src/redux/hooks";
import ChatContactBox from "../../../mainPage/leftSideMainPage/chatList/chatContactBox";
import { profilePicHandler } from "@/src/helper/userInformation";
import { chatBoxInterface } from "@/src/redux/features/userChatListSlice";
import { contactInterface } from "@/src/redux/features/userContactListSlice";
import ContactBox from "@/src/components/contact/contactList/contactBox";
import CustomizedDialogs from "@/src/components/popUp";
import ConfirmModal from "@/src/components/basicComponents/confirmModal";
import { ChatType } from "@/src/models/enum";

enum tabName {
    chats = "CHATS",
    contacts = "CONTACTS"
}

interface SelectBlockUserProps {

}

const SelectBlockUser: FC<SelectBlockUserProps> = () => {

    const chatList = useAppSelector(state => state.userChatList).chatList
    const userContacts = useAppSelector(state => state.userContactsList).contacts
    const [tabOpen, setTabOpen] = useState<tabName>(tabName.chats)
    const [chats, setChats] = useState<chatBoxInterface[]>([])
    const [contacts, setContacts] = useState<contactInterface[]>([])
    const [openBlockConfirm, setOpenBlockConfirm] = useState<boolean>(false)

    const [blockHandlerState, setBlockHandlerState] = useState<() => void>(() => { })
    const [blockingUserName, setBlockingUserName] = useState<string>('')

    const clickHandler = (e: MouseEvent<HTMLHeadingElement, globalThis.MouseEvent>) => {
        // @ts-ignore   
        if (e.target.innerText === tabName.chats) {
            setTabOpen(tabName.chats)
            // @ts-ignore
            e.currentTarget.style.color = "rgb(37,99,235)"
            e.currentTarget.style.borderBottom = "1px solid rgb(30,64,175)"
            // @ts-ignore
            e.target.nextSibling.style.color = 'black'
            // @ts-ignore
            e.target.nextSibling.style.borderBottom = 'none'

            setChats(chatList)
        } else {
            setTabOpen(tabName.contacts)
            // @ts-ignore
            e.target.previousSibling.style.color = 'black'
            // @ts-ignore
            e.target.previousSibling.style.borderBottom = 'none'
            e.currentTarget.style.color = "rgb(37,99,235)"
            e.currentTarget.style.borderBottom = "1px solid rgb(30,64,175)"


            setContacts(userContacts)
        }


    }

    return (
        <div className="min-h-[400px] font-[Vazir]">
            <SearchBox />
            <div className="flex w-full items-center justify-around">
                <h1 className="uppercase py-2 px-5 cursor-pointer bg-white hover:bg-gray-200 rounded-md transition-all duration-150 " onClick={clickHandler} >CHATS</h1>
                <h1 className="uppercase py-2 px-5 cursor-pointer bg-white hover:bg-gray-200 rounded-md transition-all duration-150 " onClick={clickHandler} >CONTACTS</h1>
            </div>
            <div className="flex flex-col ">
                {
                    tabOpen === tabName.chats && chats.length > 0
                        ?
                        chatList.map(chat => {
                            if (chat.chatType === ChatType.private) {
                                return <ChatContactBox
                                    key={chat._id}
                                    chatbox={chat}
                                    ContactName={chat.chatInfo.name}
                                    profilePicName={chat.chatInfo.profilePic ? profilePicHandler(chat.chatInfo) : '/defaults/defaultProfilePic.png'}
                                    contactId={chat.chatInfo._id}
                                    chatOpennedP={true}
                                    lastMessegeByContact={false}
                                    status={chat.chatInfo.status}
                                    lastMessage={''}
                                    ContactSeen={false}
                                    lastMessageTime={''}
                                    numberOfUnSeen={''}
                                    recivedMessage={true}
                                    isTyping={false}
                                    popup={true}

                                    block={true}
                                    setBlockHandlerState={setBlockHandlerState}
                                    setOpenBlockConfirm={setOpenBlockConfirm}
                                    setBlockingUserName={setBlockingUserName}
                                />
                            }
                        })
                        : tabOpen === tabName.contacts && contacts.length > 0
                            ? contacts.map(contact => {
                                return <ContactBox
                                    key={contact._id}
                                    contact={contact}
                                    isOpenChat={false}

                                    block={true}
                                    setBlockHandlerState={setBlockHandlerState}
                                    setOpenBlockConfirm={setOpenBlockConfirm}
                                    setBlockingUserName={setBlockingUserName}
                                />
                            })
                            : null
                }
                {
                    <ConfirmModal
                        open={openBlockConfirm}
                        setOpen={setOpenBlockConfirm}
                        showConfirm={openBlockConfirm}
                        setShowConfirm={() => setOpenBlockConfirm(!open)}
                        confirmHandler={blockHandlerState}
                        confirmInfo={{ confirmDiscription: `Are you sure you want to block ${blockingUserName}?` }}
                    />}

            </div>
        </div>
    );
}

export default SelectBlockUser;