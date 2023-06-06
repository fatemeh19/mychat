"use client"

import InfoFiles from "./infoFiles"
import InfoSetting from "./infoSetting"
import Informatin from "./information"
import MoreAction from "./moreAction"


export default function ChatInfo() {

    return (
        <div className="h-screen closeInfoTab border-l-2 overflow-auto overflow-x-hidden chat-scrollbar min-w-fit max-w-[18rem] bg-gray-100">
            <p className="bg-white px-5 py-3">user info</p>
            <div className="gap-3 flex flex-col ">
                <Informatin />
                <InfoSetting />
                <InfoFiles />
                <MoreAction />
            </div>
        </div>
    )
}
