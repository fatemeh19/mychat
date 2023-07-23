"use client"

import { useEffect, useState, useRef } from "react"

import Chat from "./chat"
import ChatInfo from "./chatInfo"
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks"
import { fetchChat } from "@/src/helper/useAxiosRequests"
import { addMessage, setChatCreated } from "@/src/redux/features/chatSlice"
import { ChatType } from "@/src/models/enum"

interface IUserInfo {
    name: string,
    phoneNumber: string,
    profilePic: string,
    email: string,
    _id: string
}

export default function RightSideMainPage({ contactId }: { contactId: any }) {

    const [infoState, setInfoVState] = useState(false)
    // const [online, setOnline] = useState(false)
    const userInfo = useAppSelector(state => state.userInfo).User
    const dispatch = useAppDispatch()
    const socket = useAppSelector(state => state.socket).Socket
    const chatList = useAppSelector(state => state.userChatList).chatList
    let found = false

    useEffect(() => {
        console.log('in chatList useEffect')
        found = false
        chatList.map(cl => {
            if (cl.contact._id === contactId) {
                console.log('chat is exist')
                fetchChat(cl._id, dispatch)
                dispatch(setChatCreated(true))
                found = true
            }
        })
        found === false && dispatch(setChatCreated(false))
    }, [chatList])

    useEffect(() => {
        socket?.emit('onChat', contactId)
    }, [socket])

    useEffect(() => {
        socket?.on('sendMessage', (message) => {
            console.log('i got new Message: ', message)
            dispatch(addMessage(message))
        })
        return () => {
            socket.removeAllListeners('sendMessage')
        }
    }, [])

    return (
        <>
            {
                infoState
                    ? (
                        <div className="flex gap-[1px] justify-end">
                            <div className="w-full ">
                                <Chat infoState={infoState} setInfoVState={setInfoVState} contactId={contactId}  />
                            </div>
                            <div className="min-w-fit">
                                <ChatInfo />
                            </div>
                        </div>
                    )
                    : (
                        <div className="">
                            <Chat infoState={infoState} setInfoVState={setInfoVState} contactId={contactId}  />
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
