"use client"

import { addChat, addChatList } from "../redux/features/userChatListSlice"
import { addContactsList } from "../redux/features/userContactListSlice"
import { addUserInfo } from "../redux/features/userInfoSlice"
import { useAppSelector } from "../redux/hooks"
import callApi from "./callApi"


export const fetchUserContactsListData = async (dispatch:any,userId:string) => {
    const token = localStorage.getItem('token')
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const res = await callApi().get('/main/contact/', config)
    if (res.statusText && res.statusText === 'OK') {
        console.log(res)
        const contacts=res.data.value.contacts;
        dispatch(addContactsList(contacts))
        
    }
}
export const fetchUserProfileData = async (dispatch:any) => {
    const token = localStorage.getItem('token')
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const res = await callApi().get('/main/user/profile', config)
    if (res.statusText && res.statusText === 'OK') {
        console.log(res)
        const user=res.data.value.profile;
        dispatch(addUserInfo(user))
    }
}

export const fetchUserChatList = async (dispatch:any,userId:string,contactList:any) => {
    console.log(contactList)
    const token = localStorage.getItem('token')
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const findContact=(contactId:any)=>{
        let contact={}
        console.log(contactId)
        for(let i=0;i<contactList.length;i++){
            if(contactList[i]._id==contactId){
                contact=contactList[i]
                console.log(contact)
                break;
            }
        }
        return contact;
    }
    const contactChatList=(chatBox:any)=>{
        let contact={}
        if(chatBox.memberIds[0]==userId){
            contact=findContact(chatBox.memberIds[1])
            console.log(contact)
        }
        else{
            contact=findContact(chatBox.memberIds[0])
            console.log(contact)
        }
        
        return contact;
    }
    const res = await callApi().get('/main/chat/', config)
    if (res.statusText && res.statusText === 'OK') {
        console.log(res)
        const chatList=res.data.value.chats;
        
        for(let i=0;i<chatList.length;i++){
            let contact=contactChatList(chatList[i]);
            let chat={
                contact:contact,
                _id:chatList[i]._id,
                lastMessage:chatList[i].messages[0].content.text,
                lastMessageTime:chatList[i].updatedAt
            }
            dispatch(addChat(chat))
        }
        // dispatch(addChatList(chatList))
    }
}

