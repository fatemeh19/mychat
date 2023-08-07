import { FC, useEffect, useState } from 'react'
import { setOpenPinSection } from '@/src/redux/features/openSlice';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { BsArrowLeft } from 'react-icons/bs'
import quickSort from '@/src/helper/quicSort';
import PinHeader from './pinHeader';
import PinnedMessages from './pinnedMessages';
import findIndex from '@/src/helper/findIndex';
import ChatMessages from '../chatMessages';
import { recievedMessageInterface } from '@/src/models/interface';

interface PinSectionProps {

}

const PinnedSection: FC<PinSectionProps> = () => {

    const [pinnedMessagesInfo, setPinnedMessagesInfo] = useState<recievedMessageInterface[]>([])
    const dispatch = useAppDispatch()
    const pinnedMessages = useAppSelector(state => state.chat.Chat).pinnedMessages
    const ChatMessages = useAppSelector(state => state.chat.Chat).messages

    const socket = useAppSelector(state => state.socket).Socket
    const chatId = useAppSelector(state => state.chat).Chat._id

    // let sortArray = quickSort(pinnedMessages)
    // console.log('sortArray:', sortArray)

    useEffect(() => {
        const chatMessageIds = ChatMessages.map(cm => cm._id)
        for (let i = 0; i < pinnedMessages.length; i++) {
            let index = findIndex(0, chatMessageIds.length, chatMessageIds, pinnedMessages[i])
            console.log(i, ':', index)
            setPinnedMessagesInfo(prev => [...prev, ChatMessages[index]])
        }
    }, [PinnedMessages])

    const unPinAllMessageHandler = () => {
        pinnedMessagesInfo.map(pm => {
            let pinState = false
            console.log('msg.pinStat.pinned:', pm)
            pm.pinStat.pinned ? pinState = false : pinState = true

            const pinnedInfo = {
                chatId,
                messageId: pm._id,
                pin: pinState
            }
            socket.emit('pinUnpinMessage', pinnedInfo)
            dispatch(setOpenPinSection(false))
        })

    }

    return (
        <div className='flex flex-col w-full h-screen'>
            <PinHeader />
            <PinnedMessages pinnedMessagesInfo={pinnedMessagesInfo} />
            <button className='uppercase text-blue-500 w-full p-6 bg-white font-semibold' onClick={unPinAllMessageHandler}>unPin all messages</button>
        </div>
    );
}

export default PinnedSection;
