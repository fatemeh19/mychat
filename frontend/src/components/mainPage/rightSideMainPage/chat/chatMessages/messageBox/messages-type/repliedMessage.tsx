import ReplyContentSection from "@/src/components/basicComponents/replyContentSection";
import { recievedMessageInterface } from "@/src/models/interface";
import { useAppSelector } from "@/src/redux/hooks";
import { FC, RefObject } from "react";

interface RepliedMessageProps {
    msg: recievedMessageInterface,
    containerClassName?: string,
    messageBoxRef?: RefObject<HTMLDivElement>
}

const RepliedMessage: FC<RepliedMessageProps> = ({
    msg,
    containerClassName
}) => {
    const replliedMessageId = msg.reply.messageId
    const chatMessages = useAppSelector(state => state.chat.Chat).messages
    const repliedMessage = chatMessages.filter(m => m._id === replliedMessageId)[0]

    return (
        <a href={`#${repliedMessage._id}`}>
            <div className="flex gap-2 p-2 cursor-pointer" >
                <div className="w-1 rounded-full bg-blue-500"></div>
                <ReplyContentSection isReplied={msg.reply.isReplied} repliedMessage={repliedMessage} containerClassName={containerClassName} />
            </div>
        </a>
    );
}

export default RepliedMessage;