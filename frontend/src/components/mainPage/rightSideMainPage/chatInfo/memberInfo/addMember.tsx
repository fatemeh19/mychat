import { addGroupMember } from "@/src/helper/useAxiosRequests";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { FC } from "react";
import { GoPersonAdd } from 'react-icons/go'

interface AddMemberProps {

}

const AddMember: FC<AddMemberProps> = () => {

    const dispatch = useAppDispatch()
    const chatId = useAppSelector(state => state.chat.Chat)._id


    const addGroupMemberHandler = () => {
        addGroupMember(chatId, '64d7a2b4a4ed7ca93b47901f', dispatch)
    }

    return (
        <div className={`w-full p-5 flex gap-5 items-center text-blue-500 cursor-pointer hover:text-blue-800 transition-all duration-100`}
            onClick={addGroupMemberHandler}>
            <GoPersonAdd className='text-3xl ml-1' />
            <div className='flex justify-between w-full'>
                <p className='text-sm'>Add Members</p>
            </div>
        </div >
    );
}

export default AddMember;