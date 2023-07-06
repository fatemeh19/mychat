"use client"

import ValidationError from "@/src/errors/validationError";
import callApi from "@/src/helper/callApi";
import { Dispatch, FC, SetStateAction, useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';
// import style from './chatInput.module.css'
interface ChatInputProps {
    input : string,
    setInput : Dispatch<SetStateAction<string>>
    sendHandler: () => void,
}



const ChatInput: FC<ChatInputProps> = ({ sendHandler, input, setInput }) => {

    const snedMessage = async () => {
        console.log('start sending message')
        sendHandler()
        console.log('message sended')

        setInput('')
    }


    return (
        <div className={`w-full flex justify-center font-[vazir] placeholder:justify-center`}>
            <TextareaAutosize
                placeholder="Write a message ..."
                className="
                    w-full 
                    bg-transparent
                    text-[16px]
                    font-[200]
                    placeholder:text-sm    
                    focus-visible:outline-none
                    resize-none
                    placeholder:leading-[1.8rem]
                    leading-5
                    untvisible-scrollbar
                "
                maxRows={8}
                onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        snedMessage()
                    }
                }}
                onChange={e => setInput(e.target.value)}
                value={input}
            />
        </div>
    );
}

export default ChatInput;