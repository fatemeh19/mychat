import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface initialStateInterface {
    openChat : Boolean
}

const initialState = {
    openChat : false
} as initialStateInterface

export const OpenChatSlice = createSlice({
    name: "openChat",
    initialState,
    reducers: {
        setOpenChat: (state, action: PayloadAction<any>) => {
            state.openChat = action.payload
            console.log('action : ', action)
        },
    },
});

export const {
    setOpenChat,
} = OpenChatSlice.actions;
export default OpenChatSlice.reducer;