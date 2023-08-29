import { profilePicInterface } from "@/src/models/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserInterface {
    name: string,
    lastname: string,
    phoneNumber: string,
    username: string,
    profilePic: profilePicInterface,
    email: string,
    _id: string,
    pinnedChats: any[]
}
interface initialStateInterface {
    User: UserInterface
}

const initialState = {
    User: {}
} as initialStateInterface

export const UserSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        addUserInfo: (state, action: PayloadAction<any>) => {
            state.User = action.payload
            // console.log('action : ', action)
        },
        updateUserProfilePic: (state, action: PayloadAction<profilePicInterface>) => {
            state.User.profilePic = action.payload
            // console.log('action : ', action)
        },
        updateUserProfileInfo: (state, action: PayloadAction<{ name: string, lastname: string, phoneNumber: string, username: string }>) => {
            state.User.name = action.payload.name
            state.User.lastname = action.payload.lastname
            state.User.phoneNumber = action.payload.phoneNumber
            state.User.username = action.payload.username
            // console.log('action : ', action)
        },
    },
});

export const {
    addUserInfo,
    updateUserProfilePic,
    updateUserProfileInfo
} = UserSlice.actions;
export default UserSlice.reducer;