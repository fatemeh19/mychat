"use client"

import ValidationError from '@/src/errors/validationError';
import callApi from "./callApi"
import { addChat, addMemberToGroup, removeMemberFromGroup, setChatCreated, setFirstChat, userPermissionsInterface } from "../redux/features/chatSlice";
import { groupMemberInterface } from '../models/interface';

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
            // console.log('Chat in fetch Chat: ', Chat)
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

export const createMessage = async (chatId: string, newMessage: any, dispatch: any) => {
    let res: any;
    console.log('newMessage:', newMessage)
    try {
        res = await callApi().post(`/main/message/${chatId}`, newMessage, config)
        if (res.statusText && res.statusText === 'OK') {
            console.log(res)
            return res.data.value.message

        }
    } catch (error) {
        console.log('createMessage error : ', error)
    }

}

export const getGroupMembers = async (chatId: string, dispatch: any) => {
    try {
        const res = await callApi().get(`/main/chat/group/getMembers/${chatId}`, config)
        console.log('get group members res : ', res)
        return res.data.value.members
    } catch (error) {
        console.log('get group members error : ', error)
    }
}

export const addGroupMember = async (chatId: string, memberId: string, addedMember: groupMemberInterface, dispatch: any) => {
    const data = {
        memberId: memberId
    }
    try {
        const res = await callApi().post(`/main/chat/group/addMember/${chatId}`, data, config)
        console.log('add group member res : ', res)
        // ----------------- add member to group member by dispatch
        dispatch(addMemberToGroup(addedMember))
    } catch (error) {
        console.log('add group member error : ', error)
    }
}

export const removeGroupMember = async (chatId: string, memberId: string, memberIndex: number, dispatch: any) => {
    try {
        const res = await callApi().delete(`/main/chat/group/removeMember/${chatId}/${memberId}`, config)
        console.log('remove group member res: ', res)
        dispatch(removeMemberFromGroup(memberIndex))
    } catch (error) {
        console.log('remove group member error: ', error)
    }
}

export const editMessage = async (id: string, editedMessage: any, dispatch: any) => {
    console.log('id : ', id),
        console.log('editedMessage : ', editedMessage)
    try {
        const res = await callApi().put(`/main/message/${id}`, editedMessage, config)
        console.log('edit message res: ', res)

        return res.data.value.message
        // dispatch(removeMemberFromGroup(memberIndex))
    } catch (error) {
        console.log('edit message error: ', error)
    }
}

export const editGroupPermissions = async (chatId: string, permissions: userPermissionsInterface) => {
    try {
        const data = {
            permissions,
            exceptions: []
        }
        const res = await callApi().patch(`/main/chat/group/editGroupPermissions/${chatId}`, data, config)
        console.log('edit group permissions res : ', res)
    } catch (error) {
        console.log('edit group permissions error : ', error)
    }
}