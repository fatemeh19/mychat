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
        console.log('contentProtectionRef', contentProtectionRef)
    }, [contentProtectionRef.current])


    const toggle = useAppSelector(state => state.toggle).Toggle
    const dispatch = useAppDispatch()
    return (
        <div className="overflow-hidden w-full flex flex-col items-start gap-5 relative select-none p-[25px] bg-white transition-all duration-200
                        shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)]" ref={contentProtectionRef}>
            <p className="text-mainColor font-semibold">content protection</p>
            {/* <Toggle id="saveContent" text="Restrict saving content" toggle={toggle} dispatchHandler={() => dispatch(setToggle(!toggle))} /> */}
            <Toggle id="saveContent" text="Restrict saving content" toggle={typeSetting.restricSavingContent} dispatchHandler={() => setTypeSetting(prevState => ({ ...prevState, restricSavingContent: !prevState.restricSavingContent }))} />
        </div>
    );
}

export default ContentProtection;