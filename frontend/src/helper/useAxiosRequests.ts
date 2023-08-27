"use client"

import ValidationError from '@/src/errors/validationError';
import callApi from "./callApi"
import { addChat, addMemberToGroup, editGroupInfoAction, editGroupTypeSetting, editProfilePicAction, removeMemberFromGroup, setChatCreated, setChatFetched, setChatType, setFirstChat, userPermissionsInterface } from "../redux/features/chatSlice";
import { groupMemberInterface } from '../models/interface';
import { editUserContactName, editUserContactProfilePic } from '../redux/features/userContactSlice';
import { editNameInChatOfChatList, editNameInChatOfFolderChatList, editProfilePicInChatOfChatList, editProfilePicInChatOfFolderChatList } from '../redux/features/userChatListSlice';

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
            dispatch(setFirstChat(false))
            const Chat = res.data.value.chat
            dispatch(addChat(Chat))
            dispatch(setChatFetched(true))
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
        console.log('create chat res : ', res)
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
        console.log('createMessage res : ', res)
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

export const editGroupInfo = async (chatId: string, data: any, index: number, dispatch: any) => {
    try {
        const res = await callApi().patch(`/main/chat/group/editGroupInfo/${chatId}`, data, config)
        console.log('edit group info res : ', res)
        if (res.status === 200) {
            // edit in chat
            dispatch(editGroupInfoAction({ name: data.name, description: data.description }))
            // edit in chatInfo
            dispatch(editUserContactName(data.name))
            // edit in chatList
            dispatch(editNameInChatOfChatList({ index: index, name: data.name }))
            // edit in folderChatList
            dispatch(editNameInChatOfFolderChatList({ index: index, name: data.name }))

        }
    } catch (error) {
        console.log('edit group info error : ', error)
    }
}

export const editGroupType = async (chatId: string, data: any, dispatch: any) => {
    try {
        const res = await callApi().patch(`/main/chat/group/editGroupType/${chatId}`, data, config)
        console.log('edit group type res : ', res)
        if (res.status === 200) {
            dispatch(editGroupTypeSetting(data))

        }
    } catch (error) {
        console.log('edit group type error : ', error)
    }
}

export const editProfilePic = async (profilePicId: string, formData: any, index: number, dispatch: any) => {
    try {
        const res = await callApi().patch(`/main/profilePic/${profilePicId}`, formData, config)
        console.log('edit profile pic res : ', res)
        // edit in chat
        dispatch(editProfilePicAction(res.data.value.profilePic))
        // edit in chatInfo
        dispatch(editUserContactProfilePic(res.data.value.profilePic))
        // edit in chatList
        dispatch(editProfilePicInChatOfChatList({ index: index, profilePic: res.data.value.profilePic }))
        // edit in folderChatList
        dispatch(editProfilePicInChatOfFolderChatList({ index: index, profilePic: res.data.value.profilePic }))


    } catch (error) {
        console.log('edit profile pic error : ', error)
    }
}

export const addProfilePic = async (id: string, data: any) => {
    try {
        const res = await callApi().post(`/main/addprofile/${id}`, data, config)
        console.log('add profile pic res : ', res)

    } catch (error) {
        console.log('add profile pic error : ', error)

    }
}