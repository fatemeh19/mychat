import { recievedMessageInterface } from '@/src/models/interface';
import { FC } from 'react'
import MessageBox from '../chatMessages/messageBox';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { setOpenPinSection } from '@/src/redux/features/openSlice';


interface PinnedMessagesProps {
    pinnedMessagesInfo: recievedMessageInterface[]
}

const PinnedMessages: FC<PinnedMessagesProps> = ({ pinnedMessagesInfo }) => {


    return (
        <div className='w-full h-full overflow-hidden flex justify-end flex-col bg-blue-200'>
            <div className="mx-1 pr-2 overflow-auto overflow-x-hidden chat-scrollbar mt-1">

                <div className="flex flex-col ">
                    {
                        pinnedMessagesInfo.map((pm, index) => (
                            <MessageBox key={index} msg={pm} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default PinnedMessages;