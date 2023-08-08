import { recievedMessageInterface } from "@/src/models/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateInterface {
    isForward: boolean,
    forwardMessage: recievedMessageInterface
}

const initialState = {
    isForward: false,
    forwardMessage: {}
} as initialStateInterface

export const ForwardMessageSlice = createSlice({
    name: "replyMessage",
    initialState,
    reducers: {
        setIsForward: (state, action: PayloadAction<boolean>) => {
            state.isForward = action.payload
        },
        setForwardMessage: (state, action: PayloadAction<recievedMessageInterface>) => {
            state.forwardMessage = action.payload
        }
    },
});

export const {
    setIsForward,
    setForwardMessage
} = ForwardMessageSlice.actions;
export default ForwardMessageSlice.reducer;