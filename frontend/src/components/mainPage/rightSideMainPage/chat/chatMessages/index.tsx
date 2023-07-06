"use client"

import { useAppSelector } from "@/src/redux/hooks"
import DateLine from "./dateLine"
import MessageBox from "./messageBox"
import { useEffect } from 'react'
import { recievedMessageInterface } from "@/src/models/interface"

export default function ChatMessages() {

    // const messages = useAppSelector(state => state.chat).Chat.messages

    const chat = useAppSelector(state => state.chat).Chat
    console.log('chat messages after fetchChat : ', chat.messages)

    return (
        <div className="w-full h-full overflow-hidden flex justify-end flex-col">

            {(chat.messages?.length == 0)
                ? <div className="w-full h-full flex justify-center items-center">
                    <p className="p-2 h-fit bg-gray-100 font-semibold text-gray-700">No Message</p>
                </div>
                : <div className="mr-1 pr-2 overflow-auto overflow-x-hidden chat-scrollbar mt-1">
                    {/* <DateLine date={'Today'}/> */}
                    <div className="flex flex-col ">
                        <>
                            {
                                chat.messages?.map((msg, index) => {
                                    return <MessageBox key={index} msg={msg} />
                                })
                            }
                        </>

                        {/* if me set dir to rlt  */}
                        {/* if others set dir to ltr  */}
                        {/* <MessageBox dir={MessageBoxProps.rtl} /> */}
                        {/* <MessageBox dir={MessageBoxProps.ltr} />  */}

                    </div>
                </div>
            }
        </div>
    )
}
