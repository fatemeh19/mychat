"use client"

import Image from "next/image"
import { type } from "os";
import { FC ,createRef} from "react"
type Contact={
    name: string;
    _id: string;
    profilePic: string;
}
interface ContactBoxProps {
   contact:Contact;
}

const ContactBox: FC<ContactBoxProps> = ({
    contact
}) => {
    console.log(contact)
    const profileImg = createRef<HTMLImageElement>()
    
    return (
                    <div key={contact._id} className='w-full flex gap-2   mt-3'>
                        <img ref={profileImg} src={contact.profilePic} className="w-[50px] h-[50px] rounded-full " width={50} height={50} alt="contact-profile" />
                        <div className="contact-details h-full pt-1 gap-1 grid w-full">
                            <p className="contact-name font-bold text-sm">{contact.name}</p>
                            <p className="status text-xs text-sky-500">Online</p>
                        </div>
                    </div>
        
    )
}

export default ContactBox