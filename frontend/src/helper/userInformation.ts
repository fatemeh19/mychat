"use client"

import { addChat } from "../redux/features/userChatListSlice"
import { addContactsList } from "../redux/features/userContactListSlice"
import { addUserInfo } from "../redux/features/userInfoSlice"
import callApi from "./callApi"


export const fetchUserContactsListData = async (dispatch:any) => {
    const token = localStorage.getItem('token')
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const res = await callApi().get('/main/contact/', config)
    if (res.statusText && res.statusText === 'OK') {
        const contacts = res.data.value.contacts;
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
        const user = res.data.value.profile;
        dispatch(addUserInfo(user))
    }
}

export const fetchUserChatList = async (dispatch:any) => {
    
    const token = localStorage.getItem('token')
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    
    const findContact=async (contactId:any)=>{
        let contact={}
        let contactList=[]
        const res1 = await callApi().get('/main/contact/', config)
        if (res1.statusText && res1.statusText === 'OK') {
            contactList= res1.data.value.contacts;
            
        }
        for(let i=0;i<contactList.length;i++){
            if(contactList[i]._id==contactId){
                contact=contactList[i]
                console.log("fond")
                break;
            }
        }
        return contact;
       
    }
    const contactChatList=async (chatBox:any)=>{
        let contact={}
        let userId;
        const res = await callApi().get('/main/user/profile', config)
        if (res.statusText && res.statusText === 'OK') {
            userId = res.data.value.profile._id;
            
        }
        if(chatBox.memberIds[0]==userId){
            contact=await findContact(chatBox.memberIds[1])
        }
        else{
            contact=await findContact(chatBox.memberIds[0])
        }
        
        return contact;
    }
    const res = await callApi().get('/main/chat/', config)
    if (res.statusText && res.statusText === 'OK') {
        console.log(res)
        const chatList=res.data.value.chats;
        
        for(let i=0;i<chatList.length;i++){
            let contact={}
            contact=await contactChatList(chatList[i])
            console.log(contact)
            let chat={
                contact: contact,
                _id:chatList[i]._id,
                lastMessage:chatList[i].messages[0].content.text,
                lastMessageTime:chatList[i].updatedAt,
                open:false
            }
            dispatch(addChat(chat))
            
        }
    }
}

export const profilePicNameHandler=(user:any)=>{
    const profilePicName = user.profilePic ? (user.profilePic).split(`\\`) : '';
    return profilePicName[profilePicName.length - 1];
}