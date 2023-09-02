"use client"

import { ChatType } from "@/src/models/enum";
import { useAppSelector } from "@/src/redux/hooks";
// import EmojiPicker from "emoji-picker-react";
import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import TextareaAutosize from 'react-textarea-autosize';

interface ChatInputProps {
    input: string,
    setInput: Dispatch<SetStateAction<string>>
    sendHandler: () => void,
}



const ChatInput: FC<ChatInputProps> = ({ sendHandler, input, setInput }) => {

    const chat = useAppSelector(state => state.chat.Chat)
    const chatFetched = useAppSelector(state => state.chat).chatFetched

    const textareaAutosizeParentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // chatFetched : add this because before chat fetched this code runs and make error by userPermission undefined
        if (chatFetched === true && chat.chatType === ChatType.group) {
            const permissions = chat.userPermissionsAndExceptions.permissions
            if (permissions) {
                const textarea = textareaAutosizeParentRef.current?.children[0]
                if (!permissions.sendMessage) {
                    textarea?.setAttribute('placeholder', '× Text not allowed ×')
                    // @ts-ignore
                    textarea.disabled = true
                } else {
                    textarea?.setAttribute('placeholder', 'Write a message ...')
                    // @ts-ignore
                    textarea.disabled = false
                }
            }
        }
    }, [chatFetched ? chat : chatFetched])


    const snedMessage = async () => {
        sendHandler()
        setInput('')
    }

    return (
        <div ref={textareaAutosizeParentRef} className={`w-full flex justify-center font-[vazir] placeholder:justify-center`}>
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
                    font-[Arial,FontAwesome]
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