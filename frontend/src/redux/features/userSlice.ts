import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInterface {
    name: string,
    phoneNumber: string,
    profilePic: string
}
interface initialStateInterface {
    User : UserInterface
}

const initialState = {
    User : {}
} as initialStateInterface

export const UserSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<any>) => {
            state.User = action.payload
            console.log('action : ', action)
        },
    },
});

export const {
    addUser,
} = UserSlice.actions;
export default UserSlice.reducer;