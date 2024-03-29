import { profilePicInterface } from "@/src/models/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface contactInterface {
    _id: string,
    name: string,
    profilePic: profilePicInterface,
    status: {
        online: boolean,
        lastseen: string | Date | number
    },
}
interface initialStateInterface {
    contacts: contactInterface[]
}

const initialState = {
    contacts: []
} as initialStateInterface

export const contactSlice = createSlice({
    name: "Contacts",
    initialState,
    reducers: {
        addContactsList: (state, action: PayloadAction<any>) => {
            state.contacts = action.payload
        },
    },
});

export const {
    addContactsList
} = contactSlice.actions;
export default contactSlice.reducer;