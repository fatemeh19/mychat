import { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { setIsEditChat, setUserPermissionsAndExceptions, userPermissionsInterface } from "@/src/redux/features/chatSlice";
import { setOpenExceptions, setOpenPermissions } from "@/src/redux/features/openSlice";
import PermissionOptions from "./permissionOptions";
import { LuKey } from "react-icons/lu";
import { editGroupPermissions } from "@/src/helper/useAxiosRequests";
import PopUpBtns from "@/src/components/popUp/popUpBtns";

interface PermissionsProps {
}

const Permissions: FC<PermissionsProps> = () => {

    const groupPermissions = useAppSelector(state => state.chat.Chat.userPermissionsAndExceptions).permissions

    const [permissions, setPermissions] = useState<userPermissionsInterface>(groupPermissions)

    const dispatch = useAppDispatch()
    const chatId = useAppSelector(state => state.chat.Chat)._id

    const savePermissionsHandler = () => {
        editGroupPermissions(chatId, permissions)
        dispatch(setUserPermissionsAndExceptions({ permissions: permissions, exceptions: [] }))

        dispatch(setOpenPermissions(false))
        dispatch(setIsEditChat(true))
    }
    return (
        <div className="overflow-auto overflow-x-hidden chat-scrollbar bg-gray-100 mb-[50px]">
            <div className="gap-3 flex flex-col ">
                <PermissionOptions permissions={permissions} setPermissions={setPermissions} />

                <div className="py-1 w-full  cursor-pointer  transition-all duration-150 overflow-hidden select-none bg-white
                        shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)]" onClick={() => { dispatch(setOpenExceptions(true)) }}>
                    <div className="flex items-center gap-3 p-[25px] w-full hover:bg-gray-100">
                        <LuKey className="w-6 h-6 bg-orange-500 rounded-[5px] text-center text-white p-[2px] text-xs" />
                        <p>Exceptions</p>
                    </div>
                </div>

                <PopUpBtns
                    title1="Cancle"
                    id1="cancle"
                    name1="cancle"
                    title2="Save"
                    id2="save"
                    name2="save"
                    onClickHandler1={() => { dispatch(setOpenPermissions(false)); dispatch(setIsEditChat(true)) }}
                    onClickHandler2={savePermissionsHandler}
                    btnContainerClassName={'flex justify-end gap-5'}
                />
            </div>
        </div>
    );
}

export default Permissions;