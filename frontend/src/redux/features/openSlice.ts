import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface initialStateInterface {
    openChat: boolean,
    openPinSectin: boolean
}

const initialState = {
    openChat: false,
    openPinSectin: false
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
        }
    },
});

export const {
    setOpenChat,
    setOpenPinSection
} = OpenSlice.actions;
export default OpenSlice.reducer;