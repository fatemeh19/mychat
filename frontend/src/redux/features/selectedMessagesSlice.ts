import { recievedMessageInterface } from "@/src/models/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateInterface {
    SelectedMessages: recievedMessageInterface[]
}

const initialState = {
    SelectedMessages: []
} as initialStateInterface

export const selectedMessageSlice = createSlice({
    name: "SelectedMessages",
    initialState,
    reducers: {
        addSelectMessage: (state, action: PayloadAction<recievedMessageInterface>) => {
            state.SelectedMessages.push(action.payload)
        },
        removeSelectMessage: (state, action: PayloadAction<any>) => {
            console.log('action.payload : ', action.payload)
            // const filterd = state.SelectedMessages.filter(msg => {
            //     // msg._id === action.payload
            // })
            // console.log(filterd)
            state.SelectedMessages = action.payload
        }
    },
});

export const {
    addSelectMessage,
    removeSelectMessage
} = selectedMessageSlice.actions;
export default selectedMessageSlice.reducer;