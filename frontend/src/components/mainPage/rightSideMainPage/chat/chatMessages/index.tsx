"use client"

import DateLine from "./dateLine"
import MessageBox from "./messageBox"
import { MessageBoxProps } from "@/src/models/enum"

export default function ChatMessages() {

    return (
        <div className="w-full h-full overflow-auto overflow-x-hidden chat-scrollbar">
            <div className="mx-10">
                <DateLine date="Today" />
                <div className="flex flex-col gap-5">
                    {/* if me set dir to rlt 
                        if others set dir to ltr */}
                    <MessageBox dir={MessageBoxProps.rtl} />
                    <MessageBox dir={MessageBoxProps.ltr} />

                </div>
            </div>
        </div>
    )
}
