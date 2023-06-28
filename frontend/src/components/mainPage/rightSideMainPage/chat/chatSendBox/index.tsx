"use client"

import { RiSendPlaneFill } from 'react-icons/ri'
import { ImAttachment } from 'react-icons/im'
import { FiMic } from 'react-icons/fi'
import { useAppSelector } from '@/src/redux/hooks'
import { FC } from 'react'
import callApi from '@/src/helper/callApi'

interface chatSendProps {
    firstChat:boolean,
    contactId:string
}
const ChatSendBox: FC<chatSendProps> = ({firstChat,contactId}) => {
    const selector = useAppSelector(state => state.userInfo)
    const userInfo = selector.User
    const sendHandler=async ()=>{
        if(firstChat){
            const memberIds={
                "memberIds": [userInfo._id,contactId]
            }
            const token = localStorage.getItem('token')
            const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
            };
            const res = await callApi().post(`/main/chat/`,memberIds, config)
            if (res.statusText && res.statusText === 'OK') {
                console.log(res)
                
            }

        }
    }
    return (
        <div className="bg-white w-full bottom-0 p-5 px-6 dark:bg-bgColorDark2">
            <div className="w-full col-span-1 bg-[#f5f5f5] flex rounded-md p-3 items-center dark:bg-bgColorDark3">
                <input  type="text" className='bg-transparent w-full outline-none' placeholder='Text Message' />
                <div className="icons flex text-md gap-2 mr-3 text-gray-500">
                    <ImAttachment className='cursor-pointer' />
                    <FiMic className='cursor-pointer' />

                </div>
                <div className="sendIcons border-l-2 border-gray-400 pl-3 text-xl">
                    <RiSendPlaneFill onClick={sendHandler} className='cursor-pointer dark:text-[#2563eb]' />
                </div>
            </div>
        </div>
    )
}
export default ChatSendBox;