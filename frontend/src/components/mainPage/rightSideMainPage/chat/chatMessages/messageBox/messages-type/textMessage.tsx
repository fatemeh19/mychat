import { recievedMessageInterface } from "@/src/models/interface"
import RepliedMessage from "./repliedMessage";
import { RefObject } from "react";



const TextMessage = ({ dir, msg, messageBoxRef }: { dir: string, msg: recievedMessageInterface, messageBoxRef: RefObject<HTMLDivElement> }) => {

    const date = new Date(msg.messageInfo.createdAt);
    const time = date.getHours() + ":" + date.getMinutes()

    return (
        <div className=" max-w-lg ">
            <div className={` flex flex-col gap-1 items-start px-2 py-1 rounded-xl shadow-[0_0_1px_.1px_rgb(0_0_0_/.2)] transition-all duration-75 ${dir === 'rtl' ? 'rounded-tr-sm bg-white' : 'rounded-tl-sm bg-yellow-200'} dark:bg-bgColorDark3 dark:text-white`}>
                {
                    msg.messageInfo.reply.isReplied && <RepliedMessage msg={msg} messageBoxRef={messageBoxRef} />
                }
                <div className="relative flex gap-1 items-end justify-between  w-full">
                    <p className="break-all whitespace-pre-line text-sm ">
                        {msg.messageInfo.content.text}
                    </p>
                    <div className="w-20 h-2 relative">
                        <span className="absolute right-0 bottom-[-5px] date text-xs text-[#9a9a9a] ml-1 mb-[.5px] whitespace-nowrap">{time} AM
                            <span className="pl-1 text-green-500"> \// </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TextMessage