"use client"

import { addFoldersList } from "../redux/features/folderSlice"
import { addChat, addChatList, addFolderChatList, addGroupChat, addPrivateChat } from "../redux/features/userChatListSlice"
import { addContactsList } from "../redux/features/userContactListSlice"
import { addUserInfo } from "../redux/features/userInfoSlice"
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

export const fetchUserChatList = async (dispatch: any) => {
    let allChatList = []
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
                // console.log("fond")
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
    const res = await callApi().get('/main/chat/', config)
    if (res.statusText && res.statusText === 'OK') {
        const chatList = res.data.value.chats;
        // console.log("all chatList:", chatList)
        dispatch(addChatList([]))
        for (let i = 0; i < chatList.length; i++) {
            let chatInfo = {}
            // console.log(chatList[i].chatType)
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
                console.log('chatList[i].messages:', chatList[i].messages)
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
                chatType: chatList[i].chatType
            }
            if (chat.chatType == "private") {
                dispatch(addPrivateChat(chat))
            }
            else if (chat.chatType == "private") {
                dispatch(addGroupChat(chat))
            }
            dispatch(addChat(chat))
            allChatList.push(chat)

        }
        dispatch(addFolderChatList(allChatList))
    }
}

export const profilePicNameHandler = (user: any) => {
    const profilePicName = user.profilePic ? (user.profilePic).split(`\\`) : '';
    return profilePicName[profilePicName.length - 1];
}
export const userHandler = async () => {
    let user;
    const res = await callApi().get('/main/user/profile', config)
    if (res.statusText && res.statusText === 'OK') {
        user = res.data.value.profile;

    }
    return user;
}

export const getFolders = async (dispatch: any) => {
    const res = await callApi().get('/main/folder/', config)
    if (res.statusText && res.statusText === 'OK') {
        console.log('folders:', res.data.value.folders)
        dispatch(addFoldersList(res.data.value.folders))
    }
}
export const getFolderChats = async (folderId: string, dispatch: any) => {
    const res = await callApi().get(`/main/folder/${folderId}`, config)
    if (res.statusText && res.statusText === 'OK') {
        console.log(`folder chat/${folderId}:`, res.data.value.chats)
        dispatch(addFolderChatList(res.data.value.chats))
    }
}