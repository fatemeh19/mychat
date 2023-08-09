import { FC } from "react";
import { BiBell } from "react-icons/bi";
import AddMember from "../mainPage/rightSideMainPage/chatInfo/memberInfo/addMember";
import Members from "../mainPage/rightSideMainPage/chatInfo/memberInfo/members";
import InfoFiles from "../mainPage/rightSideMainPage/chatInfo/infoFiles";

interface GroupInfoProps {

}

const GroupInfo: FC<GroupInfoProps> = () => {
    return (
        <div className="flex flex-col gap-5 items-start p-5 bg-white
                shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)]">
            {/* notification */}
            <div className='w-full flex gap-7 items-center'>
                <BiBell className='text-3xl ' />
                <div className='flex justify-between w-full'>
                    <p className='value text-sm'>Notifications</p>
                    <input type="checkbox" />
                </div>
            </div>
            <AddMember />
            <Members />
            {/* <InfoFiles /> */}
        </div>
    );
}

export default GroupInfo;