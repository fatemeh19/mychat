import { FC, useState } from "react";
import CustomizedDialogs from "../popUp";
import PopUpBtns from "../popUp/popUpBtns";
import { BiSearch } from "react-icons/bi";
import { useAppSelector } from "@/src/redux/hooks";
import Link from "next/link";
import ContactBox from "../contact/contactList/contactBox";


interface CreateGroupStep2Props {
    createGroupOpenHandler: () => void
}

const CreateGroupStep2: FC<CreateGroupStep2Props> = ({ createGroupOpenHandler }) => {

    const [members, setMembers] = useState<string[]>([])
    const userContactsList = useAppSelector(state => state.userContactsList).contacts

    const handleOpen = () => {
        console.log('select')
    }

    return (
        <div className="overflow-hidden contacts-list w-full h-[80vh] relative select-none">
            <div className="search-contacts flex pl-[15px]">
                <BiSearch className="text-xl text-gray-400  mt-[15px]" />
                <input type="text" className='outline-none bg-transparent w-full border-none p-3 ' placeholder='Search..' />
            </div>
            <div className=""><hr className="w-full text-gray-100 opacity-[.3]" /></div>
            <div className="no-scrollbar h-full overflow-y-auto pb-[30%] ">
                {
                    // @ts-ignore
                    (userContactsList.length === 0) ? <NoContact />
                        : userContactsList.map((contact) => (
                            // @ts-ignore

                            <ContactBox key={contact._id} contact={contact} handleOpen={handleOpen} isOpenChat={false} />

                        ))
                }
            </div>
            <PopUpBtns
                title1="Cancle"
                title2="Create"
                id1="cancle"
                id2="create"
                name1="cancle"
                name2="create"
                onClickHandler1={createGroupOpenHandler}
                onClickHandler2={createGroupOpenHandler}
                btnContainerClassName="static justify-end gap-9"
            />
        </div>
    );
}

export default CreateGroupStep2;