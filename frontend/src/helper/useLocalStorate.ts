"use client"

import { setStorage } from "../redux/features/localStorageSlice";
import { useAppDispatch } from "../redux/hooks";


const UseLocalStorage = () => {
    
    // Perform localStorage action
    let localStorageString = localStorage.getItem('items')
    let localStorageArray = localStorageString?.split(',')
    // @ts-ignore
    let token = localStorageArray[0].slice(1, localStorageArray[0].length)
    // @ts-ignore
    let userId = localStorageArray[1].slice(0, localStorageArray[1].length - 1)
    console.log(token)
    console.log(userId)


    return { token, userId }

}

export default UseLocalStorage;