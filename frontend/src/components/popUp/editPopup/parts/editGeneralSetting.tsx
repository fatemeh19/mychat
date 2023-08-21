import DropDown from "@/src/components/basicComponents/dropDown/dropDown";
import { FC } from "react";
import { LuType } from 'react-icons/lu'
interface EditGeneralSettingsProps {

}

const EditGeneralSettings: FC<EditGeneralSettingsProps> = () => {
    return (
        <div className=" w-full flex flex-col items-end justify-between gap-5 relative select-none py-1 bg-white
                shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)]">
            <div className="flex items-center justify-between w-full p-[25px]">
                <div className="flex gap-3">
                    <LuType className="w-6 h-6 bg-blue-500 rounded-[5px] text-center text-white p-[2px] text-xs" />
                    <p>Group type</p>
                </div>
                <DropDown title="group type" items={['private', 'public']} currentValue={'private'} />
                {/* <div>
                    options
                </div> */}
            </div>

        </div>
    );
}

export default EditGeneralSettings;