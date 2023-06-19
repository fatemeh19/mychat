"use client"

import Image from "next/image"
import { useRouter } from "next/navigation";
import { type } from "os";
import { FC } from "react"
type Contact = {
    name: string;
    _id: string;
    profilePic: string;
}
interface ContactBoxProps {
    contact: Contact;
}

const ContactBox: FC<ContactBoxProps> = ({
    contact
}) => {
    const router = useRouter()

    const profilePicName = (contact.profilePic).split(`\\`);
    console.log('contact id :', contact._id)

    // let openContactHandler = () => {
    //     console.log('open contact : ', contact._id)
    //     router.push(`/chat/${contact._id}`)
    // }

    return (
        <div key={contact._id} className='w-full flex gap-4 mt-3 pl-[15px] py-2 hover:bg-gray-100'
            // onClick={openContactHandler}
        >
            <Image src={`/uploads/${profilePicName[profilePicName.length - 1]}`}
                className="w-[50px] h-[50px] object-cover rounded-full "
                width={500} height={50} alt="contact-profile" />
            <div className="contact-details h-full pt-1 gap-1 grid w-full">
                <p className="contact-name font-bold text-sm">{contact.name}</p>
                <p className="status text-xs text-sky-500">Online</p>
            </div>
        </div>

    )
}

export default ContactBox