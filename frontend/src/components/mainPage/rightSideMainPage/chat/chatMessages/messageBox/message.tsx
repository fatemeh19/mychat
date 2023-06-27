"use client"

import { FC } from "react"
import { messageTypes } from "@/src/models/enum"
import style from './messageStyle.module.css'
import Image from "next/image"
import TextMessage from "./messages-type/textMessage"
import ImageMessage from "./messages-type/imgMessage"

interface messageProps {
    type: messageTypes
    isText?: boolean,
    dir : string
}

const Message: FC<messageProps> = ({ type, isText, dir }) => {

    switch (type) {
        case messageTypes.text:
            return (<TextMessage dir={dir}/>)
        case messageTypes.image:
            return (<ImageMessage isText={isText} />)

    }

    return (<></>)

}

export default Message