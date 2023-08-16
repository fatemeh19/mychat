import { FC } from "react";
import { LuType } from 'react-icons/lu'

interface EditGeneralSettingsProps {

}

const EditGeneralSettings: FC<EditGeneralSettingsProps> = () => {
    return (
        <div className="overflow-hidden w-full flex flex-col items-end justify-between gap-5 relative select-none py-1 bg-white
                shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)]">
            <div className="flex items-center justify-between w-full p-[25px] hover:bg-gray-100 cursor-pointer transition-all duration-150">
                <div className="flex gap-3">
                    <LuType className="w-6 h-6 bg-blue-500 rounded-[5px] text-center text-white p-[2px] text-xs" />
                    <p>Group type</p>
                </div>
                <div>
                    options
                </div>
            </div>

        </div>
    );
}

export default EditGeneralSettings;