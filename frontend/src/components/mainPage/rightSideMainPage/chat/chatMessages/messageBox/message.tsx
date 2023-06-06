"use client"

import { FC } from "react"
import { messageTypes } from "@/src/interfaces/enum"
import style from './messageStyle.module.css'
import Image from "next/image"
import TextMessage from "./messages-type/textMessage"
import ImageMessage from "./messages-type/imgMessage"

interface messageProps {
    type: messageTypes
    isText?: boolean 
}

const Message: FC<messageProps> = ({ type, isText }) => {

    console.log(type)

    switch (type) {
        case messageTypes.text:
            return (<TextMessage />)
        case messageTypes.image:
            return (<ImageMessage isText={isText} />)

    }

    return(<></>)

}

export default Message