"use client"

import { useState } from "react"

import Chat from "./chat"
import ChatInfo from "./chatInfo"

export default function RightSideMainPage() {

    const [infoState, setInfoState] = useState(true)

    return (
        <>
            {
                infoState
                    ? (
                        <div className="flex gap-[1px]">
                            <div className="w-full ">
                                <Chat infoState={infoState} setInfoState={setInfoState} />
                            </div>
                            <div className="min-w-fit">
                                <ChatInfo />
                            </div>
                        </div>
                    )
                    : (
                        <div className="">
                            <Chat infoState={infoState} setInfoState={setInfoState} />
                        </div>
                    )
            }


        </>
    )

    // <div className="grid grid-cols-[repeat(14,_minmax(0,_1fr))] gap-[2px] ">
    //         <div className="col-span-10  ">
    //             <Chat setOpen={setOpen} />
    //         </div>
    //         <div className="col-span-4 bg-purple-400 ">
    //             <ChatInfo />
    //         </div>
    //     </div>


}
