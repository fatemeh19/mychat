"use client"

import { useAppSelector } from "@/src/redux/hooks"
import MessageBox from "./messageBox"

export default function ChatMessages() {

    const chat = useAppSelector(state => state.chat).Chat
    return (
        <div className="w-full h-full overflow-hidden flex justify-end flex-col bg-blue-200">

            {(chat.messages?.length == 0)
                ? <div className="w-full h-full flex justify-center items-center">
                    <p className="p-2 h-fit bg-gray-100 font-semibold text-gray-700">No Message</p>
                </div>
                : <div className="mx-1 pr-2 overflow-auto overflow-x-hidden chat-scrollbar mt-1">
                    {/* <DateLine date={'Today'}/> */}
                    <div className="flex flex-col ">
                        <>
                            {
                                chat.messages?.map((msg, index) => {
                                    return <MessageBox key={index} msg={msg} />
                                })
                            }
                        </>
                    </div>
                </div>
            }
        </div>
    )
}
