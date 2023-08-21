"use client"

import { recievedMessageInterface } from "@/src/models/interface";
import { FC, useState, useEffect, useRef } from "react";
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from 'react-icons/bs'
import style from './musicStyle.module.css'
import RepliedMessage from "../repliedMessage";
import { PiPushPinFill } from "react-icons/pi";
interface MusicMessageProps {
    dir: string,
    msg: recievedMessageInterface
}

const MusicMessage: FC<MusicMessageProps> = ({ dir, msg }) => {

    const [playing, setPlay] = useState(false);
    const [value, setValue] = useState(0);
    const [musicDuration, setMusicDuration] = useState(0);

    const Icon2 = playing ? BsFillPauseCircleFill : BsFillPlayCircleFill

    const date = new Date(msg.messageInfo.createdAt);
    const time = date.getHours() + ":" + date.getMinutes()

    const fileFullUrl = msg.messageInfo.content.url.split('\\')
    const fileName = fileFullUrl.slice(fileFullUrl.length - 3, fileFullUrl.length)
    const originalName = msg.messageInfo.content.originalName?.split('.')[0]

    let musicRef = useRef<HTMLAudioElement>(null);
    let rengeRef = useRef<HTMLInputElement>(null);

    const handelPlayPause = () => {
        setPlay(!playing)
        // @ts-ignore
        playing ? musicRef.current.pause() : musicRef.current.play()
        // @ts-ignore
        setValue(musicRef.current.currentTime)
    }

    const handelRange = (e: any) => {
        setValue(e.target.value)
        // @ts-ignore
        musicRef.current.currentTime = e.target.value
        const valPercent = (value / musicDuration) * 100;
        // @ts-ignore
        rengeRef.current
            // @ts-ignore
            ? rengeRef.current.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`
            : null
    }
    const playHandler = () => {
        // @ts-ignore
        setValue(musicRef.current.currentTime)
        const valPercent = (value / musicDuration) * 100;
        // @ts-ignore
        rengeRef.current
            // @ts-ignore
            ? rengeRef.current.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #bebebe ${valPercent}%)`
            : null
    }

    // get music duration
    const onDurationChangeHandler = () => {
        // @ts-ignore
        setMusicDuration(musicRef.current.duration)
    }

    const endHandler = () => {
        setValue(0)
        setPlay(false)
    }
    return (
        <div className={`px-3 ${style.input} pt-3 pb-1  rounded-3xl ${dir === 'rtl' ? 'rounded-tr-sm bg-white' : 'rounded-tl-sm bg-yellow-200'}`}  >
            <div className=" flex items-center w-72 gap-2">
                {
                    msg.messageInfo.reply.isReplied && <RepliedMessage msg={msg} containerClassName={'px-2 py-1'} />
                }
                <div className={` control bg-[#fafafa] cursor-pointer w-12 h-12 rounded-full flex items-center justify-center transition duration-500 ${playing ? '' : 'rotate-90'} ease-in-out `} onClick={handelPlayPause}>
                    <Icon2 className={`w-14 h-14 text-blue-500 ${playing ? '' : 'rotate-[-90deg]'}`} />
                </div>
                <div className="info flex flex-col w-full break-all">
                    <p className="font-semibold text-sm">{originalName}</p>
                    {
                        playing
                            ? <input type="range" ref={rengeRef} id="my-slider" min={0} max={musicDuration} value={value} onInput={handelRange} />

                            : <p className="author text-sm"> [unknown] </p>
                    }
                </div>
                <audio ref={musicRef} src={`/${fileName[0]}/${fileName[1]}/${fileName[2]}`} onTimeUpdate={playHandler} onDurationChange={onDurationChangeHandler} onEnded={endHandler} ></audio>
            </div>
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

export default MusicMessage;