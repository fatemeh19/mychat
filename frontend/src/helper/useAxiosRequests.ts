"use client"

import ValidationError  from '@/src/errors/validationError';
import callApi from "./callApi"
import { addChat, setFirstChat } from "../redux/features/chatSlice";
import { addMessage } from "../redux/features/chatSlice";

const token = localStorage.getItem('token')
const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
};

export const fetchChat = async (userId: string, contactId: string, dispatch: any) => {
    let res: any;
    try {
        res = await callApi().get(`/main/chat/${contactId}`, config)
        console.log('getChat res : ', res)
        // check if chat is availeble : get chat
        if (res.statusText && res.statusText === 'OK') {
            setFirstChat(false)
            dispatch(setFirstChat(false))
            const Chat = res.data.value.chat
            dispatch(addChat(Chat))
            // save Chat in redux
            return res.data.value.chat._id
        }

    } catch (error) {
        if (error instanceof ValidationError) {
            // @ts-ignore
            const err = error.Error.errors[0];

            if (err.errorType === 'FormatError') {
                console.log(err.message)
            }

            // check if chat is not availeble : creat chat
            // @ts-ignore
            if (error.Error.statusCode === 400 && err.errorType === 'NotFoundError') {
                console.log('error message : ', err.message)
                setFirstChat(true)
                dispatch(setFirstChat(true))
                // const chatId = await createChat(userId, contactId)
                // return chatId
            }
        }
    }
}

export const createChat = async (userId: string, contactId: string) => {
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

export const createMessage = async (chatId: string, newMessage: messageInterface, dispatch: any,) => {
    console.log('start create message')
    let res: any;
    // not found chat => create chat
    try {
        res = await callApi().post(`/main/message/${chatId}`, newMessage, config)
        if (res.statusText && res.statusText === 'OK') {
            console.log('message created.')
            dispatch(addMessage(newMessage))
            // save message in messages redux

        }
    } catch (error) {
        console.log(error)
    }

    console.log('res from createMessage : ', res)
}