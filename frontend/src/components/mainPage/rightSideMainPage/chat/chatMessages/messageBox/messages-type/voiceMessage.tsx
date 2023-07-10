"use client"

import { FC, useState } from "react";

import { BsFillPlayCircleFill, BsFillPauseCircleFill } from 'react-icons/bs'

interface VoiceMessageProps {

}

const VoiceMessage: FC<VoiceMessageProps> = () => {
    const [play, setPlay] = useState<boolean>(false)

    const Icon2 = play ? BsFillPauseCircleFill : BsFillPlayCircleFill
    return (
        <>
            VoiceMessage
            <div>
                <div
                    className={`
                        control 
                        cursor-pointer 
                        w-12 h-12
                        rounded-full
                        flex
                        items-center
                        justify-center
                        transition
                        duration-500
                        ${play ? '' : 'rotate-90'}
                        ease-in-out
                        `
                    }
                    onClick={() => setPlay(!play)}>
                    <Icon2 className={`
                        w-14
                        h-14
                         text-blue-500 
                        ${play ? '' : 'rotate-[-90deg]'}
                        `
                    } />

                </div>
            </div>
        </>
    );
}

export default VoiceMessage;