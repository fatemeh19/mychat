import { setShowReply } from "@/src/redux/features/repliedMessageSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { Dispatch, FC, SetStateAction } from "react";
import { BsFillReplyFill } from "react-icons/bs";
import { GrClose } from 'react-icons/gr'
interface ReplySectionProps {
    // showReply: boolean,
    // setShowReply: Dispatch<SetStateAction<boolean>>
}

const ReplySection: FC<ReplySectionProps> = () => {

    const dispatch = useAppDispatch()

    const showReply = useAppSelector(state => state.repledMessage).ShowReply
    const repliedMessage = useAppSelector(state => state.repledMessage).RepliedMessage

    console.log(repliedMessage)
    return (
        <>
            {
                showReply && <div className="bg-white flex justify-between items-center px-4 pt-2 font-[vazir] select-none">
                    <div className="left flex items-center gap-4">
                        <BsFillReplyFill className={`w-[25px] h-[25px] text-blue-500`} />
                        <div className="flex flex-col ">
                            <p className="username text-blue-500 font-semibold text-sm">Fatemeh Ahmadian</p>
                            <p className="text-black break-all whitespace-pre-line text-sm">
                                {
                                    repliedMessage.content.text !== ''
                                        ? repliedMessage.content.text
                                        : repliedMessage.content.contentType
                                }

                            </p>
                        </div>
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