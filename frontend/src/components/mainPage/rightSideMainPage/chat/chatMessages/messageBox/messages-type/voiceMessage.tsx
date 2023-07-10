"use client"

import { FC, useState } from "react";

import Waveform from "./waveForm";
import { recievedMessageInterface } from "@/src/models/interface";

interface VoiceMessageProps {
    dir : string,
    msg : recievedMessageInterface
}

const VoiceMessage: FC<VoiceMessageProps> = ({dir, msg}) => {

    const fileFullUrl = msg.content.url.split('\\')
    const fileName = fileFullUrl.slice(fileFullUrl.length - 3, fileFullUrl.length)

    
    const date = new Date(msg.createdAt);
    const time = date.getHours() + ":" + date.getMinutes()

    return (
        <div className={`px-3 pt-3 pb-1  rounded-3xl ${dir === 'rtl' ? 'rounded-tr-sm bg-white' : 'rounded-tl-sm bg-yellow-200'}`}  >
            <Waveform url={`/${fileName[0]}/${fileName[1]}/${fileName[2]}`} dir={dir} time={time}/>
            <p className={`date text-xs text-[#9a9a9a] mb-1 mt-2 whitespace-nowrap`}>{time}</p>
        </div>
    );
}

export default VoiceMessage;