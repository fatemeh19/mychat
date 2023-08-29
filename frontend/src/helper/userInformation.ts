"use client"

import { addFoldersList, folderInterface, setCloseFolders } from "../redux/features/folderSlice"
import { addChat, addChatList, addChatToFolderChatList, addFolderChatList, addGroupChat, addPrivateChat, setFolderId } from "../redux/features/userChatListSlice"
import { chatInterface } from "../redux/features/chatSlice"
import { addContactsList } from "../redux/features/userContactListSlice"
import { addUserInfo, updateUserProfileInfo } from "../redux/features/userInfoSlice"
import callApi from "./callApi"

const token = localStorage.getItem('token')
const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
};


export const fetchUserContactsListData = async (dispatch: any) => {
    dispatch(addContactsList([]))
    const res = await callApi().get('/main/contact/', config)
    if (res.statusText && res.statusText === 'OK') {
        const contacts = res.data.value.contacts;
        dispatch(addContactsList(contacts))
    }
}


export const fetchUserProfileData = async (dispatch: any) => {

    dispatch(addUserInfo(await userHandler()))

}

const findContact = async (contactId: any) => {
    let contact = {}
    let contactList = []
    const res1 = await callApi().get('/main/contact/', config)
    if (res1.statusText && res1.statusText === 'OK') {
        contactList = res1.data.value.contacts;

    }
    for (let i = 0; i < contactList.length; i++) {
        if (contactList[i]._id == contactId) {
            contact = contactList[i]
            break;
        }
    }
    return contact;

}

const contactChatList = async (chatBox: any) => {
    let contact = {}
    let user = await userHandler();

    if (chatBox.members[0].memberId == user._id) {
        contact = await findContact(chatBox.members[1].memberId)
    }
    else {
        contact = await findContact(chatBox.members[0].memberId)
    }

    return contact;
}

export const fetchUserChatList = async (dispatch: any) => {
    let allChatList = []
    const res = await callApi().get('/main/chat/', config)
    if (res.statusText && res.statusText === 'OK') {
        const chatList = res.data.value.chats;
        dispatch(addChatList([]))
        dispatch(setCloseFolders())
        dispatch(setFolderId(''))
        for (let i = 0; i < chatList.length; i++) {
            let chatInfo = {}
            if (chatList[i].chatType == "private") {
                chatInfo = await contactChatList(chatList[i])
            }
            else if (chatList[i].chatType == "group") {
                chatInfo = {
                    name: chatList[i].name,
                    profilePic: chatList[i].profilePic,
                    _id: chatList[i]._id,
                    status: {}
                }
            }
            let lastMessage = ''
            let lastMessageTime = ''
            if (chatList[i].messages[0] != null) {
                lastMessage = chatList[i].messages[0].messageInfo.content.text
                lastMessageTime = chatList[i].messages[0].messageInfo.updatedAt
            }
            else if (chatList[i].messages[0] == null) {
                lastMessageTime = chatList[i].updatedAt
            }
            let chat = {
                chatInfo: chatInfo,
                _id: chatList[i]._id,
                lastMessage: lastMessage,
                lastMessageTime: lastMessageTime,
                open: false,
                chatType: chatList[i].chatType,
                pinned: chatList[i].pinned
            }
            if (chat.chatType == "private") {
                dispatch(addPrivateChat(chat))
            }
            else if (chat.chatType == "group") {
                dispatch(addGroupChat(chat))
            }
            dispatch(addChat(chat))
            allChatList.push(chat)

        }
        dispatch(addFolderChatList(allChatList))
    }
}

export const addChatToUserChatList = async (newChat: chatInterface, dispatch: any) => {
    let chatInfo = {}
    if (newChat.chatType == "private") {
        chatInfo = await contactChatList(newChat)
    }
    else if (newChat.chatType == "group") {
        chatInfo = {
            name: newChat.name,
            profilePic: newChat.profilePic,
            _id: newChat._id,
            status: {}
        }
    }
    let lastMessage = ''
    let lastMessageTime = ''
    if (newChat.messages[0] != null) {
        lastMessage = newChat.messages[0].messageInfo.content.text
        lastMessageTime = newChat.messages[0].messageInfo.updatedAt
    }
    else if (newChat.messages[0] == null) {
        lastMessageTime = newChat.updatedAt
    }
    let chat = {
        chatInfo: chatInfo,
        _id: newChat._id,
        lastMessage: lastMessage,
        lastMessageTime: lastMessageTime,
        open: false,
    }
    dispatch(addChat(chat))
    dispatch(addChatToFolderChatList(chat))
}

export const profilePicHandler = (user: any) => {
    const profilePicName = user.profilePic ? (user.profilePic.path).split(`\\`) : '';
    if (profilePicName[profilePicName.length - 2] === 'defaults') {
        return `/defaults/${profilePicName[profilePicName.length - 1]}`
    } else {
        return `/uploads/photo/${profilePicName[profilePicName.length - 1]}`
    }
}

export const fileHandler = (file: any) => {
    const fileName = (file.path).split(`\\`);
    console.log('path : ', `/uploads/${fileName[fileName.length - 2]}/${fileName[fileName.length - 1]}`)
    return `/uploads/${fileName[fileName.length - 2]}/${fileName[fileName.length - 1]}`

}

export const userHandler = async () => {
    let user;
    const res = await callApi().get('/main/user/profile', config)
    console.log('userHandler user profile res : ', res)
    if (res.statusText && res.statusText === 'OK') {
        user = res.data.value.profile;
        if (user.pinnedChats == undefined) {
            Object.assign(user, { pinnedChats: [] })
        }
    }
    return user;
}

export const getFolders = async (dispatch: any) => {
    const res = await callApi().get('/main/folder/', config)
    if (res.statusText && res.statusText === 'OK') {
        let folders: folderInterface[] = [];

        // @ts-ignore
        (res.data.value.folders).map(f => {

            const folder = {
                _id: f._id,
                name: f.name,
                chats: f.chats,
                pinnedChats: f.pinnedChats,
                numOfChat: f.chats.length,
                open: false
            }
            folders.push(folder)
        })
        dispatch(addFoldersList(folders))

    }
}
export const getFolderChats = async (folderId: string, dispatch: any, chatList: any) => {
    const res = await callApi().get(`/main/folder/${folderId}`, config)
    console.log('getFolderChats res', res)
    if (res.statusText && res.statusText === 'OK') {
        let folderChatList = []
        let chats = res.data.value.folder.chats;
        for (let i = 0; i < chats.length; i++) {
            for (let j = 0; j < chatList.length; j++) {
                if (chats[i].chatInfo._id === chatList[j]._id) {
                    folderChatList.push(chatList[j])
                    break;
                }
            }
        }
        dispatch(addFolderChatList(folderChatList))
    }
}
export const updateUserProfile = async (data: any, dispatch: any) => {
    try {
        const res = await callApi().patch('/main/user/profile', data, config)
        console.log('update user profile res : ', res)
        if (res.status === 200) {
            dispatch(updateUserProfileInfo({ name: data.name, lastname: data.lastname, phoneNumber: data.phoneNumber, username: data.username }))
        }
    } catch (error) {
        console.log('update user profile error : ', error)
        // @ts-ignore
        if (error.Error.errors[0].field === 'phoneNumber') {
            // @ts-ignore
            alert(error.Error.errors[0].message)
        }
    }
}