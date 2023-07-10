import { recievedMessageInterface } from "@/src/models/interface";
import { FC, useState, createRef, useEffect } from "react";
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from 'react-icons/bs'

interface MusicMessageProps {
    dir: string,
    msg: recievedMessageInterface
}

const MusicMessage: FC<MusicMessageProps> = ({ dir, msg }) => {
    
    const [playing, setPlay] = useState(false);
    const Icon2 = playing ? BsFillPauseCircleFill : BsFillPlayCircleFill
    
    const date = new Date(msg.createdAt);
    const time = date.getHours() + ":" + date.getMinutes()
    
    const fileFullUrl = msg.content.url.split('\\')
    const fileName = fileFullUrl.slice(fileFullUrl.length - 3, fileFullUrl.length)
    
    
    // console.log('msg : ', msg)
    const originalName = msg.content.originalName?.split('.')[0]
    
    let music = createRef<HTMLAudioElement>();
    useEffect(() => {
        music = createRef<HTMLAudioElement>()
    },[])
    
    const handelPlayPause = () => {
        setPlay(!playing)
        console.log(playing)
        playing ? music.current?.pause() : music.current?.play()
        
    }

    return (
        <div className={`px-3 pt-3 pb-1  rounded-3xl ${dir === 'rtl' ? 'rounded-tr-sm bg-white' : 'rounded-tl-sm bg-yellow-200'}`}  >
            <div className=" flex items-center w-56 gap-2">
                <div className={` control bg-[#fafafa] cursor-pointer w-12 h-12 rounded-full flex items-center justify-center transition duration-500 ${playing ? '' : 'rotate-90'} ease-in-out `} onClick={handelPlayPause}>
                    <Icon2 className={`w-14 h-14 text-blue-500 ${playing ? '' : 'rotate-[-90deg]'}`} />
                </div>
                <div className="info">
                    <p className="font-semibold text-sm">{originalName}</p>
                    <p className="author text-sm"> [unknown] </p>
                </div>
                <audio ref={music} src={`/${fileName[0]}/${fileName[1]}/${fileName[2]}`}></audio>
            </div>
            <p className={`date text-xs text-[#9a9a9a] mb-1 mt-2 whitespace-nowrap`}>{time}</p>
        </div>
    );
}

export default MusicMessage;