"use client"

import { FC, useState } from "react";

import Waveform from "./waveForm";
import { recievedMessageInterface } from "@/src/models/interface";
import { PiPushPinFill } from "react-icons/pi";
import { fileHandler } from "@/src/helper/userInformation";

interface VoiceMessageProps {
    dir: string,
    msg: recievedMessageInterface
}

const VoiceMessage: FC<VoiceMessageProps> = ({ dir, msg }) => {

    // const fileFullUrl = msg.messageInfo.content.url.split('\\')
    // const fileName = fileFullUrl.slice(fileFullUrl.length - 3, fileFullUrl.length)


    const date = new Date(msg.messageInfo.createdAt);
    const time = date.getHours() + ":" + date.getMinutes()

    return (
        <div className={`px-3 pt-3 pb-1  rounded-3xl ${dir === 'rtl' ? 'rounded-tr-sm bg-white' : 'rounded-tl-sm bg-yellow-200'}`}  >
            <Waveform url={fileHandler(msg.messageInfo.content.file)} dir={dir} time={time} />
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
        </div>
    );
}

export default VoiceMessage;