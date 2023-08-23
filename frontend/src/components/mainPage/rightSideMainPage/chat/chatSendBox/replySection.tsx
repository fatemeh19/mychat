import ReplyContentSection from "@/src/components/basicComponents/replyContentSection";
import { messageTypes } from "@/src/models/enum";
import { setShowReply } from "@/src/redux/features/repliedMessageSlice";
import { contactInterface } from "@/src/redux/features/userContactListSlice";
import { UserInterface } from "@/src/redux/features/userInfoSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import Image from "next/image";
import { Dispatch, FC, useState, useEffect } from "react";
import { BsFillReplyFill, BsPencilFill } from "react-icons/bs";
import { GrClose } from 'react-icons/gr'
import style from '../../../../rightClick/style.module.css'
import { recievedMessageInterface } from "@/src/models/interface";
import { setIsForward } from "@/src/redux/features/forwardMessageSlice";
import ForwardContentSection from "@/src/components/basicComponents/forwardContentSection";
import { setIsEdit } from "@/src/redux/features/editMessageSlice";


interface ReplySectionProps {
    showReply: boolean,
}

const ReplySection: FC<ReplySectionProps> = ({ showReply }) => {

    const [message, setMessage] = useState<recievedMessageInterface>()

    const dispatch = useAppDispatch()
    const isForward = useAppSelector(state => state.forwardMessage).isForward
    const isEdit = useAppSelector(state => state.editMessage).isEdit
    const forwardMessageIds = useAppSelector(state => state.forwardMessage).forwardMessageIds
    const forwardContent = useAppSelector(state => state.forwardMessage).content
    const repliedMessage = useAppSelector(state => state.repledMessage).RepliedMessage
    const selectedMessagesContent = useAppSelector(state => state.selectedMessage).selectedMessagesContent


    useEffect(() => {
        if (!isForward && !isEdit) {
            setMessage(repliedMessage)
        } else if (isForward || isEdit) {
            setMessage(selectedMessagesContent[0])
        }
    })

    return (
        <>
            {
                <div className="bg-white flex justify-between items-center px-4 pt-2 font-[vazir] select-none">
                    <div className="left flex items-center gap-4">

                        {!isEdit
                            ? <BsFillReplyFill className={` ${isForward ? `${style.rotateZ} ${style.icon}` : ''} w-[25px] h-[25px] text-blue-500`} />
                            : <BsPencilFill className=" w-[20px] h-[20px] text-blue-500 mr-1" />
                        }
                        {message && !isForward && !isEdit ? <ReplyContentSection isReplied={showReply} repliedMessage={message} /> : null}
                        {message && isForward && !isEdit ? <ForwardContentSection isReplied={showReply} forwaredMessage={message} /> : null}
                        {message && !isForward && isEdit ? <ForwardContentSection isReplied={showReply} forwaredMessage={message} /> : null}

                    </div>
                    <div className="righ cursor-pointer" onClick={() => { dispatch(setShowReply(false)); dispatch(setIsForward(false)); dispatch(setIsEdit(false)) }}>
                        <GrClose />
                    </div>
                </div >
            }
        </>
    );
}

export default ReplySection;