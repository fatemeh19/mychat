import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface initialStateInterface {
    openChat: boolean,
    openPinSectin: boolean,
    openPermissions: boolean
}

const initialState = {
    openChat: false,
    openPinSectin: false,
    openPermissions: false
} as initialStateInterface

export const OpenSlice = createSlice({
    name: "open",
    initialState,
    reducers: {
        setOpenChat: (state, action: PayloadAction<any>) => {
            state.openChat = action.payload
        },
        setOpenPinSection: (state, action: PayloadAction<boolean>) => {
            state.openPinSectin = action.payload
        },
        setOpenPermissions: (state, action: PayloadAction<boolean>) => {
            state.openPermissions = action.payload
        },
    },
});

export const {
    setOpenChat,
    setOpenPinSection,
    setOpenPermissions
} = OpenSlice.actions;
export default OpenSlice.reducer;