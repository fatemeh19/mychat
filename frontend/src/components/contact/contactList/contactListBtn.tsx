"use client"
import {FC} from "react"
import Input from '../../auth/input'

interface ContactListBtnProps {
    handleAddContact: () => void,
    handleOpen: () => void
}

const ContactListBtn: FC<ContactListBtnProps> = ({
    handleAddContact,
    handleOpen
}) => {

    return (
        <div className="absolute bottom-0 w-full bg-white ">
                    <div className=""><hr className="w-full text-gray-100 opacity-[.3]" /></div>
                    <div className="flex px-[15px] py-3 relative">
                        <button
                            id="add-contact"
                            name="add contact"
                            onClick={handleAddContact}
                            className="font-semibold cursor-pointer bg-white hover:text-sky-700 transition-all duration-150 text-sky-500 outline-none text-base "
                        >Add Contact</button>
                        <button
                            id="add-contact"
                            name="add contact"
                            onClick={handleOpen}
                            className="absolute right-[15px] font-semibold cursor-pointer bg-white hover:text-sky-700 transition-all duration-150 text-sky-500  outline-none text-base"
                        >Close</button>
                    </div>
                    
                 </div>
    )
}

export default ContactListBtn