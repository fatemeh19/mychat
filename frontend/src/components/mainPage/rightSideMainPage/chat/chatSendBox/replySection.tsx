import ReplyContentSection from "@/src/components/basicComponents/replyContentSection";
import { messageTypes } from "@/src/models/enum";
import { setShowReply } from "@/src/redux/features/repliedMessageSlice";
import { contactInterface } from "@/src/redux/features/userContactListSlice";
import { UserInterface } from "@/src/redux/features/userInfoSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import Image from "next/image";
import { Dispatch, FC, useState, useEffect } from "react";
import { BsFillReplyFill, BsReply } from "react-icons/bs";
import { GrClose } from 'react-icons/gr'
import style from '../../../../rightClick/style.module.css'
import { recievedMessageInterface } from "@/src/models/interface";
import { setIsForward } from "@/src/redux/features/forwardMessageSlice";
import ForwardContentSection from "@/src/components/basicComponents/forwardContentSection";


interface ReplySectionProps {
    showReply: boolean,
}

const ReplySection: FC<ReplySectionProps> = ({ showReply }) => {

    const [message, setMessage] = useState<recievedMessageInterface>()

    const dispatch = useAppDispatch()
    const isForward = useAppSelector(state => state.forwardMessage).isForward
    const forwardMessageIds = useAppSelector(state => state.forwardMessage).forwardMessageIds
    const forwardContent = useAppSelector(state => state.forwardMessage).content
    const repliedMessage = useAppSelector(state => state.repledMessage).RepliedMessage
    const selectedMessagesContent = useAppSelector(state => state.selectedMessage).selectedMessagesContent


    // console.log('forwardMessage : ', selectedMessagesContent)
    // console.log('repliedMessage : ', repliedMessage)


    useEffect(() => {
        isForward
            ? setMessage(selectedMessagesContent[0])
            : setMessage(repliedMessage)
    })

    return (
        <>
            {
                <div className="bg-white flex justify-between items-center px-4 pt-2 font-[vazir] select-none">
                    <div className="left flex items-center gap-2">

                        <BsFillReplyFill className={` ${isForward ? `${style.rotateZ} ${style.icon}` : ''} w-[25px] h-[25px] text-blue-500`} />

                        {message && !isForward ? <ReplyContentSection isReplied={showReply} repliedMessage={message} /> : null}
                        {message && isForward ? <ForwardContentSection isReplied={showReply} forwaredMessage={message} /> : null}

                    </div>
                    <div className="righ cursor-pointer" onClick={() => { dispatch(setShowReply(false)); dispatch(setIsForward(false)) }}>
                        <GrClose />
                    </div>
                </div >
            }
        </>
    );
}

export default ReplySection;