"use client"

import { useEffect, useState, useRef } from "react"

import Chat from "./chat"
import ChatInfo from "./chatInfo"
import io from 'socket.io-client'
import { Socket } from "socket.io-client"
import UseLocalStorage from "@/src/helper/useLocalStorate"
import callApi from "@/src/helper/callApi"
import { useAppSelector } from "@/src/redux/hooks"

export default function RightSideMainPage({ contactId }: { contactId: any }) {

    const [infoState, setInfoVState] = useState(true)
    // const [socket, setSocket] = useState(null);
    // const { userId } = UseLocalStorage()

    // let newSocket: any;
    // let socketOnChat: any;
    // let socketRef = useRef()
    const { current: socket } = useRef(io('http://localhost:3000/onChat'))
    const [online , setOnline] = useState(false)

    // @ts-ignore
    // useEffect(
    //     () => {
    //         if(socket) {
    //             socket.close()
    //             console.log('closed!')
    //         }
    //     }, [socket])
    // useEffect(() => {
    //     newSocket = io('http://localhost:3000');
    //     socketOnChat = io('http://localhost:3000/onChat')

    // }, [])
    // setTimeout(() => {
        console.log('socket on chat ', socket)
        // console.log('userId : ', userId)
        console.log('contactId : ', contactId)

        // ************* SO IMPORTENT
        // this emit should be : but userId should get from getUserProfile and place in hear *CAS* we change the userId from saving in localStorage and got in login (((we don't get userId in login anymove))) *SOOOOOO* after take all user info from getUserProfile and save them in redux we can access to userId from redux.
        // socket.emit('onChat', userId, contactId)
        // ************* SO IMPORTENT

        socket.on('onlineOnChat', (contactId: any) => {
            console.log('online on chat in client')
            console.log(contactId)
            setOnline(true)
        });
        // socket.emit('online', userId)
    // }, 5000);

    const selector = useAppSelector(state => state.userInfo)
    const userInfo = selector.User
    const [chat,setChat]=useState()
    useEffect(()=>{
        const fetchChat = async (userInfo) => {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            console.log('get chat')
            const res = await callApi().get(`/main/chat/${userInfo._id}/${contactId}`, config)
            if (res.statusText && res.statusText === 'OK') {
                console.log(res)
                setChat(res.data.value)
            }
        }
        fetchChat(userInfo);
    },[])
    return (
        <>
            {
                infoState
                    ? (
                        <div className="flex gap-[1px]">
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
