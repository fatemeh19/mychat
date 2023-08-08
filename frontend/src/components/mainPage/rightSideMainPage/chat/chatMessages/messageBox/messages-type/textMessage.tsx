import { recievedMessageInterface } from "@/src/models/interface"
import RepliedMessage from "./repliedMessage";
import { RefObject, useEffect, useState } from "react";
import { BiCheck, BiCheckDouble } from "react-icons/bi";
import { PiPushPinFill } from "react-icons/pi";
import { useAppSelector } from "@/src/redux/hooks";



const TextMessage = ({ dir, msg, messageBoxRef }: { dir: string, msg: recievedMessageInterface, messageBoxRef: RefObject<HTMLDivElement> }) => {

    const date = new Date(msg.messageInfo.createdAt);
    const time = date.getHours() + ":" + date.getMinutes()
    const [seenMessage, setSeenMessage] = useState(false)

    const User = useAppSelector(state => state.userInfo).User
    useEffect(() => {
        if (msg.seenIds.length > 0) {
            setSeenMessage(true)
        }
    }, [msg.seenIds])
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
                    <div className={`w-20 h-2 relative ${msg.pinStat.pinned ? 'w-24' : ''} `}>
                        <div className={`date absolute right-0 bottom-[-5px] text-xs text-[#9a9a9a] ml-1 mb-[.5px] whitespace-nowrap flex`}>
                            {
                                msg.pinStat.pinned ? <PiPushPinFill className='mx-1' /> : null
                            }
                            <span>{time} AM</span>
                            <span className="pl-1 text-green-500">
                                {
                                    msg.messageInfo.senderId === User._id
                                        ? (seenMessage ? <BiCheckDouble /> : <BiCheck />)
                                        : null
                                }

                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TextMessage