"use client"

import { addChat, addChatList } from "../redux/features/userChatListSlice"
import { addContactsList } from "../redux/features/userContactListSlice"
import { addUserInfo } from "../redux/features/userInfoSlice"
import callApi from "./callApi"

const token = localStorage.getItem('token')
const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
};


export const fetchUserContactsListData = async (dispatch:any) => {
    
    const res = await callApi().get('/main/contact/', config)
    if (res.statusText && res.statusText === 'OK') {
        const contacts = res.data.value.contacts;
        console.log(contacts)
        dispatch(addContactsList(contacts))
    }

}


export const fetchUserProfileData = async (dispatch:any) => {
    
    dispatch(addUserInfo(await userHandler()))
    
}

export const fetchUserChatList = async (dispatch:any) => {
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
        let user=await userHandler();
        
        if(chatBox.memberIds[0]==user._id){
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
        console.log(chatList)
        dispatch(addChatList([]))
        console.log(chatList)
        for(let i=0;i<chatList.length;i++){
            let contact={}
            contact=await contactChatList(chatList[i])
            console.log(contact)
            let lastMessage=''
            if(chatList[i].messages[0]!=null){
                lastMessage=chatList[i].messages[0].content.text
            }
            let chat={
                contact: contact,
                _id:chatList[i]._id,
                lastMessage:lastMessage,
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
export const userHandler=async ()=>{
    let user;
    const res = await callApi().get('/main/user/profile', config)
    if (res.statusText && res.statusText === 'OK') {
        user = res.data.value.profile;
            
    }
    return user;
}