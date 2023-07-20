"use client"

import { setChatOpenInList } from "@/src/redux/features/chatOpenInListSlice";
import { setOpenChat } from "@/src/redux/features/openChatSlice";
import { openHandle } from "@/src/redux/features/userChatListSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import Image from "next/image"
import { FC, useEffect, useRef, useState } from "react"
import { BiCheckDouble } from "react-icons/bi";
import { useDispatch } from "react-redux";
import io from 'socket.io-client'
// import { Socket } from "socket.io-client"

interface chatContactProps {
    status?: Boolean,
    lastMessage: string,
    ContactSeen: Boolean,
    lastMessageTime: string,
    numberOfUnSeen: string,
    recivedMessage:Boolean,
    lastMessegeByContact:Boolean,
    isTyping:Boolean,
    ContactName:string,
    chatOpennedP?:Boolean,
    profilePicName:string,
    contactId?:string
}

const ChatContactBox: FC<chatContactProps> = ({
    status,
    lastMessage,
    ContactSeen,
    lastMessageTime,
    numberOfUnSeen,
    recivedMessage,
    lastMessegeByContact,
    isTyping,
    ContactName,
    chatOpennedP,
    profilePicName,
    contactId
}) => {
    const dispatch = useAppDispatch()
    
    
    const [online , setOnline] = useState(false)
    const [chatOpenned,setChatOpenned]=useState(false)
    const socket = useAppSelector(state => state.socket).Socket
    const chatList = useAppSelector(state => state.userChatList).chatList

    const [lastMesText,setLastMesText]=useState(lastMessage)
    const [lastMesTime,setLastMesTime]=useState(lastMessageTime)
    useEffect(() => {
        socket?.on('sendMessage', (message) => {
            console.log('chatOpennedP : ',chatOpennedP)
            if(chatOpennedP || chatOpenned){
                console.log('i got new Message in chat box: ', message)
                if(message.content.contentType!='text' && message.content.text==''){
                    setLastMesText(message.content.originalName)
                }
                else{
                    setLastMesText(message.content.text)
                }
                setLastMesTime(message.updatedAt)
                console.log(lastMesText)
            }
            
        })
    }, [socket,chatOpennedP])
    useEffect(() => {
        socket?.on('onlineContact', (CId) => {
            console.log('contactId : ' + contactId)
            if(contactId==CId){
                console.log('online contact : ' + CId)
                setOnline(!online)
            }
            
        });
        socket?.on('offlineContact', (CId) => {
            console.log('contactId : ' + contactId)
            if(contactId==CId){
                console.log('offline contact : ' + CId)
                setOnline(!online)
            }
            
        });
    }, [socket,contactId])
    const handler=()=>{
        
        for(let i=0;i<chatList.length;i++){
            if(chatList[i].open){
                dispatch(openHandle(i))
            }
            if(chatList[i].contact._id==contactId){
                dispatch(openHandle(i))
                setChatOpenned(true)
                dispatch(setChatOpenInList(true))
                break
            }
            else if(chatList.length-1==i ){
                dispatch(setChatOpenInList(false))

            }
        }
    }
    
    return (
        
        <div 
        onClick={handler}
        className={`container cursor-pointer w-full flex p-5 gap-5 container-chatbox hover:bg-gray-50 
        lg:gap-5  lg:p-5 lg:justify-normal 
        tablet:px-2 tablet:py-3 tablet:gap-0 tablet:justify-center 
        ${chatOpenned ? "bg-gray-50 dark:bg-[rgb(53,55,59)]": 
        (chatOpennedP ? "bg-gray-50 dark:bg-[rgb(53,55,59)]": '') }`}>
                <div className='relative contactProfile h-full'>
                    {(status || online) ? 
                    <div className="rounded-full w-[15px] h-[15px] pt-[3px] flex justify-center bg-white absolute bottom-0 right-0 
                    dark:bg-[rgb(36,36,36)]
                    tablet:top-0">
                        <div className="rounded-full w-[10px] h-[10px]  bg-green-500"></div>
                    </div>
                    : null}
                    {lastMessegeByContact ?
                        (recivedMessage ? null :
                        (<span className='hidden right-0 bottom-0 text-center text-xs 
                        font-bold absolute rounded-full px-[7px] py-[2px]  bg-mainColor text-white
                        tablet:block'>
                            {numberOfUnSeen}</span>)
                        )
                        :null
                        
                    }
                    <Image
                    src={profilePicName}
                    className="
                    
                    h-[50px] w-[50px] min-h-[50px] min-w-[50px]
                    object-cover rounded-full  " width={500} height={0} alt="contact-profile" />
                </div>
                <div className='contactMessageDetail w-full 
                    lg:grid 
                    tablet:hidden
                    grid
                    '>
                    <div className="relative   w-full">
                        <span className='text-md font-bold contact-name w-3/5 inline-block truncate dark:text-white '>{ContactName}</span>
                        <div className="right-0 font-semibold text-sm top-[3px] absolute messageTimeSent text-gray-400">
                            <span className="last-mes-time">{lastMesTime!='' ? new Date(lastMesTime).getHours()+ " : "  +new Date(lastMesTime).getMinutes() : lastMesTime}</span>
                            
                        </div>
                    </div>
                    <div className="relative mess-detail2 w-full">
                        {isTyping ?
                        <span className='text-sm text-green-500'>Typing...</span>
                        : <span className={"text-sm truncate last-mes w-5/6 inline-block "
                        +(recivedMessage ? "text-gray-400" : (ContactSeen ? 
                            (chatOpennedP ? "dark:text-white" : "text-gray-400") : "dark:text-white"))}>
                            {lastMesText}</span>
                        }
                        {lastMessegeByContact ?
                        (recivedMessage ? null :
                        (<span className=' right-0 top-[3px] text-center text-xs font-bold absolute rounded-full px-[7px] py-[2px]  bg-mainColor text-white'>{numberOfUnSeen}</span>)
                        )
                        :( ContactSeen ?
                            <BiCheckDouble className="check-mes-seen text-green-500 top-[3px] text-[25px] right-0 absolute" />
                            : null
                            )
                        }
                        
                        
                    </div>
                </div>
            </div>
            
    )
}

export default ChatContactBox