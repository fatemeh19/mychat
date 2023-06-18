"use client"

import { FC, useState } from "react";
import AddContactForm from "./addContact/addContactForm";
import CustomizedDialogs from "../popUp";
import ContactList from "./contactList/contactList";

interface  ContactsProps{
    open: boolean,
    handelOpen: () => void
}

const Contacts:FC<ContactsProps> = ({
    open,
    handelOpen
}) => {
    const [addContact,setAddContact]=useState(false)
    const handle=()=>{
        setAddContact(!addContact)
    }
    return (
        <>
            {
                addContact ? ( open ? <CustomizedDialogs open={open} title="New Contact" 
                                        handelOpen={handelOpen} 
                                        children={<AddContactForm 
                                            // handleOpen={handelOpen}

                                        />} /> :null
                            )
                            : ( open ? <CustomizedDialogs open={open} title="Contacts" 
                            handelOpen={handelOpen} 
                            children={<ContactList
                                handleOpen={handelOpen}
                                handleAddContact={handle}
                            />} /> :null
                )
            
            
            }
        
        </>
    )
}

export default Contacts;