import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface contactInterface {
    _id: string,
    name: string,
    profilePic: string,
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
        addContact: (state, action: PayloadAction<any>) => {
            state.contacts[state.contacts.length] = action.payload
        },
        addContactsList: (state, action: PayloadAction<any>) => {
            state.contacts = action.payload
        },
    },
});

export const {
    addContact,
    addContactsList
} = contactSlice.actions;
export default contactSlice.reducer;