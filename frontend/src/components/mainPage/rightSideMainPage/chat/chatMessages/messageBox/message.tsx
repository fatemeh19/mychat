"use client"

import { FC } from "react"
import { messageTypes } from "@/src/models/enum"
import TextMessage from "./messages-type/textMessage"
import ImageMessage from "./messages-type/imgMessage"
import { sendMessageInterface } from "@/src/models/interface"

interface messageProps {
    type: string
    dir : string,
    msg : sendMessageInterface
}

const Message: FC<messageProps> = ({ type, dir, msg }) => {

    switch (type) {
        case messageTypes.text:
            return (<TextMessage dir={dir} msg={msg} />)
        case messageTypes.image:
            return (<ImageMessage msg={msg} />)

    }

    return (<></>)

}

export default Message