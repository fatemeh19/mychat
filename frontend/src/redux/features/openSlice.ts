import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface initialStateInterface {
    openChat: boolean,
    openPinSectin: boolean,
    openPermissions: boolean,
    openExceptions: boolean
}

const initialState = {
    openChat: false,
    openPinSectin: false,
    openPermissions: false,
    openExceptions: false
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
        setOpenExceptions: (state, action: PayloadAction<boolean>) => {
            state.openExceptions = action.payload
        }
    },
});

export const {
    setOpenChat,
    setOpenPinSection,
    setOpenPermissions,
    setOpenExceptions
} = OpenSlice.actions;
export default OpenSlice.reducer;