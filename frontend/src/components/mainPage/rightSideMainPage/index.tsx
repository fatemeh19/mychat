"use client"

import { useEffect, useState, useRef } from "react"

import Chat from "./chat"
import ChatInfo from "./chatInfo"
import io from 'socket.io-client'
import { Socket } from "socket.io-client"
import callApi from "@/src/helper/callApi"
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks"
import { fetchChat } from "@/src/helper/useAxiosRequests"
import { addMessage } from "@/src/redux/features/messagesSlice"

interface IUserInfo {
    name: string,
    phoneNumber: string,
    profilePic: string,
    email: string,
    _id: string
}

export default function RightSideMainPage({ contactId }: { contactId: any }) {
    console.log('window : ', window)
    console.log('righside rerefreshed')


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

    // console.log('socket in right after refresh : ', socket)

    const [firstChat, setFirstChat] = useState<boolean>(false)
    useEffect(() => {
        // console.log('bulding right side ...')
        fetchChat(userInfo._id, contactId, dispatch, setFirstChat)
        // console.log('socket connected to onChat in useEffect in rightSide .')
        // console.log('socket : :', socket)
        // socket ? socket.emit('onChat', contactId) : null
    }, [])

    useEffect(() => {
        console.log('socket changed => call onChat emit')
        console.log(socket)
        socket?.emit('onChat', contactId)

        socket?.on('sendMessage', (message) => {
            console.log(socket)
            console.log('i got new Message: ', message)
            dispatch(addMessage(message))
        })
    }, [socket])

    // if (window.performance) {
    //     if (performance.navigation.type == 1) {
    //         socket ? socket.disconnect() : null
    //     //   alert( "This page is reloaded" );
    //     } else {
    //     //   alert( "This page is not reloaded");
    //     }
    //   }





    // console.log('socket in slice in right : ', socket)

    return (
        <>
            {
                infoState
                    ? (
                        <div className="flex gap-[1px] justify-end">
                            <div className="w-full ">
                                <Chat infoState={infoState} setInfoVState={setInfoVState} contactId={contactId} online={online} firstChat={firstChat} setFirstChat={setFirstChat} />
                            </div>
                            <div className="min-w-fit">
                                <ChatInfo />
                            </div>
                        </div>
                    )
                    : (
                        <div className="">
                            <Chat infoState={infoState} setInfoVState={setInfoVState} contactId={contactId} online={online} firstChat={firstChat} setFirstChat={setFirstChat} />
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
