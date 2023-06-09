"use client"

import Image from "next/image"
import Message from "./message"

import { ChatType, MessageBoxProps } from "@/src/models/enum"
import { useAppSelector } from "@/src/redux/hooks"
import { recievedMessageInterface } from "@/src/models/interface"

const MessageBox = ({ msg }: { msg: recievedMessageInterface }) => {
    const User = useAppSelector(state => state.userInfo).User
    const Contact = useAppSelector(state => state.userContact).Contact
    const chatType = useAppSelector(state => state.chat).chatType
    let sender;

    let information = {
        dir: MessageBoxProps.rtl,
        name: '',
        profilePic: ''
    }

    msg.senderId === User._id
        ? sender = User
        : sender = Contact

    const profilePic = sender.profilePic ? (sender.profilePic).split(`\\`) : '';
    information.dir = sender === User ? MessageBoxProps.rtl : MessageBoxProps.ltr
    information.name = sender.name
    information.profilePic = sender.profilePic ? profilePic[profilePic.length - 1] : '';

    console.log('message content type : ', msg)
    return (
        <div className="">
            <div className={`flex gap-5 ${information.dir === 'rtl' ? 'flex-row-reverse' : ''} `}>
                {
                    chatType !== ChatType.Private
                        ? (
                            <div className="profileImageBox relative">
                                {/* this image for box width so the text dont go under the profile image and make the opacity - 0 so we can see the second image ... i use this method til find better way */}
                                <Image
                                    // src={'/images/girl-profile3.jpg'}
                                    src={
                                        information.profilePic
                                            ? `/uploads/picture/${information.profilePic}`
                                            : '/uploads/picture/defaultProfilePic.png'
                                    }
                                    width={45}
                                    height={0}
                                    alt=""
                                    className="rounded-full opacity-0 max-w-lg "
                                />
                                <Image
                                    src={
                                        information.profilePic
                                            ? `/uploads/picture/${information.profilePic}`
                                            : '/uploads/picture/defaultProfilePic.png'
                                    }
                                    width={45}
                                    height={0}
                                    alt=""
                                    className="rounded-full absolute top-0 left-0 max-w-lg w-[50px] h-[50px] object-cover "
                                />
                            </div>
                        )
                        : null
                }

                <div className={`content flex flex-col ${information.dir === 'rtl' ? 'items-end' : 'items-start'} mb-2`}>
                    {
                        chatType !== ChatType.Private
                            ? (
                                <div className={`flex gap-2 items-end mb-2 ${information.dir === 'rtl' ? 'flex-row-reverse' : ''} `}>
                                    <h1 className="name font-bold text-sm text-center whitespace-nowrap dark:text-white">{information.name}</h1>
                                </div>
                            )
                            : null
                    }

                    <div className="gap-3 flex flex-col">
                        <Message type={msg.content.contentType} dir={information.dir} msg={msg} />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default MessageBox