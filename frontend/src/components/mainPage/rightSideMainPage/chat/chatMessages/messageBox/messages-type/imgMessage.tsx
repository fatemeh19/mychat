import { sendMessageInterface } from "@/src/models/interface"
import Image from "next/image"



const ImageMessage = ({ msg }: { msg:sendMessageInterface }) => {
    const isText = msg.content.text ? true : false
    
    return (
        <>

            <div className="relative max-w-[32rem]">

                <div className={"w-fit bg-gray-200 rounded-lg rounded-tl-sm dark:bg-bgColorDark2 dark:text-white"}>
                    <div className="flex flex-col ">
                        <Image
                            width={300}
                            height={0}
                            src={'/images/messageImage.jpg'}
                            alt=""
                            className={`w-[32rem] ${isText ? 'rounded-t-lg' : 'rounded-lg'}`}
                        />
                        {isText ? <p className="px-2 py-1 pb-2 break-all">{msg.content.text}</p> : null}

                    </div>
                </div>
            </div>




        </>

    )
}

export default ImageMessage