import { FC } from "react";
import { GoPersonAdd } from 'react-icons/go'

interface AddMemberProps {

}

const AddMember: FC<AddMemberProps> = () => {

    const addMemberHandler = () => {

    }

    return (
        <div className="flex gap-5 items-center justify-start">
            <div className="text-blue-500">
                <GoPersonAdd />
            </div>
            <p>Add Members</p>
        </div>
    );
}

export default AddMember;