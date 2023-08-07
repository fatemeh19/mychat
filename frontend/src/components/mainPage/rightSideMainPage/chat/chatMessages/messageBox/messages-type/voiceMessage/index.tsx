"use client"

import { FC, useState } from "react";

import Waveform from "./waveForm";
import { recievedMessageInterface } from "@/src/models/interface";
import { PiPushPinFill } from "react-icons/pi";

interface VoiceMessageProps {
    dir: string,
    msg: recievedMessageInterface
}

const VoiceMessage: FC<VoiceMessageProps> = ({ dir, msg }) => {

    const fileFullUrl = msg.messageInfo.content.url.split('\\')
    const fileName = fileFullUrl.slice(fileFullUrl.length - 3, fileFullUrl.length)


    const date = new Date(msg.messageInfo.createdAt);
    const time = date.getHours() + ":" + date.getMinutes()

    return (
        <div className={`px-3 pt-3 pb-1  rounded-3xl ${dir === 'rtl' ? 'rounded-tr-sm bg-white' : 'rounded-tl-sm bg-yellow-200'}`}  >
            <Waveform url={`/${fileName[0]}/${fileName[1]}/${fileName[2]}`} dir={dir} time={time} />
            <div className={`date absolute right-0 bottom-[-5px] text-xs text-[#9a9a9a] ml-1 mb-[.5px] whitespace-nowrap flex`}>
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