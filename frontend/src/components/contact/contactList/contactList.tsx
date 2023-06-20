"use client"

import { FC, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import ContactBox from "./contactBox";
import ContactListBtn from "./contactListBtn";
import callApi from "@/src/helper/callApi";
import Link from "next/link";
import UseLocalStorage from "@/src/helper/useLocalStorate";
import NoContact from "./noContact";

interface  ContactsProps{
    handleAddContact: () => void,
    handleOpen: () => void
}

const ContactList:FC<ContactsProps> = ({
    handleAddContact,
    handleOpen
}) => {
    const [contacts,setContacts]=useState([]);
    useEffect(()=>{
        const fetchData=async () =>{
            console.log('get contacts')
            const {token}=UseLocalStorage();

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const res = await callApi().get('/main/user/contact/', config)
            if (res.statusText && res.statusText === 'OK') {
                console.log(res)
                setContacts(res.data.value.contacts)
                console.log(contacts.length)
            }
        }
        fetchData();
    },[])
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
                        (contacts.length===0 ) ? <NoContact />
                           : contacts.map((contact,index,arr)=>(
                                // @ts-ignore
                                <Link key={contact._id} href={`/chat/${contact._id}`} >
                                    {/* @ts-ignore */}
                                    <ContactBox key={contact._id} contact={contact}/>
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