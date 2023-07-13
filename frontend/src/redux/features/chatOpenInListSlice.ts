import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface initialStateInterface {
    chatOpenInList : Boolean
}

const initialState = {
    chatOpenInList : false
} as initialStateInterface

export const OpenChatSlice = createSlice({
    name: "chatOpenInList",
    initialState,
    reducers: {
        setChatOpenInList: (state, action: PayloadAction<any>) => {
            state.chatOpenInList = action.payload
            // console.log('action : ', action)
        },
    },
});

export const {
    setChatOpenInList,
} = OpenChatSlice.actions;
export default OpenChatSlice.reducer;