import { FC } from "react";
import { GoPersonAdd } from 'react-icons/go'

interface AddMemberProps {

}

const AddMember: FC<AddMemberProps> = () => {

    const addMemberHandler = () => {

    }

    return (
        <div className={`w-full p-5 flex gap-5 items-center text-blue-500 cursor-pointer hover:text-blue-800 transition-all duration-100`}>
            <GoPersonAdd className='text-3xl ml-1' />
            <div className='flex justify-between w-full'>
                <p className='text-sm'>Add Members</p>
            </div>
        </div >
    );
}

export default AddMember;