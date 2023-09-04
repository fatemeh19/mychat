import Member from "@/src/components/mainPage/rightSideMainPage/chatInfo/memberInfo/member";
import { useAppSelector } from "@/src/redux/hooks";
import { Dispatch, FC, SetStateAction } from "react";
import { HiOutlineHandRaised } from "react-icons/hi2";

interface BlockedUsersProps {
    securityOpenHandler: Dispatch<SetStateAction<boolean>>
}

const BlockedUsers: FC<BlockedUsersProps> = ({ securityOpenHandler }) => {

    const blockedUsers = useAppSelector(state => state.userInfo.setting.privacyAndSecurity.security).blockedUsers

    return (
        <div className="overflow-auto overflow-x-hidden chat-scrollbar bg-gray-100 flex flex-col gap-3">
            <div className="w-full flex items-start px-5 py-3 bg-white cursor-pointer shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)]" onClick={() => { console.log('open select '); securityOpenHandler }}>
                <HiOutlineHandRaised className='text-xl' />
                <p className='text-sm'>
                    Block user
                </p>
            </div>
            <p>Blocked users can't send you messages of add you to groups. They will not see your profile photos, stories, online and lasst seen status.</p>
            <div className="w-full flex items-start px-5 py-3 bg-white cursor-pointer shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)]">
                {
                    blockedUsers.map(userId => {
                        return <p>{userId}</p>
                        // return <Member member={user} />
                    })
                }
            </div>
        </div>
    );
}

export default BlockedUsers;