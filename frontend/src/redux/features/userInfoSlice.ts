import { profilePicInterface } from "@/src/models/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserInterface {
    name: string,
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
    },
});

export const {
    addUserInfo,
} = UserSlice.actions;
export default UserSlice.reducer;