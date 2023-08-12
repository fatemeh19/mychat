import { getGroupMembers } from "@/src/helper/useAxiosRequests";
import { groupMemberInterface } from "@/src/models/interface";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { FC, useEffect } from "react";
import Member from "./member";
import AddMember from "./addMember";

interface MembersProps {

}

const Members: FC<MembersProps> = () => {
    const members = useAppSelector(state => state.chat).groupMembers

    useEffect(() => {
        console.log('members : ', members)

    }, [])

    return (
        <div className={`w-full flex flex-col items-center bg-white shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)]`}>
            <AddMember />
            {/* <div className="flex  items-center justify-start"> */}
            {
                members.map((member: groupMemberInterface) => (
                    <Member key={member._id} member={member} />
                ))
            }
            {/* </div> */}
        </div>
    );
}

export default Members;