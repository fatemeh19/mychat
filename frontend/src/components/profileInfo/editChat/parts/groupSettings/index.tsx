import { FC, RefObject, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { setOpenGroupType } from "@/src/redux/features/openSlice";
import { setIsEditChat } from "@/src/redux/features/chatSlice";
import GroupType from "./groupType";
import InviteLink from "./inviteLink";
import ContentProtection from "./contentProtection";
import PopUpBtns from "@/src/components/popUp/popUpBtns";
import ApproveNewMembers from "./approveNewMembers";
import { editGroupType } from "@/src/helper/useAxiosRequests";

interface PermissionsProps {
}

const GroupSettings: FC<PermissionsProps> = () => {

    const dispatch = useAppDispatch()

    // state
    const groupTypeSetting = useAppSelector(state => state.chat.Chat).groupTypeSetting
    const chatId = useAppSelector(state => state.chat.Chat)._id

    const [typeSetting, setTypeSetting] = useState(groupTypeSetting)

    // refs
    const [groupTypeRef, setGroupTypeRef] = useState<RefObject<HTMLDivElement>>()
    const [contentProtectionRef, setContentProtectionRef] = useState<RefObject<HTMLDivElement>>()

    useEffect(() => {
        if (typeSetting.groupType === 'private') {
            setTypeSetting(prevState => ({ ...prevState, url: '', approveNewMembers: false }))
        } else if (typeSetting.groupType === 'public') {
            setTypeSetting(prevState => ({ ...prevState, url: groupTypeSetting.url, approveNewMembers: groupTypeSetting.approveNewMembers }))
        }
    }, [typeSetting.groupType])

    const saveGroupTypeSettingHandler = () => {
        editGroupType(chatId, typeSetting, dispatch)
    }
    return (
        <div className="overflow-auto overflow-x-hidden chat-scrollbar bg-gray-100 mb-[50px]">
            <div className="gap-3 flex flex-col ">

                <GroupType setTypeSetting={setTypeSetting} setGroupTypeRef={setGroupTypeRef} />
                <InviteLink typeSetting={typeSetting} setTypeSetting={setTypeSetting} groupTypeRef={groupTypeRef} contentProtectionRef={contentProtectionRef} />
                {typeSetting.groupType === 'public' && <ApproveNewMembers typeSetting={typeSetting} setTypeSetting={setTypeSetting} />}
                <ContentProtection typeSetting={typeSetting} setTypeSetting={setTypeSetting} setContentProtectionRef={setContentProtectionRef} />

                <PopUpBtns
                    title1="Cancle"
                    id1="cancle"
                    name1="cancle"
                    title2="Save"
                    id2="save"
                    name2="save"
                    onClickHandler1={() => { dispatch(setOpenGroupType(false)); dispatch(setIsEditChat(true)) }}
                    onClickHandler2={saveGroupTypeSettingHandler}
                    btnContainerClassName={'flex justify-end gap-5'}
                />
            </div>
        </div>
    );
}

export default GroupSettings;