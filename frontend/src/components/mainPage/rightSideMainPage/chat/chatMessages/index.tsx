"use client"

import DateLine from "./dateLine"
import MessageBox from "./messageBox"
import { MessageBoxProps } from "@/src/models/enum"

export default function ChatMessages() {

    return (
        <div className="w-full h-full overflow-auto overflow-x-hidden chat-scrollbar">
            {/* <div className="w-full h-full flex justify-center">
                <p className="p-2 bg-gray-100 text-gray-700">No Message</p>
            </div> */}
            {/*
             <div className="mx-10">
                <DateLine date="Today" />
                <div className="flex flex-col gap-5">
                    //  if me set dir to rlt 
                    //     if others set dir to ltr 
                    // <MessageBox dir={MessageBoxProps.rtl} />
                    // <MessageBox dir={MessageBoxProps.ltr} />

                </div>
            </div> 

            */}

        </div>
    )
}
