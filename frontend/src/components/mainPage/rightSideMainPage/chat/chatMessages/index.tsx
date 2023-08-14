"use client"

import { useEffect, useState } from 'react'
import MessageBox from "./messageBox"
import { useAppSelector } from "@/src/redux/hooks"

export default function ChatMessages() {

    const [backgroundImage, setBackgroundImage] = useState<string>()


    useEffect(() => {
        setBackgroundImage('/defaults/defaultBackgroundImage.jpg')
    }, [])

    const chatInfo = useAppSelector(state => state.chat)
    const userId = useAppSelector(state => state.userInfo).User._id
    const chat = chatInfo.Chat

    return (
        <div className={`backgroundImageStyle w-full h-full overflow-hidden flex justify-end flex-col bg-[url('${backgroundImage ? backgroundImage : '/defaults/defaultBackgroundImage.jpg'}')]`}>
            {(chat.messages?.length == 0 || !chatInfo.chatCreated)
                ? <div className="w-full h-full flex justify-center items-center">
                    <p className="p-2 h-fit bg-gray-100 font-semibold text-gray-700">No Message</p>
                </div>
                : <div className="mx-1 pr-2 overflow-auto overflow-x-hidden chat-scrollbar mt-1">
                    {/* <DateLine date={'Today'}/> */}
                    <div className="flex flex-col ">
                        {
                            // if flag == true => show messages / flag = false => dont show deleted messages
                            // we are checking if userId is in the message deletedIds then => dont show this message to this user
                            chat.messages?.map((msg, index) => {
                                // console.log('msg:', msg)
                                let flag = true
                                msg.deletedIds.map(delId => {
                                    if (delId === userId) flag = false
                                })
                                if (flag) return <MessageBox key={index} msg={msg} />
                            })
                        }
                    </div>
                </div>
            }
        </div>
    )
}
