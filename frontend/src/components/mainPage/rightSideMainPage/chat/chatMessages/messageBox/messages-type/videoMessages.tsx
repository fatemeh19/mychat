import { FC, useRef } from "react";
import { recievedMessageInterface } from "@/src/models/interface";
import RepliedMessage from "./repliedMessage";
import { PiPushPinFill } from "react-icons/pi";
import { fileHandler } from "@/src/helper/userInformation";

interface VideoMessageProps {
    dir: string,
    msg: recievedMessageInterface,
    sender: any
}

const VideoMessage: FC<VideoMessageProps> = ({ dir, msg, sender }) => {
    const isText = msg.messageInfo.content.text ? true : false
    const isReplied = msg.messageInfo.reply.isReplied

    const date = new Date(msg.messageInfo.createdAt);
    const time = date.getHours() + ":" + date.getMinutes()

    const videoRef = useRef<HTMLVideoElement>(null)

    return (
        <>

            <div className="relative max-w-[28rem] rounded-xl">
                <div className={`rounded-xl dark:bg-bgColorDark2 dark:text-white ${dir === 'rtl' ? 'rounded-tr-sm bg-white' : 'rounded-tl-sm bg-yellow-200'}`}>
                    {
                        msg.forwarded.isForwarded && <div className="text-xs">
                            <p>Forwarded Message</p>
                            {/* {sender && <p>from {sender.name}</p>} */}
                        </div>
                    }
                    {
                        isReplied && <RepliedMessage msg={msg} containerClassName={'px-2 py-1'} />
                    }
                    <div className="flex flex-col rounded-xl">
                        <video
                            ref={videoRef}
                            // src={`/${fileName[0]}/${fileName[1]}/${fileName[2]}`}
                            src={fileHandler(msg.messageInfo.content.file)}
                            className={`
                                w-[28rem] 
                                ${isText
                                    ? `rounded-t-lg  
                                        ${dir === 'rtl'
                                        ? 'rounded-tr-sm rounded-tl-xl bg-white'
                                        : 'rounded-tl-sm rounded-tr-xl bg-yellow-200'
                                    }`
                                    : `rounded-xl
                                        ${dir === 'rtl'
                                        ? 'rounded-tr-sm rounded-tl-xl bg-white'
                                        : 'rounded-tl-sm rounded-tr-xl bg-yellow-200'
                                    }`
                                }
                                ${isReplied
                                    ? '!rounded-t-sm'
                                    : ''
                                }
                                cursor-pointer
                                `
                            }
                            controls
                        />
                        <div className="relative flex flex-col gap-1 items-end">
                            <div className={`relative pr-[8px] flex justify-between items-end w-fit rounded-xl`}>
                                {
                                    isText
                                        ?
                                        <>
                                            <p className="px-2 py-2 pb-1 break-all whitespace-pre-line text-sm">{msg.messageInfo.content.text}</p>
                                            <div className="w-20 h-2 relative">
                                                <span className="absolute right-0 bottom-[-1px] date text-xs text-[#9a9a9a] ml-1 mb-[.5px] whitespace-nowrap">{time} AM
                                                    <span className="pl-1 text-green-500"> \// </span>
                                                </span>
                                            </div>
                                        </>
                                        :
                                        <div className={`date absolute right-0 bottom-[-5px] text-xs text-[#9a9a9a] ml-1 mb-[.5px] whitespace-nowrap flex`}>
                                            {
                                                msg.messageInfo.edited && <p className="text-xs pr-1">edited</p>
                                            }
                                            {
                                                msg.pinStat.pinned ? <PiPushPinFill className='mx-1' /> : null
                                            }
                                            <span>{time} AM</span>
                                            <span className="pl-1 text-green-500"> \// </span>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default VideoMessage;