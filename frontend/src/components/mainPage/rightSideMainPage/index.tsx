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
                        <div className="grid grid-cols-[repeat(14,_minmax(0,_1fr))] gap-[2px] ">
                            <div className="col-span-10  ">
                                <Chat infoState={infoState} setInfoState={setInfoState} />
                            </div>
                            <div className="col-span-4 bg-purple-400 ">
                                <ChatInfo />
                            </div>
                        </div>
                    )
                    : (
                        <div className="">
                            <div className="col-span-10  ">
                                <Chat infoState={infoState} setInfoState={setInfoState} />
                            </div>
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
