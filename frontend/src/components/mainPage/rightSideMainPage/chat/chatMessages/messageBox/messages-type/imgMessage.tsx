import { recievedMessageInterface } from "@/src/models/interface"
import Image from "next/image"
import { useState } from 'react'



const ImageMessage = ({ msg, dir }: { dir: string, msg: recievedMessageInterface }) => {
    const isText = msg.content.text ? true : false

    const [open, setOpen] = useState(false)

    const fileFullUrl = msg.content.url.split('\\')
    const fileName = fileFullUrl.slice(fileFullUrl.length - 3, fileFullUrl.length)

    const date = new Date(msg.createdAt);
    const time = date.getHours() + ":" + date.getMinutes()

    const openImage = () => {
        setOpen(!open)
    }

    return (
        <>

            <div className="relative max-w-[22rem] rounded-xl">
                <div className={`w-fit rounded-xl dark:bg-bgColorDark2 dark:text-white ${dir === 'rtl' ? 'rounded-tr-sm bg-white' : 'rounded-tl-sm bg-yellow-200'}`}>
                    <div className="flex flex-col rounded-xl">
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

export default ImageMessage