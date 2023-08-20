"use client"

import { chatInterface } from "../redux/features/chatSlice"
import { addChat, addChatList, chatBoxInterface } from "../redux/features/userChatListSlice"
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
        // console.log(contacts)
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

export const fetchUserChatList = async (dispatch: any) => {
    const res = await callApi().get('/main/chat/', config)
    if (res.statusText && res.statusText === 'OK') {
        // console.log(res)
        const chatList = res.data.value.chats;
        // console.log("all chatList:", chatList)
        dispatch(addChatList([]))
        // console.log(chatList)
        for (let i = 0; i < chatList.length; i++) {
            let chatInfo = {}
            // console.log(chatList[i].chatType)
            if (chatList[i].chatType == "private") {
                chatInfo = await contactChatList(chatList[i])
                // console.log('chatInfo : ', chatInfo)
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
                console.log('chatList[i].messages[0]:', chatList[i].messages)
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

            }
            dispatch(addChat(chat))

        }
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
}

export const profilePicHandler = (user: any) => {
    const profilePicName = user.profilePic ? (user.profilePic.path).split(`\\`) : '';
    if (profilePicName[profilePicName.length - 2] === 'defaults') {
        return `/defaults/${profilePicName[profilePicName.length - 1]}`
    } else {
        return `/uploads/photo/${profilePicName[profilePicName.length - 1]}`
    }
}

export const userHandler = async () => {
    let user;
    const res = await callApi().get('/main/user/profile', config)
    if (res.statusText && res.statusText === 'OK') {
        user = res.data.value.profile;

    }
    return user;
}