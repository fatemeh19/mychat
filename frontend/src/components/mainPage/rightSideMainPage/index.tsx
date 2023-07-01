"use client"

import { useEffect, useState, useRef } from "react"

import Chat from "./chat"
import ChatInfo from "./chatInfo"
import io from 'socket.io-client'
import { Socket } from "socket.io-client"
import callApi from "@/src/helper/callApi"
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks"
import { fetchChat } from "@/src/helper/useAxiosRequests"

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
    const token = localStorage.getItem('token')
    let bearerToken = `Bearer ${token}`

    // const [socket, setSocket] = useState(null);

    // let newSocket: any;
    // let socketOnChat: any;
    // let socketRef = useRef()
    // const { current: socket } = useRef(io('http://localhost:3000'))
    const [online, setOnline] = useState(false)
    const selector = useAppSelector(state => state.userInfo)
    const userInfo = selector.User

    // console.log('socket on chat component ', socket)


    // ************* SO IMPORTENT
    // this emit should be : but userId should get from getUserProfile and place in hear *CAS* we change the userId from saving in localStorage and got in login (((we don't get userId in login anymove))) *SOOOOOO* after take all user info from getUserProfile and save them in redux we can access to userId from redux.
    // socket.emit('onChat',userInfo._id, contactId)
    // ************* SO IMPORTENT

    // socket.on('onlineOnChat', (contactId: any) => {
    //     console.log('online on chat in client')
    //     // console.log(contactId)
    //     // setOnline(true)
    // });
    // socket.emit('online', userId)
    // }, 5000);

    const dispatch = useAppDispatch()

    const [chat, setChat] = useState()
    const [firstChat, setFirstChat] = useState<boolean>(true)
    useEffect(() => {
        // const fetchChat = async (userInfo: IUserInfo) => {
        //     const token = localStorage.getItem('token')
        //     const config = {
        //         headers: {
        //             Authorization: `Bearer ${token}`
        //         }
        //     };
        //     console.log('get chat')
        //     const res = await callApi().get(`/main/chat/${userInfo._id}/${contactId}`, config)
        //     console.log('res get chat ', res)
        //     if (res.statusText && res.statusText === 'OK') {
        //         console.log(res)
        //         setFirstChat(false)
        //         setChat(res.data.value)
        //     }
        // }
        // fetchChat(userInfo);

        fetchChat(userInfo._id, contactId, dispatch, setFirstChat)
    }, [])
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
