"use client"

import { RiSendPlaneFill } from 'react-icons/ri'
import { ImAttachment } from 'react-icons/im'
import { FiMic } from 'react-icons/fi'
import ChatInput from './chatInput'
import { useAppSelector } from '@/src/redux/hooks'


export default function ChatSendBox() {

    const userId = useAppSelector(state => state.userInfo.User)._id
    const contactId = useAppSelector(state => state.userContact.User)._id
    console.log('contactId in chatSendBox : ', contactId)

    return (
        <div className="bg-white w-full bottom-0 p-5 px-6 dark:bg-bgColorDark2">
            <div className="w-full bg-[#f5f5f5] flex rounded-md p-3 items-end dark:bg-bgColorDark3">
                {/* <input type="text" className='bg-transparent w-full outline-none' placeholder='Text Message' /> */}
                <ChatInput userId={userId} contactId={contactId} />
                <div className="icons flex text-md gap-2 mx-3  text-gray-500">
                    <ImAttachment className='cursor-pointer m-1'/>
                    <FiMic className='cursor-pointer m-1' />
                </div>
                <div className="sendIcons border-l-2 border-gray-400 pl-3 text-xl">
                    <RiSendPlaneFill className='cursor-pointer dark:text-[#2563eb] m-1' />
                </div>
            </div>
        </div>
    )
}
