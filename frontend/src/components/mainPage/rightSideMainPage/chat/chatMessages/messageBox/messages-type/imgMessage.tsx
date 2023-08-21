import { recievedMessageInterface } from "@/src/models/interface"
import Image from "next/image"
import { useEffect, useState } from 'react'
import RepliedMessage from "./repliedMessage"
import { PiPushPinFill } from "react-icons/pi"



const ImageMessage = ({ msg, dir }: { dir: string, msg: recievedMessageInterface }) => {
    const isText = msg.messageInfo.content.text ? true : false
    const isReplied = msg.messageInfo.reply.isReplied

    const [open, setOpen] = useState(false)

    const fileFullUrl = msg.messageInfo.content.url.split('\\')
    const fileName = fileFullUrl.slice(fileFullUrl.length - 3, fileFullUrl.length)

    const date = new Date(msg.messageInfo.createdAt);
    const time = date.getHours() + ":" + date.getMinutes()

    const openImage = () => {
        setOpen(!open)
    }

    // let isReplied = false
    // useEffect(() => {
    //     isReplied = msg.reply.isReplied
    // }, [msg])

    return (
        <>

            <div className="relative max-w-[22rem] rounded-xl">
                <div className={`flex flex-col rounded-xl py-1 px-2 dark:bg-bgColorDark2 dark:text-white ${dir === 'rtl' ? 'rounded-tr-sm bg-white' : 'rounded-tl-sm bg-yellow-200'}`}>
                    {
                        isReplied && <RepliedMessage msg={msg} />
                    }
                    <div className="flex flex-col rounded-xl pt-1">
                        <Image
                            width={500}
                            height={0}
                            src={`/${fileName[0]}/${fileName[1]}/${fileName[2]}`}
                            alt=""
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
                                ${open
                                    ? `w-[${outerHeight}px]`
                                    : ''
                                }
                                ${isReplied
                                    ? '!rounded-t-sm'
                                    : ''
                                }
                                cursor-pointer
                                `
                            }
                            onClick={openImage}
                        />
                        <div className="relative flex flex-col gap-1 items-end">
                            <div className={`relative pr-[8px] flex items-end justify-between w-fit rounded-xl`}> {/* w-full for english : ltr ----- w-fit for farsi : rtl*/}
                                {
                                    isText
                                        ?
                                        <>
                                            <p className="px-2 py-2 pb-1 break-all whitespace-pre-line text-sm">{msg.messageInfo.content.text}</p>
                                            <div className="w-20 h-2 relative">
                                                <div className={`date absolute right-0 bottom-[-5px] text-xs text-[#9a9a9a] ml-1 mb-[.5px] whitespace-nowrap flex`}>
                                                    {
                                                        msg.pinStat.pinned ? <PiPushPinFill className='mx-1' /> : null
                                                    }
                                                    <span>{time} AM</span>
                                                    <span className="pl-1 text-green-500"> \// </span>
                                                </div>
                                            </div>
                                        </>
                                        :
                                        <div className={`date absolute right-1 bottom-1 bg-[#000000ab] rounded-full py-[7px] px-[10px] text-xs text-white ml-1 mb-[.5px] whitespace-nowrap flex`}>
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

export default ImageMessage