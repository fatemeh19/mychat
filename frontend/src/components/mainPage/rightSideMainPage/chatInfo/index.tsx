"use client"

import { createRef } from "react"
import InfoFiles from "./infoFiles"
import InfoSetting from "./infoSetting"
import Informatin from "./information"
import MoreAction from "./moreAction"
import { ChatType } from "@/src/models/enum"
import { useAppSelector } from "@/src/redux/hooks"


export default function ChatInfo() {

    const chatType = useAppSelector(state => state.chat.Chat).chatType

    const scrollWrapRef = createRef<HTMLDivElement>()
    const elementRef = createRef<HTMLParagraphElement>()

    // a little time should spen to recognize the html elements
    setTimeout(() => {
        const scrollWrap = scrollWrapRef.current;
        const element = elementRef.current;

        const runOnScroll = () => {
            console.log('scrolling')
            console.log('top: ', scrollWrap?.scrollTop)

            // @ts-ignore
            if (scrollWrap?.scrollTop >= 100) {
                // @ts-ignore
                element.style.borderBottom = '1px solid #e5e7eb'
                // @ts-ignore
            } else element.style.borderBottom = 'none'
        }
        scrollWrap?.addEventListener('scroll', runOnScroll)

    }, 5);



    return (
        <div className="h-screen closeInfoTab border-l-2 overflow-auto overflow-x-hidden chat-scrollbar min-w-fit max-w-[18rem] bg-gray-100"
            ref={scrollWrapRef}
        >
            <p className="bg-white px-5 py-3 sticky top-0" ref={elementRef}>user info</p>
            <div className="gap-3 flex flex-col ">
                <Informatin />
                <InfoSetting chatType={chatType} />
                <InfoFiles />
                <MoreAction />
            </div>
        </div>
    )
}
