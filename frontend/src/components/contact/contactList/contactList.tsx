"use client"

import { FC, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import ContactBox from "./contactBox";
import ContactListBtn from "./contactListBtn";
import callApi from "@/src/helper/callApi";

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
            let localStorageString = localStorage.getItem('items')
            let localStorageArray = localStorageString?.split(',')
            // @ts-ignore
            let token = localStorageArray[0].slice(1, localStorageArray[0].length)
            // @ts-ignore
            let userId = localStorageArray[1].slice(0, localStorageArray[1].length-1)
            console.log(token)
            console.log(userId)

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const res = await callApi().get('/main/user/contact/', config)
            if (res.statusText && res.statusText === 'OK') {
                console.log(res)
                setContacts(res.data.value.contacts)
            }
        }
        fetchData();
    },[])
    return (
        <>
            <div className="overflow-hidden contacts-list w-full h-[80vh] relative">
                <div className="search-contacts flex pl-[15px]">
                        <BiSearch className="text-xl text-gray-400  mt-[15px]" />
                        <input type="text" className='outline-none bg-transparent w-full border-none p-3' placeholder='Search..' />
                </div>
                <div className=""><hr className="w-full text-gray-100 opacity-[.3]" /></div>
                <div className="no-scrollbar h-full overflow-y-auto pl-[15px] pb-[30%]">
                    {
                        contacts.map((contact,index,arr)=>(
                            (arr.length==0) ? <h1>no contact</h1> 
                            : 
                            <ContactBox key={contact._id} contact={contact}/>
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