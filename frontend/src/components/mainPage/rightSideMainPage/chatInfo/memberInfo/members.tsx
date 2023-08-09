import { getGroupMembers } from "@/src/helper/useAxiosRequests";
import { groupMembers } from "@/src/models/interface";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { FC, useEffect } from "react";

interface MembersProps {

}

const Members: FC<MembersProps> = () => {

    // const chat = useAppSelector(state => state.chat).Chat  
    // درخواست اچ تی تی چی اعضای گروه

    const dispatch = useAppDispatch()
    const chatId = useAppSelector(state => state.chat).Chat._id

    useEffect(() => {
        (async () => {
            const members = await getGroupMembers(chatId, dispatch)
            console.log('members array : ', members)
        })()


    }, [])

    return (
        <>
            {
                //     chat.members.map((member: groupMembers) => {
                //         const profilePic = member?.profilePic ? (sender.profilePic).split(`\\`) : '';

                //         return <div className="flex gap-2">
                //             <div className={`
                //                 wraper
                //                 overflow-hidden
                //                 bg-transparent
                //                 w-64 h-64
                //                 rounded-full
                //                 flex flex-col items-center justify-center
                //                 border-2 border-dashed border-blue-500
                //                 hover:border-blue-900
                //                 cursor-pointer
                //                 group
                //                 relative
                //                 `}>
                //                 <img
                //                     src=""
                //                     ref={profileImg}
                //                     alt=""
                //                     className="
                //                         absolute
                //                         w-full 
                //                         h-full
                //                         object-cover
                //                         border-4
                //                         border-white
                //                         rounded-full
                //                         group-[:hover]:opacity-50
                //                         "
                //                 />
                //             </div>
                //         </div>
                //     })
            }
        </>
    );
}

export default Members;