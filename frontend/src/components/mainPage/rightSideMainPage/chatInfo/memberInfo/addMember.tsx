import CreateGroupStep2 from "@/src/components/group/createGroupStep2";
import CustomizedDialogs from "@/src/components/popUp";
import { addGroupMember } from "@/src/helper/useAxiosRequests";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { FC, useState } from "react";
import { GoPersonAdd } from 'react-icons/go'

interface AddMemberProps {

}

const AddMember: FC<AddMemberProps> = () => {

    const dispatch = useAppDispatch()
    const chatId = useAppSelector(state => state.chat.Chat)._id
    const userContacts = useAppSelector(state => state.userContactsList).contacts

    const [openAddContactToGroup, setOpenAddContactToGroup] = useState(false)
    const [memberIds, setMemberIds] = useState<string[]>([])




    const addGroupMemberHandler = () => {
        const memberId = memberIds[0]

        const addedMember = userContacts.filter(userContact => userContact._id === memberId)
        // @ts-ignore
        addGroupMember(chatId, memberId, addedMember[0], dispatch) // memberIds insted of memberId
        setOpenAddContactToGroup(false)
        setMemberIds([])

    }
    const openAddContactToGroupHandler = () => {
        setOpenAddContactToGroup(!openAddContactToGroup)
    }

    return (
        <>
            <div className={`w-full p-5 flex gap-5 items-center text-blue-500 cursor-pointer hover:text-blue-800 transition-all duration-100`}
                onClick={openAddContactToGroupHandler}>
                <GoPersonAdd className='text-3xl ml-1' />
                <div className='flex justify-between w-full'>
                    <p className='text-sm'>Add Members</p>
                </div>
            </div >
            <div>
                {openAddContactToGroup
                    ? (
                        <CustomizedDialogs
                            title='Add Members'
                            children={<CreateGroupStep2 buttonHandler={addGroupMemberHandler} setOpenAddContactToGroup={setOpenAddContactToGroup} memberIds={memberIds} setMemberIds={setMemberIds} buttonTitle="Add" />}
                            open={openAddContactToGroup}
                            handelOpen={openAddContactToGroupHandler} />

                    ) : null}

            </div>
        </>
    );
}

export default AddMember;