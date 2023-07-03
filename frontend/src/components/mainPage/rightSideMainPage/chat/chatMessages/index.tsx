"use client"

import { useAppSelector } from "@/src/redux/hooks"
import DateLine from "./dateLine"
import MessageBox from "./messageBox"

export default function ChatMessages() {

    const messages = useAppSelector(state => state.message).Messages
    console.log('messages from slice : ', messages)

    return (
        <div className="w-full h-full overflow-hidden flex justify-end flex-col">
            {/* <div className="w-full h-full flex justify-center items-center">
                <p className="p-2 h-fit bg-gray-100 font-semibold text-gray-700">No Message</p>
            </div> */}

            <div className="mr-1 pr-2 overflow-auto overflow-x-hidden chat-scrollbar mt-1">
                {/* <DateLine date="Today" /> */}
                <div className="flex flex-col ">
                    <>
                        {
                            messages.map((msg, index) => {
                                return <MessageBox key={index} msg={msg} />
                            })
                        }
                    </>

                    {/* if me set dir to rlt  */}
                    {/* if others set dir to ltr  */}
                    {/* <MessageBox dir={MessageBoxProps.rtl} /> */}
                    {/* <MessageBox dir={MessageBoxProps.ltr} />  */}

                </div>
            </div>



        </div>
    )
}
