import { FC } from "react";

import { PiPushPinSimpleLight } from 'react-icons/pi'


interface PinnedMessagesProps {

}

const PinnedMessages: FC<PinnedMessagesProps> = () => {
    return (
        <div>
            <div className="right">
                <PiPushPinSimpleLight />
            </div>
            <div className="left">
                pinned message
            </div>
        </div>


    );
}

export default PinnedMessages;