"use client"

import { useEffect, useState, useRef } from "react"

import Chat from "./chat"
import ChatInfo from "./chatInfo"
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks"
import { fetchChat } from "@/src/helper/useAxiosRequests"
import { addMessage } from "@/src/redux/features/chatSlice"

interface IUserInfo {
    name: string,
    phoneNumber: string,
    profilePic: string,
    email: string,
    _id: string
}

export default function RightSideMainPage({ contactId }: { contactId: any }) {

    const [infoState, setInfoVState] = useState(false)
    const [online, setOnline] = useState(false)
    const userInfo = useAppSelector(state => state.userInfo).User
    const dispatch = useAppDispatch()
    const socket = useAppSelector(state => state.socket).Socket

    // socket.on('onlineOnChat', (contactId: any) => {
    //     console.log('online on chat in client')
    //     // console.log(contactId)
    //     // setOnline(true)
    // });
    // socket.emit('online', userId)
    // }, 5000);

    useEffect(() => {
        fetchChat(userInfo._id, contactId, dispatch)
    }, [])

    useEffect(() => {
        socket?.emit('onChat', contactId)

        socket?.on('sendMessage', (message) => {
            console.log('i got new Message: ', message)
            dispatch(addMessage(message))
        })
    }, [socket])

    return (
        <>
            {
                infoState
                    ? (
                        <div className="flex gap-[1px] justify-end">
                            <div className="w-full ">
                                <Chat infoState={infoState} setInfoVState={setInfoVState} contactId={contactId} online={online} />
                            </div>
                            <div className="min-w-fit">
                                <ChatInfo />
                            </div>
                        </div>
                    )
                    : (
                        <div className="">
                            <Chat infoState={infoState} setInfoVState={setInfoVState} contactId={contactId} online={online} />
                        </div>
                    )
            }


        </>
    )

    // <div className="grid grid-cols-[repeat(14,_minmax(0,_1fr))] gap-[2px] ">
    //         <div className="col-span-10  ">
    //             <Chat setOpen={setOpen} />
    //         </div>
    //         <div className="col-span-4 bg-purple-400 ">
    //             <ChatInfo />
    //         </div>
    //     </div>


}
