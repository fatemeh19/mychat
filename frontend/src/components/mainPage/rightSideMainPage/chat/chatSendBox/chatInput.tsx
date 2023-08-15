"use client"

import { useAppSelector } from "@/src/redux/hooks";
// import EmojiPicker from "emoji-picker-react";
import { Dispatch, FC, SetStateAction } from "react";
import TextareaAutosize from 'react-textarea-autosize';

interface ChatInputProps {
    input: string,
    setInput: Dispatch<SetStateAction<string>>
    sendHandler: () => void,
}



const ChatInput: FC<ChatInputProps> = ({ sendHandler, input, setInput }) => {

    const editedMessage = useAppSelector(state => state.editMessage).editedMessageId

    const snedMessage = async () => {
        sendHandler()
        setInput('')
    }

    const onEmojiClickHandler = (e: any, emojiObject: any) => {
        setInput(prevInput => prevInput + emojiObject.emoji)
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
            {/* <EmojiPicker
                width='100%'
                onEmojiClick={onEmojiClickHandler}

            /> */}
        </div>
    );
}

export default ChatInput;