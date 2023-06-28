"use client"

import ValidationError from "@/src/errors/validationError";
import callApi from "@/src/helper/callApi";
import { FC, useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';
// import style from './chatInput.module.css'
interface ChatInputProps {
    userId: string,
    contactId: string,
}

const getChat = async (userId: string, contactId: string, config: {}) => {
    console.log('start get chat')
    let res: any;
    try {
        res = await callApi().get(`/main/chat/${userId}/${contactId}`, config)
        console.log('getChat res : ', res)
        // check if chat is availeble : get chat
        if (res.statusText && res.statusText === 'OK') {
            console.log('chat get')
            // save Chat in redux
            return res.data.value.chat._id
        }

    } catch (error) {
        if (error instanceof ValidationError) {
            // @ts-ignore
            const err = error.Error.errors[0];
            console.log('فرمت نادرست در getChat')
            // @ts-ignore

            // check if chat is not availeble : creat chat
            if (error.Error.statusCode === 400 && err.errorType === 'NotFoundError') {
                console.log('error message : ', err.message)
                const chatId = await createChat(userId, contactId, config)
                return chatId

            }
        }
    }
    console.log('res from getChat : ', res)

    // return res.data.value.contact

}

const createChat = async (userId: string, contactId: string, config: {}) => {
    console.log('start create chat')
    const data = {
        memberIds: [userId, contactId]
    }
    let res: any;
    // not found chat => create chat
    try {
        res = await callApi().post('/main/chat/', data, config)
        if (res.statusText && res.statusText === 'Created') {
            console.log('chat created.')
            return res.data.value.chatId


        }
    } catch (error) {
        // console.log('error in create chat : ', error)
        // @ts-ignore
        const err = error.Error.errors[0]
        if (err.errorType === 'FormatError') {
            console.log(err.message)
        }
        else if (err.errorType === 'DuplicateError') {
            console.log(err.message)
        }
    }



    console.log('res from createChat : ', res)


}
interface messageContentInterface {
    contentType: string,
    text: string
}

interface messageInterface {
    content: messageContentInterface,
    senderId: string

}

const createMessage = async (chatId: string, newMessage: messageInterface, config: {}) => {
    console.log('start create message')
    let res: any;
    // not found chat => create chat
    try {
        res = await callApi().post(`/main/message/${chatId}`, newMessage, config)
        if (res.statusText && res.statusText === 'OK') {
            console.log('message created.')
            // save message in messages redux

        }
    } catch (error) {
        console.log(error)
    }

    console.log('res from createMessage : ', res)
}


const ChatInput: FC<ChatInputProps> = ({ userId, contactId }) => {

    const [input, setInput] = useState<string>('')
    const snedMessage = async () => {
        console.log('start sending message')

        const token = localStorage.getItem('token')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        let messageData = new FormData()
        messageData.append('message', input)

        const chatId = await getChat(userId, contactId, config)
        console.log('chatId in chatInput', chatId)
        // await createChat(userId, contactId, config)
        // await createMessage(chatId, newMessage, config)


        const newMessage = {
            content: {
                contentType: 'text',
                text: input
            },
            senderId: userId
        }

        chatId
            ? createMessage(chatId, newMessage, config)
            : null

        // connect to createMessage socket

        // send message to server (need sendeId and chatId=userId+contactId)

        // if res = 200 add to message slice 

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