import { FC, useRef, useState } from "react";
import { recievedMessageInterface } from "@/src/models/interface";
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from 'react-icons/bs'

interface VideoMessageProps {
    dir: string,
    msg: recievedMessageInterface
}

const VideoMessage: FC<VideoMessageProps> = ({ dir, msg }) => {
    const isText = msg.content.text ? true : false
    const [playing, setPlay] = useState(false);

    const Icon2 = playing ? BsFillPauseCircleFill : BsFillPlayCircleFill

    const date = new Date(msg.createdAt);
    const time = date.getHours() + ":" + date.getMinutes()

    const fileFullUrl = msg.content.url.split('\\')
    const fileName = fileFullUrl.slice(fileFullUrl.length - 3, fileFullUrl.length)
    const originalName = msg.content.originalName?.split('.')[0]


    const videoRef = useRef()

    const handelPlayPause = () => {
        setPlay(!playing)
        // @ts-ignore
        playing ? videoRef.current.pause() : videoRef.current.play()
        // @ts-ignore
        setValue(videoRef.current.currentTime)
    }

    console.log('video message : ', msg)
    // return (
    //     <div className={` rounded-3xl ${dir === 'rtl' ? 'rounded-tr-sm bg-white' : 'rounded-tl-sm bg-yellow-200'}`}  >
    //         <div className=" flex flex-col items-center w-72 gap-2">
    //             <div className={` control absolute bg-[#fafafa] cursor-pointer w-12 h-12 rounded-full flex items-center justify-center transition duration-500 ${playing ? '' : 'rotate-90'} ease-in-out `} onClick={handelPlayPause}>
    //                 <Icon2 className={`w-14 h-14 text-blue-500 ${playing ? '' : 'rotate-[-90deg]'}`} />
    //             </div>
    //             {/* <div className="info flex flex-col w-full break-all"> */}
    //             {/* </div> */}
    //             <video ref={videoRef} src={`/${fileName[0]}/${fileName[1]}/${fileName[2]}`} ></video>
    //         </div>
    //         <p className={`date text-xs text-[#9a9a9a] mb-1 mt-2 whitespace-nowrap`}>{time}</p>
    //     </div>

    // );
    return (
        <>

            <div className="relative max-w-[28rem] rounded-xl">
                <div className={`w-fit rounded-xl dark:bg-bgColorDark2 dark:text-white ${dir === 'rtl' ? 'rounded-tr-sm bg-white' : 'rounded-tl-sm bg-yellow-200'}`}>
                    <div className="flex flex-col rounded-xl">
                        <video
                            ref={videoRef}
                            src={`/${fileName[0]}/${fileName[1]}/${fileName[2]}`}
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
                                            <p className="px-2 py-2 pb-1 break-all whitespace-pre-line text-sm">{msg.content.text}</p>
                                            <div className="w-20 h-2 relative">
                                                <span className="absolute right-0 bottom-[-1px] date text-xs text-[#9a9a9a] ml-1 mb-[.5px] whitespace-nowrap">{time} AM
                                                    <span className="pl-1 text-green-500"> \// </span>
                                                </span>
                                            </div>
                                        </>
                                        :
                                        <p className={`date text-xs text-[#9a9a9a] mb-[.5px] whitespace-nowrap px-2 pb-2 absolute bottom-[-5px] right-0`}>{time} AM
                                            <span className="pl-1 text-green-500"> \// </span>
                                        </p>
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