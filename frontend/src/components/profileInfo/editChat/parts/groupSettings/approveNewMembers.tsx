import Toggle from "@/src/components/basicComponents/toggle/toggle";
import { groupTypeSettingInterface } from "@/src/redux/features/chatSlice";
import { Dispatch, FC, SetStateAction } from "react";

interface ApproveNewMembersProps {
    typeSetting: groupTypeSettingInterface,
    setTypeSetting: Dispatch<SetStateAction<groupTypeSettingInterface>>
}

const ApproveNewMembers: FC<ApproveNewMembersProps> = ({ typeSetting, setTypeSetting }) => {

    return (
        <div className="overflow-hidden w-full flex flex-col items-start gap-5 relative select-none p-[25px] bg-white transition-all duration-200
                        shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)]" >
            <p className="text-mainColor font-semibold">Who can send messages?</p>
            <Toggle id="newMember" text="Approve new members" toggle={typeSetting.approveNewMembers} dispatchHandler={() => setTypeSetting(prevState => ({ ...prevState, approveNewMembers: !prevState.approveNewMembers }))} />
        </div>
    );
}

export default ApproveNewMembers;