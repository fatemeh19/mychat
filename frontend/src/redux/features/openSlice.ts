import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface initialStateInterface {
    openChat: Boolean
}

const initialState = {
    openChat: false
} as initialStateInterface

export const OpenSlice = createSlice({
    name: "open",
    initialState,
    reducers: {
        setOpenChat: (state, action: PayloadAction<any>) => {
            state.openChat = action.payload
        },
    },
});

export const {
    setOpenChat,
} = OpenSlice.actions;
export default OpenSlice.reducer;