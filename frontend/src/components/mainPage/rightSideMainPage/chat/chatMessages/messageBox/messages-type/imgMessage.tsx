import { recievedMessageInterface } from "@/src/models/interface"
import Image from "next/image"



const ImageMessage = ({ msg }: { msg: recievedMessageInterface }) => {
    const isText = msg.content.text ? true : false

    const fileFullUrl = msg.content.url.split('\\')
    const fileName = fileFullUrl.slice(fileFullUrl.length - 3, fileFullUrl.length)

    const date = new Date(msg.createdAt);
    const time = date.getHours() + ":" + date.getMinutes()

    return (
        <>

            <div className="relative max-w-[32rem]">

                <div className={"w-fit bg-gray-200 rounded-lg rounded-tl-sm dark:bg-bgColorDark2 dark:text-white"}>
                    <div className="flex flex-col">
                        <Image
                            width={1000}
                            height={0}
                            src={`/${fileName[0]}/${fileName[1]}/${fileName[2]}`}
                            alt=""
                            className={`w-[32rem] ${isText ? 'rounded-t-lg' : 'rounded-lg'}`}
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