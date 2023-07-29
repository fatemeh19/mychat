import ReplyContentSection from "@/src/components/basicComponents/replyContentSection";
import { messageTypes } from "@/src/models/enum";
import { setShowReply } from "@/src/redux/features/repliedMessageSlice";
import { contactInterface } from "@/src/redux/features/userContactListSlice";
import { UserInterface } from "@/src/redux/features/userInfoSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import Image from "next/image";
import { Dispatch, FC, SetStateAction } from "react";
import { BsFillReplyFill } from "react-icons/bs";
import { GrClose } from 'react-icons/gr'
interface ReplySectionProps {
    showReply: boolean
}

const ReplySection: FC<ReplySectionProps> = ({ showReply }) => {

    const dispatch = useAppDispatch()
    const repliedMessage = useAppSelector(state => state.repledMessage).RepliedMessage


    return (
        <>
            {
                <div className="bg-white flex justify-between items-center px-4 pt-2 font-[vazir] select-none">
                    <div className="left flex items-center gap-2">
                        <BsFillReplyFill className={`w-[25px] h-[25px] text-blue-500`} />

                        <ReplyContentSection isReplied={showReply} repliedMessage={repliedMessage} />

                    </div>
                    <div className="righ cursor-pointer" onClick={() => dispatch(setShowReply(false))}>
                        <GrClose />
                    </div>
                </div>
            }
        </>
    );
}

export default ReplySection;