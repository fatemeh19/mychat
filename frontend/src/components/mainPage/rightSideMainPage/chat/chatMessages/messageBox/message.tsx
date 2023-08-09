"use client"

import { FC, RefObject, useEffect, useState } from "react"
import { messageTypes } from "@/src/models/enum"
import TextMessage from "./messages-type/textMessage"
import ImageMessage from "./messages-type/imgMessage"
import { recievedMessageInterface } from "@/src/models/interface"
import VoiceMessage from "./messages-type/voiceMessage"
import MusicMessage from "./messages-type/musicMessage/musicMessage"
import FileMessage from "./messages-type/fileMessage"
import VideoMessage from "./messages-type/videoMessages"
import { useAppSelector } from "@/src/redux/hooks"
import findIndex from "@/src/helper/findIndex"
import { contactInterface } from "@/src/redux/features/userContactListSlice"
import { UserInterface } from "@/src/redux/features/userInfoSlice"

interface messageProps {
    type: string
    dir: string,
    msg: recievedMessageInterface,
    messageBoxRef: RefObject<HTMLDivElement>
}

const Message: FC<messageProps> = ({ type, dir, msg, messageBoxRef }) => {

    const userContactList = useAppSelector(state => state.userContactsList).contacts
    const User = useAppSelector(state => state.userInfo).User
    const [sender, setSender] = useState<contactInterface | UserInterface>()
    useEffect(() => {
        if (msg.messageInfo.senderId === User._id) {
            // @ts-ignore
            setSender(User)
        } else {
            const userContactListIds = userContactList.map(uc => uc._id)
            let index = findIndex(0, userContactList.length, userContactListIds, msg.forwarded.by)
            // @ts-ignore
            setSender(userContactList[index])
        }
    }, [])
    switch (type) {
        case messageTypes.text:
            return (<TextMessage dir={dir} msg={msg} messageBoxRef={messageBoxRef} sender={sender} />)
        case messageTypes.photo:
            return (<ImageMessage dir={dir} msg={msg} />)
        case messageTypes.voice:
            return (<VoiceMessage dir={dir} msg={msg} />)
        case messageTypes.music:
            return (<MusicMessage dir={dir} msg={msg} />)
        case messageTypes.file:
            return (<FileMessage dir={dir} msg={msg} />)
        case messageTypes.videoMessage:
            return (<VideoMessage dir={dir} msg={msg} sender={sender} />)
    }

    return (<></>)

}

export default Message