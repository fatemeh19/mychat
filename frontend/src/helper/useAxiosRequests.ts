"use client"

import ValidationError from '@/src/errors/validationError';
import callApi from "./callApi"
import { addChat, setChatCreated, setFirstChat } from "../redux/features/chatSlice";

const token = localStorage.getItem('token')
const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
};

export const fetchChat = async (chatId: string, dispatch: any) => {
    let res: any;
    try {
        res = await callApi().get(`/main/chat/${chatId}`, config)
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
                dispatch(setFirstChat(true))
            }
        }
    }
}

export const createChat = async (userId: string, memberIds: string[], chatType: string, groupName: string = '', dispatch: any) => {
    memberIds.push(userId)
    // chatType
    const data = {
        chatType: chatType,
        memberIds,
        name: groupName
    }
    let res: any;
    // not found chat => create chat
    try {
        res = await callApi().post('/main/chat/', data, config)
        if (res.statusText && res.statusText === 'Created') {
            const chatId = res.data.value.chatId
            await fetchChat(chatId, dispatch)
            dispatch(setChatCreated(true))
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
}

export const createMessage = async (chatId: string, newMessage: any, dispatch: any,) => {
    let res: any;
    try {
        res = await callApi().post(`/main/message/${chatId}`, newMessage, config)
        if (res.statusText && res.statusText === 'OK') {
            return res.data.value.message

        }
    } catch (error) {
        console.log('createMessage error : ', error)
    }

}