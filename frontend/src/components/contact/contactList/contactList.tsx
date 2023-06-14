"use client"

import Image from "next/image";
import { FC } from "react";
import { BiSearch } from "react-icons/bi";
import ContactBox from "./contactBox";
import ContactListBtn from "./contactListBtn";

interface  ContactsProps{
    handleAddContact: () => void,
    handleOpen: () => void
}

const ContactList:FC<ContactsProps> = ({
    handleAddContact,
    handleOpen
}) => {
    return (
        <>
            <div className="overflow-hidden contacts-list w-full h-[80vh] relative">
                <div className="search-contacts flex pl-[15px]">
                        <BiSearch className="text-xl text-gray-400  mt-[15px]" />
                        <input type="text" className='outline-none bg-transparent w-full border-none p-3' placeholder='Search..' />
                </div>
                <div className=""><hr className="w-full text-gray-100 opacity-[.3]" /></div>
                <div className="no-scrollbar h-full overflow-y-auto pl-[15px] pb-[30%]">
                    <ContactBox />
                    <ContactBox />
                    <ContactBox />
                    <ContactBox />
                    <ContactBox />
                    <ContactBox />
                    <ContactBox />
                    <ContactBox />
                    <ContactBox />
                    <ContactBox />
                </div>
                
                <ContactListBtn handleOpen={handleOpen}
                                handleAddContact={handleAddContact} />
            </div>
            
        </>
    )
}

export default ContactList;