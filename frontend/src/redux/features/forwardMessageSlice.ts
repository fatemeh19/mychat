import { recievedMessageInterface } from "@/src/models/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateInterface {
    isForward: boolean,
    forwardMessageIds: string[],
    content: recievedMessageInterface,
}

// @ts-ignore
const initialState = {
    isForward: false,
    forwardMessageIds: [],
    content: {},
} as initialStateInterface


export const ForwardMessageSlice = createSlice({
    name: "replyMessage",
    initialState,
    reducers: {
        setIsForward: (state, action: PayloadAction<boolean>) => {
            state.isForward = action.payload
        },
        setForwardMessageIds: (state, action: PayloadAction<string[]>) => {
            state.forwardMessageIds = action.payload
        },
        setForwardContent: (state, action: PayloadAction<any>) => {
            state.content = action.payload
        },
    },
});

export const {
    setIsForward,
    setForwardMessageIds,
    setForwardContent
} = ForwardMessageSlice.actions;
export default ForwardMessageSlice.reducer;