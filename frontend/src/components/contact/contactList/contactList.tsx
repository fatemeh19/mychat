"use client"

import { FC } from "react";
import { BiSearch } from "react-icons/bi";
import ContactBox from "./contactBox";
import Link from "next/link";
import NoContact from "./noContact";
import { useAppSelector } from "@/src/redux/hooks";
import PopUpBtns from "../../popUp/popUpBtns";
import { chatBoxInterface } from "@/src/redux/features/userChatListSlice";
interface ContactsProps {
    handleAddContact: () => void,
    handleOpen: () => void
}

const ContactList: FC<ContactsProps> = ({
    handleAddContact,
    handleOpen
}) => {
    const userContactsList = useAppSelector(state => state.userContactsList).contacts
    const chatList = useAppSelector(state => state.userChatList).chatList
    console.log('usrContactList : ', userContactsList)

    return (

        <>
            <div className="overflow-hidden contacts-list w-full h-[80vh] relative select-none">
                <div className="search-contacts flex pl-[15px]">
                    <BiSearch className="text-xl text-gray-400  mt-[15px]" />
                    <input type="text" className='outline-none bg-transparent w-full border-none p-3' placeholder='Search..' />
                </div>
                <div className=""><hr className="w-full text-gray-100 opacity-[.3]" /></div>
                <div className="no-scrollbar h-full overflow-y-auto pb-[30%] pt-3">
                    {
                        // @ts-ignore
                        (userContactsList.length === 0) ? <NoContact />
                            : userContactsList.map((contact) => {
                                // ------------------------- if this user have chat alredy show the chat
                                let flag = false
                                // @ts-ignore
                                let chat: chatBoxInterface = {}
                                chatList.map(cl => {
                                    if (cl.chatInfo._id === contact._id) {
                                        flag = true
                                        chat = cl
                                    }
                                })
                                if (flag) {
                                    // @ts-ignore
                                    return (
                                        <Link key={chat._id} href={`/chat/${chat._id}`} >
                                            <ContactBox key={contact._id} contact={contact} handleOpen={handleOpen} isOpenChat={true} />
                                        </Link>
                                    )
                                    // ------------------------- end
                                    // ------------------------- if not open the contact box
                                } else {

                                    return (
                                        <Link key={contact._id} href={`/chat/${contact._id}`} >
                                            <ContactBox key={contact._id} contact={contact} handleOpen={handleOpen} isOpenChat={true} />
                                        </Link>

                                    )
                                }
                            })
                    }

                </div>

                {/* <ContactListBtn handleOpen={handleOpen}
                    handleAddContact={handleAddContact} /> */}
                <PopUpBtns
                    title1="Add Contact"
                    title2="Close"
                    id1="add-contact"
                    id2="close"
                    name1="add-contact"
                    name2="close"
                    onClickHandler1={handleAddContact}
                    onClickHandler2={handleOpen}
                />
            </div>

        </>
    )
}

export default ContactList;