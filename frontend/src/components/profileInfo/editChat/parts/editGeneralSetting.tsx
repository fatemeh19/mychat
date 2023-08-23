import DropDown from "@/src/components/basicComponents/dropDown/dropDown";
import { setOpenGroupType } from "@/src/redux/features/openSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { FC } from "react";
import { LuType } from 'react-icons/lu'
interface EditGeneralSettingsProps {

}

const EditGeneralSettings: FC<EditGeneralSettingsProps> = () => {
    const groupType = useAppSelector(state => state.chat.Chat).groupTypeSetting.groupType
    const dispatch = useAppDispatch()
    return (
        <div className=" w-full flex flex-col items-end justify-between gap-5 relative select-none py-1 bg-white
                shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)]">
            <div className="flex items-center justify-between w-full hover:bg-gray-100 cursor-pointer p-[25px] transition-all duration-150" onClick={() => { dispatch(setOpenGroupType(true)) }}>
                <div className="flex gap-3">
                    <LuType className="w-6 h-6 bg-blue-500 rounded-[5px] text-center text-white p-[2px] text-xs" />
                    <p>Group type</p>
                </div>

                <div>
                    {groupType}
                </div>
            </div>

        </div>
    );
}

export default EditGeneralSettings;