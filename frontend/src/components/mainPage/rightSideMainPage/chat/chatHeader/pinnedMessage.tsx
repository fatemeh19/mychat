import findIndex from "@/src/helper/findIndex";
import { recievedMessageInterface } from "@/src/models/interface";
import { setOpenPinSection } from "@/src/redux/features/openSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { FC, useEffect, useState } from "react";

import { PiPushPinSimpleLight } from 'react-icons/pi'


interface PinnedMessageProps {

}

const PinnedMessage: FC<PinnedMessageProps> = () => {
    const [msg, setMsg] = useState<recievedMessageInterface>()

    const dispatch = useAppDispatch()

    const pinnedMessages = useAppSelector(state => state.chat.Chat).pinnedMessages
    const chatMessages = useAppSelector(state => state.chat.Chat).messages
    useEffect(() => {
        // پیدا کردن جدید ترین پیام ارسال شده از بین پیام های پین شده
        let id = pinnedMessages[0]
        for (let i = 0; i < pinnedMessages.length; i++) {
            if (id < pinnedMessages[i]) {
                id = pinnedMessages[i]
            }
        }

        console.log('id : ', id)
        // پیدا کردن ایندکس این پیام در پیام های چت
        const chatMessageIds = chatMessages.map(cm => cm._id)
        const index = findIndex(0, chatMessages.length, chatMessageIds, id)

        setMsg(chatMessages[index])
        console.log('msg:', msg)

    }, [pinnedMessages])


    return (
        <div className="flex justify-between items-center p-2 bg-gray-50 px-6">
            <div className="left flex gap-3">
                <div className="w-1 rounded-full bg-blue-500"></div>
                <div>
                    <h1 className="text-blue-500 font-bold">pinned messages</h1>
                    <p>{msg?.messageInfo.content.text}</p>
                </div>
            </div>
            <div className="right text-gray-600 cursor-pointer ml-3" onClick={() => dispatch(setOpenPinSection(true))}>
                <PiPushPinSimpleLight className="w-5 h-5" />
            </div>
        </div>


    );
}

export default PinnedMessage;