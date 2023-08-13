import { FC } from "react";
import { BiBell } from "react-icons/bi";
import AddMember from "../mainPage/rightSideMainPage/chatInfo/memberInfo/addMember";
import Members from "../mainPage/rightSideMainPage/chatInfo/memberInfo/members";
import InfoFiles from "../mainPage/rightSideMainPage/chatInfo/infoFiles";
import Informatin from "../mainPage/rightSideMainPage/chatInfo/information";
import InfoSetting from "../mainPage/rightSideMainPage/chatInfo/infoSetting";
import { ChatType } from "@/src/models/enum";

interface GroupInfoProps {

}

const GroupInfo: FC<GroupInfoProps> = () => {
    return (
        <div className="overflow-auto overflow-x-hidden chat-scrollbar bg-gray-100">
            <div className="gap-3 flex flex-col ">
                <Informatin />
                <InfoSetting chatType={ChatType.group} />
                <InfoFiles />
                <Members />
                {/* <InfoFiles /> */}
            </div>
        </div>
    );
}

export default GroupInfo;