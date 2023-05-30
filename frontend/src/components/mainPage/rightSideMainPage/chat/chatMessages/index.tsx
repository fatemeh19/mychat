"use client"

import DateLine from "./dateLine"
import MessageBox from "./messageBox"

export default function ChatMessages() {

    return (
        <div className="w-full h-full overflow-auto overflow-x-hidden chat-scrollbar">
            <div className="mx-10">
                <DateLine date="Today" />
                <MessageBox />
            </div>
        </div>
    )
}
