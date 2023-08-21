import { FC } from "react";
import Informatin from "../mainPage/rightSideMainPage/chatInfo/information";
import InfoSetting from "../mainPage/rightSideMainPage/chatInfo/infoSetting";
import InfoFiles from "../mainPage/rightSideMainPage/chatInfo/infoFiles";
import MoreAction from "../mainPage/rightSideMainPage/chatInfo/moreAction";
import { ChatType } from "@/src/models/enum";
import CustomizedDialogs from "../popUp";
import EditPrivateChat from "../popUp/editPopup/editPrivateChat";
import { setIsEditChat } from "@/src/redux/features/chatSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { setOpenPermissions } from "@/src/redux/features/openSlice";

interface UserInfoProps {
}

const UserInfo: FC<UserInfoProps> = () => {

    const dispatch = useAppDispatch()
    const isEditChat = useAppSelector(state => state.chat).isEditChat
    const openPermissions = useAppSelector(state => state.open).openPermissions
    const chatType = useAppSelector(state => state.chat.Chat).chatType

    return (
        <div className="overflow-auto overflow-x-hidden chat-scrollbar min-w-fit max-w-[18rem] bg-gray-100">
            <div className="gap-3 flex flex-col ">
                <Informatin />
                <InfoSetting chatType={ChatType.private} />
                <InfoFiles />
                <MoreAction />
            </div>

            {
                isEditChat
                    ?
                    // openPermissions
                    //     ? <CustomizedDialogs title="Permissions" open={openPermissions} handelOpen={() => dispatch(setOpenPermissions(!openPermissions))} children={<Permissions />} />
                    //     : 
                    <CustomizedDialogs
                        open={isEditChat}
                        title={'Edit'}
                        children={chatType === ChatType.group
                            ? <EditPrivateChat />
                            : <button onClick={() => { dispatch(setIsEditChat(false)) }}> edit private chat </button>}
                        handelOpen={() => dispatch(setIsEditChat(!isEditChat))}
                    />
                    : null
            }
        </div>
    );
}

export default UserInfo;