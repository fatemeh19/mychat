"use client"

import { addContactsList } from "../redux/features/userContactListSlice"
import { addUserInfo } from "../redux/features/userInfoSlice"
import { useAppDispatch } from "../redux/hooks"
import callApi from "./callApi"


export const fetchUserContactsListData = async (dispatch:any) => {
    // const dispatch = useAppDispatch()
    const token = localStorage.getItem('token')
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    console.log('get contacts')
    const res = await callApi().get('/main/contact/', config)
    if (res.statusText && res.statusText === 'OK') {
        console.log(res)
        const contacts=res.data.value.contacts;
        dispatch(addContactsList(contacts))
    }
}
export const fetchUserProfileData = async (dispatch:any) => {
    // const dispatch = useAppDispatch()
    const token = localStorage.getItem('token')
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    console.log('get user info')
    const res = await callApi().get('/main/user/profile', config)
    if (res.statusText && res.statusText === 'OK') {
        console.log(res)
        const user=res.data.value.profile;
        dispatch(addUserInfo(user))
    }
}

