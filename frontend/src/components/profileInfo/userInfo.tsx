import { FC } from "react";
import Informatin from "../mainPage/rightSideMainPage/chatInfo/information";
import InfoSetting from "../mainPage/rightSideMainPage/chatInfo/infoSetting";
import InfoFiles from "../mainPage/rightSideMainPage/chatInfo/infoFiles";
import MoreAction from "../mainPage/rightSideMainPage/chatInfo/moreAction";
import { ChatType } from "@/src/models/enum";

interface UserInfoProps {
}

const UserInfo: FC<UserInfoProps> = () => {
    return (
        <div className="overflow-auto overflow-x-hidden chat-scrollbar min-w-fit max-w-[18rem] bg-gray-100">
            <div className="gap-3 flex flex-col ">
                <Informatin />
                <InfoSetting chatType={ChatType.private} />
                <InfoFiles />
                <MoreAction />
            </div>
        </div>
    );
}

export default UserInfo;