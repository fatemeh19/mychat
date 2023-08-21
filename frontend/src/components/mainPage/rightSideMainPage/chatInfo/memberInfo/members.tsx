import { getGroupMembers } from "@/src/helper/useAxiosRequests";
import { groupMemberInterface } from "@/src/models/interface";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { FC, useEffect, useState } from "react";
import Member from "./member";
import AddMember from "./addMember";

interface MembersProps {

}

const Members: FC<MembersProps> = () => {

    const [showAddMembers, setSetshowAddMembers] = useState(true)


    const members = useAppSelector(state => state.chat).groupMembers
    const permissions = useAppSelector(state => state.chat.Chat.userPermissionsAndExceptions).permissions

    useEffect(() => {
        if (permissions) {
            console.log('there is permitssions')
            !permissions.addMember
                // @ts-ignore
                ? setSetshowAddMembers(false)
                // @ts-ignore
                : setSetshowAddMembers(true)
        }
    }, [permissions])


    return (
        <div className={`w-full flex flex-col items-center bg-white shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)]`}>
            {showAddMembers && <AddMember />}
            {
                members.map((member: groupMemberInterface) => (
                    <Member key={member._id} member={member} />
                ))
            }
        </div>
    );
}

export default Members;