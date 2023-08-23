import Toggle from "@/src/components/basicComponents/toggle/toggle";
import { setToggle } from "@/src/redux/features/toggleSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { FC } from "react";

interface ContentProtectionProps {

}

const ContentProtection: FC<ContentProtectionProps> = () => {
    const toggle = useAppSelector(state => state.toggle).Toggle
    const dispatch = useAppDispatch()
    return (
        <div className="overflow-hidden w-full flex flex-col items-start gap-5 relative select-none p-[25px] bg-white
                        shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)]">
            <p className="text-mainColor font-semibold">content protection</p>
            <Toggle id="saveContent" text="Restrict saving content" toggle={toggle} dispatchHandler={() => dispatch(setToggle(!toggle))} />
        </div>
    );
}

export default ContentProtection;