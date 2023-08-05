import { recievedMessageInterface } from "@/src/models/interface";
import { FC, useState, createRef, useEffect } from "react";
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from 'react-icons/bs'
import RepliedMessage from "./repliedMessage";

interface MusicMessageProps {
    dir: string,
    msg: recievedMessageInterface
}

const MusicMessage: FC<MusicMessageProps> = ({ dir, msg }) => {

    const [playing, setPlay] = useState(false);
    const Icon2 = playing ? BsFillPauseCircleFill : BsFillPlayCircleFill

    const date = new Date(msg.messageInfo.createdAt);
    const time = date.getHours() + ":" + date.getMinutes()

    const fileFullUrl = msg.messageInfo.content.url.split('\\')
    const fileName = fileFullUrl.slice(fileFullUrl.length - 3, fileFullUrl.length)

    const originalName = msg.messageInfo.content.originalName?.split('.')[0]

    let music = createRef<HTMLAudioElement>();
    useEffect(() => {
        music = createRef<HTMLAudioElement>()
    }, [])

    const handelPlayPause = () => {
        setPlay(!playing)
        console.log(playing)
        playing ? music.current?.pause() : music.current?.play()
    }
    const handelTile = () => {
        console.log(music.current?.currentTime)
    }

    const handelRange = (e: any) => {
        console.log(e)
        const mySlider = document.getElementById("my-slider");
        // @ts-ignore
        const valPercent = (mySlider?.value / mySlider.max) * 100;
        // @ts-ignore
        mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`;

    }
    const playHandler = () => {
        console.log('play1')
        const mySlider = document.getElementById("my-slider");

        // mySlider.style = `background: linear-gradient(90deg, rgba(230,126,34,1) ${music.current}%, #e1e1e1 0%);`

    }

    return (
        <div className={`px-3 pt-3 pb-1  rounded-3xl ${dir === 'rtl' ? 'rounded-tr-sm bg-white' : 'rounded-tl-sm bg-yellow-200'}`}  >
            <div className=" flex items-center w-60 gap-2">
                {
                    msg.messageInfo.reply.isReplied && <RepliedMessage msg={msg} containerClassName={'px-2 py-1'} />
                }
                <div className={` control bg-[#fafafa] cursor-pointer w-12 h-12 rounded-full flex items-center justify-center transition duration-500 ${playing ? '' : 'rotate-90'} ease-in-out `} onClick={handelPlayPause}>
                    <Icon2 className={`w-14 h-14 text-blue-500 ${playing ? '' : 'rotate-[-90deg]'}`} />
                </div>
                <div className="info flex flex-col w-full">
                    <p className="font-semibold text-sm">{originalName}</p>
                    {
                        !playing
                            ? <input type="range" id="my-slider" min={0} max={10} onInput={handelRange} />

                            : <p className="author text-sm"> [unknown] </p>
                    }
                </div>
                <audio ref={music} src={`/${fileName[0]}/${fileName[1]}/${fileName[2]}`} onTimeUpdate={playHandler}></audio>
            </div>
            <p className={`date text-xs text-[#9a9a9a] mb-1 mt-2 whitespace-nowrap`}>{time}</p>
        </div>
    );
}

export default MusicMessage;