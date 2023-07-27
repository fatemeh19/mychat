import { recievedMessageInterface } from "@/src/models/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateInterface {
    ShowReply: boolean,
    RepliedMessage: recievedMessageInterface
}

const initialState = {
    ShowReply: false,
    RepliedMessage: {}
} as initialStateInterface

export const RepliedMessageSlice = createSlice({
    name: "replyMessage",
    initialState,
    reducers: {
        setShowReply: (state, action: PayloadAction<boolean>) => {
            state.ShowReply = action.payload
        },
        setRepliedMessage: (state, action: PayloadAction<recievedMessageInterface>) => {
            state.RepliedMessage = action.payload
        }
    },
});

export const {
    setShowReply,
    setRepliedMessage
} = RepliedMessageSlice.actions;
export default RepliedMessageSlice.reducer;