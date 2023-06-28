import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface contactInterface {
    name: string,
    phoneNumber: string,
    profilePic: string,
}
interface initialStateInterface {
    contacts : contactInterface[]
}

const initialState = {
    contacts : []
} as initialStateInterface

export const contactSlice = createSlice({
    name: "Contacts",
    initialState,
    reducers: {
        addContact: (state, action: PayloadAction<any>) => {
            state.contacts[state.contacts.length] = action.payload
            console.log('action : ', action)
        },
        addContactsList: (state, action: PayloadAction<any>) => {
            state.contacts = action.payload
            console.log('action : ', action)
        },
    },
});

export const {
    addContact,
    addContactsList
} = contactSlice.actions;
export default contactSlice.reducer;