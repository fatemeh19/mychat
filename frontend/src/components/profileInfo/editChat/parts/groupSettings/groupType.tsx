import DropDown from "@/src/components/basicComponents/dropDown/dropDown";
import { groupTypeSettingInterface } from "@/src/redux/features/chatSlice";
import { useAppSelector } from "@/src/redux/hooks";
import { FC, Dispatch, SetStateAction, useRef, useEffect } from "react";
import { LuType } from "react-icons/lu";

interface GroupTypeProps {
    setGroupTypeRef: Dispatch<SetStateAction<any>>,
    setTypeSetting: Dispatch<SetStateAction<groupTypeSettingInterface>>
}

const GroupType: FC<GroupTypeProps> = ({ setTypeSetting, setGroupTypeRef }) => {
    const groupType = useAppSelector(state => state.chat.Chat.groupTypeSetting).groupType
    const groupTypeDropDown = useAppSelector(state => state.dropDown).DropDownValue

    // ref
    const groupTypeRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        groupTypeRef.current && setGroupTypeRef(groupTypeRef)
    }, [groupTypeRef.current])

    return (
        <div className="w-full flex flex-col items-start gap-5 relative select-none p-[25px] bg-white transition-all duration-200
                        shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)]" ref={groupTypeRef}>
            <div className="w-full flex justify-between">
                <p>Group type</p>
                <DropDown title="group type" items={['private', 'public']} currentValue={groupType}
                    dispatchHandler={(value) => setTypeSetting(prevState => ({ ...prevState, groupType: value }))}
                />
            </div>
        </div>
    );
}

export default GroupType;