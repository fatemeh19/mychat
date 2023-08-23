import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import PopUpBtns from "../../../popUpBtns";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { setOpenGroupType } from "@/src/redux/features/openSlice";
import { setIsEditChat } from "@/src/redux/features/chatSlice";
import DropDown from "@/src/components/basicComponents/dropDown/dropDown";
import GroupType from "./groupType";
import InviteLink from "./inviteLink";
import ContentProtection from "./contentProtection";

interface PermissionsProps {
}

const GroupSettings: FC<PermissionsProps> = () => {

    const [publicLink, setPublicLink] = useState('')


    const dispatch = useAppDispatch()
    const chatId = useAppSelector(state => state.chat.Chat)._id

    const savePermissionsHandler = () => {
        // editGroupPermissions(chatId, permissions)
        // dispatch(setUserPermissionsAndExceptions({ permissions: permissions, exceptions: [] }))

        dispatch(setOpenGroupType(false))
        dispatch(setIsEditChat(true))
    }
    return (
        <div className="overflow-auto overflow-x-hidden chat-scrollbar bg-gray-100 mb-[50px]">
            <div className="gap-3 flex flex-col ">

                <GroupType />
                <InviteLink publicLink={publicLink} setPublicLink={setPublicLink} />
                <ContentProtection />

                <PopUpBtns
                    title1="Cancle"
                    id1="cancle"
                    name1="cancle"
                    title2="Save"
                    id2="save"
                    name2="save"
                    onClickHandler1={() => { dispatch(setOpenGroupType(false)); dispatch(setIsEditChat(true)) }}
                    onClickHandler2={savePermissionsHandler}
                    btnContainerClassName={'flex justify-end gap-5'}
                />
            </div>
        </div>
    );
}

export default GroupSettings;