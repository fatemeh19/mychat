import { FC } from "react";
import CustomizedDialogs from "../popUp";
import ContactList from "../contact/contactList/contactList";
import { BiSearch } from "react-icons/bi";
import { useAppSelector } from "@/src/redux/hooks";
import Link from "next/link";
import ContactBox from "../contact/contactList/contactBox";

interface CreateGroupStep2Props {
    createGroupOpenHandler: () => void
}

const CreateGroupStep2: FC<CreateGroupStep2Props> = ({ createGroupOpenHandler }) => {

    const userContactsList = useAppSelector(state => state.userContactsList).contacts

    const handleOpen = () => {
        console.log('select')
    }

    return (
        <>
            <div className="overflow-hidden contacts-list w-full h-[80vh] relative select-none">

                <div className="h-full overflow-hidden">
                    <div className=" contacts-list w-full h-[80vh] relative select-none flex flex-col">
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
                        <div className="flex justify-end gap-5 p-3 px-5">
                            <button
                                id="add-contact"
                                name="add contact"
                                onClick={createGroupOpenHandler}
                                className="font-semibold cursor-pointer bg-white hover:text-sky-700 transition-all duration-150 text-sky-500 outline-none text-base "
                            >Cancle</button>
                            <button
                                id="add-contact"
                                name="add contact"
                                onClick={() => {
                                    createGroupOpenHandler()
                                }}
                                className="font-semibold cursor-pointer bg-white hover:text-sky-700 transition-all duration-150 text-sky-500 outline-none text-base "
                            >Create</button>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
}

export default CreateGroupStep2;