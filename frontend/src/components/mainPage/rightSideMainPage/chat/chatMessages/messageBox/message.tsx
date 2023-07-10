"use client"

import { FC } from "react"
import { messageTypes } from "@/src/models/enum"
import TextMessage from "./messages-type/textMessage"
import ImageMessage from "./messages-type/imgMessage"
import { recievedMessageInterface } from "@/src/models/interface"
import VoiceMessage from "./messages-type/voiceMessage"

interface messageProps {
    type: string
    dir: string,
    msg: recievedMessageInterface
}

const Message: FC<messageProps> = ({ type, dir, msg }) => {

    switch (type) {
        case messageTypes.text:
            return (<TextMessage dir={dir} msg={msg} />)
        case messageTypes.picture:
            return (<ImageMessage dir={dir} msg={msg} />)
        case messageTypes.music:
            return (<VoiceMessage dir={dir} msg={msg} />)
    }

    return (<></>)

}

export default Message