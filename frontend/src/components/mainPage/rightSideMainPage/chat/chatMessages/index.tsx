"use client"

import { useAppSelector } from "@/src/redux/hooks"
import DateLine from "./dateLine"
import MessageBox from "./messageBox"
import { MessageBoxProps } from "@/src/models/enum"

export default function ChatMessages() {

    const messages = useAppSelector(state => state.message).Messages
    const UserId = useAppSelector(state => state.userInfo).User._id
    console.log('messages from slice : ', messages)

    // message buld hear for SHow

    return (
        <div className="w-full h-full overflow-auto overflow-x-hidden chat-scrollbar flex justify-end flex-col">
            {/* <div className="w-full h-full flex justify-center items-center">
                <p className="p-2 h-fit bg-gray-100 font-semibold text-gray-700">No Message</p>
            </div> */}

            <div className="mx-10">
                {/* <DateLine date="Today" /> */}
                <div className="flex flex-col gap-5">
                    <>
                        {
                            messages.map((msg,index) => {
                                // console.log(msg.content.text)
                                return <MessageBox key={index} msg={msg}/>
                                // console.log(msg)
                                // <MessageBox/>

                                // if (msg.senderId === UserId) {
                                //     <MessageBox   />
                                // }else {
                                //     <MessageBox />
                                // }
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
