import Toggle from "@/src/components/basicComponents/toggle/toggle";
import { groupTypeSettingInterface } from "@/src/redux/features/chatSlice";
import { setToggle } from "@/src/redux/features/toggleSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { Dispatch, FC, RefObject, SetStateAction, useEffect, useRef } from "react";

interface ContentProtectionProps {
    setContentProtectionRef: Dispatch<SetStateAction<any>>,


    typeSetting: groupTypeSettingInterface,
    setTypeSetting: Dispatch<SetStateAction<groupTypeSettingInterface>>
}

const ContentProtection: FC<ContentProtectionProps> = ({ typeSetting, setTypeSetting, setContentProtectionRef }) => {

    const contentProtectionRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        contentProtectionRef.current && setContentProtectionRef(contentProtectionRef)
    }, [contentProtectionRef.current])

    return (
        <div>
            <div className="overflow-hidden w-full flex flex-col items-start gap-2 relative select-none p-[25px] pb-[10px] bg-white transition-all duration-200
                        shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)]" ref={contentProtectionRef}>
                <p className="text-mainColor font-semibold">content protection</p>
                <Toggle id="saveContent" text="Restrict saving content" toggle={typeSetting.restrictSavingContent} dispatchHandler={() => setTypeSetting(prevState => ({ ...prevState, restrictSavingContent: !prevState.restrictSavingContent }))} />
            </div>
            <p className="px-[25px] py-[10px] text-gray-500 text-sm">Members won't be able to copy, save or forward content from this group.</p>
        </div>
    );
}

export default ContentProtection;