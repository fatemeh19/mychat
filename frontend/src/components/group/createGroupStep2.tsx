import { Dispatch, FC, LegacyRef, SetStateAction } from "react";
import PopUpBtns from "../popUp/popUpBtns";
import { BiSearch } from "react-icons/bi";
import { useAppSelector } from "@/src/redux/hooks";
import ContactBox from "../contact/contactList/contactBox";
import { contactInterface } from "@/src/redux/features/userContactListSlice";


interface CreateGroupStep2Props {
    createGroupHandler: () => void,
    setOpenAddContactToGroup: Dispatch<SetStateAction<boolean>>,
    memberIds: string[],
    setMemberIds: Dispatch<SetStateAction<string[]>>
}

const CreateGroupStep2: FC<CreateGroupStep2Props> = ({
    createGroupHandler,
    setOpenAddContactToGroup,
    memberIds,
    setMemberIds
}) => {

    const userContactsList = useAppSelector(state => state.userContactsList).contacts

    const selectMember = (contact: contactInterface, contactBoxRef: LegacyRef<HTMLDivElement> | undefined) => {

        // styling selected contact :
        // @ts-ignore
        contactBoxRef.current.style = `
            width:56px;
            height:56px;
            border-radius:100%;
            display:flex;
            flex-direction:column;
            align-items:center;
            border:2px dashed blue;
            cursor:pointer;
            position:relative;
        `
        // contactBoxRef.current.style.before = 'content:"a"'

        let counter = 0
        setMemberIds(prev => [...prev, contact._id])
        memberIds.map(memberId => {
            if (memberId === contact._id) {
                counter = counter + 1
                if (counter === 1) {
                    const filteredSelectedMember = memberIds.filter(mId => mId !== contact._id)
                    setMemberIds(filteredSelectedMember)

                    // remove styling of unSelected contact :
                    // @ts-ignore
                    contactBoxRef.current.style = ''
                }
            }
        })


    }

    const cancleHandler = () => {
        setOpenAddContactToGroup(false)
        setMemberIds([])
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

                            <ContactBox
                                key={contact._id}
                                contact={contact}
                                selectMember={selectMember}
                                isOpenChat={false}
                            />

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
                onClickHandler1={cancleHandler}
                onClickHandler2={createGroupHandler}
                btnContainerClassName="static justify-end gap-9"
            />
        </div>
    );
}

export default CreateGroupStep2;