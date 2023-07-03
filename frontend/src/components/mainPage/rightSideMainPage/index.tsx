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


    const [infoState, setInfoVState] = useState(false)
    const [online, setOnline] = useState(false)
    const userInfo = useAppSelector(state => state.userInfo).User
    const dispatch = useAppDispatch()
    const socket = useAppSelector(state => state.socket).Socket

    // ************* SO IMPORTENT
    // this emit should be : but userId should get from getUserProfile and place in hear *CAS* we change the userId from saving in localStorage and got in login (((we don't get userId in login anymove))) *SOOOOOO* after take all user info from getUserProfile and save them in redux we can access to userId from redux.
    // socket.emit('onChat', userInfo._id, contactId)
    // ************* SO IMPORTENT

    // socket.on('onlineOnChat', (contactId: any) => {
    //     console.log('online on chat in client')
    //     // console.log(contactId)
    //     // setOnline(true)
    // });
    // socket.emit('online', userId)
    // }, 5000);

    console.log('socket in right after refresh : ', socket)



    // const [chat, setChat] = useState()
    const [firstChat, setFirstChat] = useState<boolean>(false)
    useEffect(() => {
        console.log('bulding right side ...')
        fetchChat(userInfo._id, contactId, dispatch, setFirstChat)
        console.log('socket connected to onChat in useEffect in rightSide .')
        socket ? socket.emit('onChat', contactId) : null
    }, [])

    if (socket) {
        // console.log('sendMessage on in client')
        socket.on('sendMessage', (message) => {
            console.log('i got new Message: ', message)
            dispatch(addMessage(message))
        })
    }

    console.log('socket in slice in right : ', socket)

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
