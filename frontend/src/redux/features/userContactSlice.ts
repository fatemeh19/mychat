import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ContactInterface {
    _id: string,
    name: string,
    phoneNumber: string,
    profilePic: string,
    status: {
        online: boolean,
        lastseen: string | Date | number
    },
}
interface initialStateInterface {
    Contact: ContactInterface
}

const initialState = {
    Contact: {}
} as initialStateInterface

export const UserSlice = createSlice({
    name: "Contact",
    initialState,
    reducers: {
        addUserContact: (state, action: PayloadAction<any>) => {
            state.Contact = action.payload
            // console.log('action : ', action)
        },
    },
});

export const {
    addUserContact,
} = UserSlice.actions;
export default UserSlice.reducer;