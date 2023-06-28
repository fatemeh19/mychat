"use client"

import { FC } from "react";
import { BiSearch } from "react-icons/bi";
import ContactBox from "./contactBox";
import ContactListBtn from "./contactListBtn";
import Link from "next/link";
import NoContact from "./noContact";
import {useAppSelector } from "@/src/redux/hooks";
interface ContactsProps {
    handleAddContact: () => void,
    handleOpen: () => void
}

const ContactList: FC<ContactsProps> = ({
    handleAddContact,
    handleOpen
}) => {
    const selector = useAppSelector(state => state.userContactsList)
    const userContactsList = selector.contacts
    return (

        <>
            <div className="overflow-hidden contacts-list w-full h-[80vh] relative select-none">
                <div className="search-contacts flex pl-[15px]">
                    <BiSearch className="text-xl text-gray-400  mt-[15px]" />
                    <input type="text" className='outline-none bg-transparent w-full border-none p-3' placeholder='Search..' />
                </div>
                <div className=""><hr className="w-full text-gray-100 opacity-[.3]" /></div>
                <div className="no-scrollbar h-full overflow-y-auto pb-[30%]">
                    {
                        // @ts-ignore
                        (userContactsList.length === 0) ? <NoContact />
                            : userContactsList.map((contact) => (
                                // @ts-ignore
                                <Link key={contact._id} href={`/chat/${contact._id}`} >
                                    {/* @ts-ignore */}
                                    <ContactBox key={contact._id} contact={contact} handleOpen={handleOpen} />
                                </Link>

                            ))

                    }

                </div>

                <ContactListBtn handleOpen={handleOpen}
                    handleAddContact={handleAddContact} />
            </div>

        </>
    )
}

export default ContactList;