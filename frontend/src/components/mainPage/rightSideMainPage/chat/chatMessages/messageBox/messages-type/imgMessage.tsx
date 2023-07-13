import { recievedMessageInterface } from "@/src/models/interface"
import Image from "next/image"



const ImageMessage = ({ msg, dir }: { dir: string, msg: recievedMessageInterface }) => {
    const isText = msg.content.text ? true : false

    const fileFullUrl = msg.content.url.split('\\')
    const fileName = fileFullUrl.slice(fileFullUrl.length - 3, fileFullUrl.length)

    const date = new Date(msg.createdAt);
    const time = date.getHours() + ":" + date.getMinutes()

    return (
        <>

            <div className="relative max-w-[28rem] rounded-3xl">
                <div className={`w-fit rounded-3xl dark:bg-bgColorDark2 dark:text-white ${dir === 'rtl' ? 'rounded-tr-sm bg-white' : 'rounded-tl-sm bg-yellow-200'}`}>
                    <div className="flex flex-col rounded-3xl">
                        <Image
                            width={500}
                            height={0}
                            src={`/${fileName[0]}/${fileName[1]}/${fileName[2]}`}
                            alt=""
                            className={`
                                w-[32rem] 
                                ${isText
                                    ? `rounded-t-lg  
                                        ${dir === 'rtl'
                                        ? 'rounded-tr-sm rounded-tl-3xl bg-white'
                                        : 'rounded-tl-sm rounded-tr-3xl bg-yellow-200'
                                    }`
                                    : `rounded-3xl
                                        ${dir === 'rtl'
                                        ? 'rounded-tr-sm rounded-tl-3xl bg-white'
                                        : 'rounded-tl-sm rounded-tr-3xl bg-yellow-200'
                                    }`
                                }`
                            }
                        />
                        <div className="relative">

                            {isText ? <p className="px-2 py-1 pb-2 break-all">{msg.content.text}</p> : null}
                            <p className={`date text-xs text-[#9a9a9a] mb-[.5px] whitespace-nowrap px-2 pb-2 ${isText ? '' : 'absolute bottom-0'} `}>{time}</p>
                        </div>
                    </div>
                </div>
            </div>




        </>

    )
}

export default ImageMessage