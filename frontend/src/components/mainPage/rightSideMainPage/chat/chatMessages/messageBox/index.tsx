"use client"

import Image from "next/image"
import Message from "./message"
import { messageTypes } from "@/src/interfaces/enum"

import { MessageBoxProps } from "@/src/interfaces/enum"

const MessageBox = ({ dir }: { dir: MessageBoxProps }) => {

    return (
        <>
            {

                dir === MessageBoxProps.rtl
                    ? (
                        // me
                        <div className="">
                            <div className="flex gap-5 flex-row-reverse">
                                <div className="profileImageBox relative">
                                    {/* this image for box width so the text dont go under the profile image and make the opacity - 0 so we can see the second image ... i use this method til find better way */}
                                    <Image
                                        src={'/images/girl-profile3.jpg'}
                                        width={45}
                                        height={0}
                                        alt=""
                                        className="rounded-full opacity-0 max-w-lg min-w-fit"
                                    />
                                    <Image
                                        src={'/images/girl-profile3.jpg'}
                                        width={45}
                                        height={0}
                                        alt=""
                                        className="rounded-full absolute top-0 left-0 max-w-lg min-w-fit"
                                    />
                                </div>
                                <div className="content flex flex-col">
                                    <div className="flex gap-2 items-end mb-2 flex-row-reverse ">
                                        <h1 className="name font-bold text-sm text-center whitespace-nowrap dark:text-white">Putri Tanjak</h1>
                                        <p className="date text-xs text-[#9a9a9a] mb-[.5px] whitespace-nowrap ">9:12 AM</p>
                                    </div>
                                    <div className="gap-3 flex flex-col">
                                        <Message type={messageTypes.text} />
                                        <Message type={messageTypes.image} isText={true} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    : (
                        // others
                        <div className="">
                            <div className="flex gap-5">
                                <div className="profileImageBox relative">
                                    {/* this image for box width so the text dont go under the profile image and make the opacity - 0 so we can see the second image ... i use this method til find better way */}
                                    <Image
                                        src={'/images/girl-profile3.jpg'}
                                        width={45}
                                        height={0}
                                        alt=""
                                        className="rounded-full opacity-0 max-w-lg min-w-fit"
                                    />
                                    <Image
                                        src={'/images/girl-profile3.jpg'}
                                        width={45}
                                        height={0}
                                        alt=""
                                        className="rounded-full absolute top-0 left-0 max-w-lg min-w-fit"
                                    />
                                </div>
                                <div className="content flex flex-col">
                                    <div className="flex gap-2 items-end mb-2 ">
                                        <h1 className="name font-bold text-sm text-center whitespace-nowrap  dark:text-white">Putri Tanjak</h1>
                                        <p className="date text-xs text-[#9a9a9a] mb-[.5px] whitespace-nowrap ">9:12 AM</p>
                                    </div>
                                    <div className="gap-3 flex flex-col">
                                        <Message type={messageTypes.text} />
                                        <Message type={messageTypes.image} isText={true} />
                                        <Message type={messageTypes.image} isText={false} />

                                    </div>
                                </div>
                            </div>
                        </div>
                    )
            }
        </>

    )
}

export default MessageBox