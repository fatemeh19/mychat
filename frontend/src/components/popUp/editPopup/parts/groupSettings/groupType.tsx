import DropDown from "@/src/components/basicComponents/dropDown/dropDown";
import { FC } from "react";
import { LuType } from "react-icons/lu";

interface GroupTypeProps {

}

const GroupType: FC<GroupTypeProps> = () => {
    return (
        <div className="w-full flex flex-col items-start gap-5 relative select-none p-[25px] bg-white
                        shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)]">
            <div className="w-full flex justify-between">
                <p>Group type</p>
                <DropDown title="group type" items={['private', 'public']} currentValue={'private'} />
            </div>
        </div>
    );
}

export default GroupType;