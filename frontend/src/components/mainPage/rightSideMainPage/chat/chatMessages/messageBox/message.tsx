"use client"

import { FC } from "react"
import { messageTypes } from "@/src/models/enum"
import style from './messageStyle.module.css'
import Image from "next/image"
import TextMessage from "./messages-type/textMessage"
import ImageMessage from "./messages-type/imgMessage"
import { messageInterface } from "@/src/models/interface"

interface messageProps {
    type: string
    dir : string,
    msg : messageInterface
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