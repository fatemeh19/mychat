import { recievedMessageInterface } from "@/src/models/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateInterface {
    SelectedMessages: string[],
    activeSelection: boolean
}

const initialState = {
    SelectedMessages: [],
    activeSelection: false
} as initialStateInterface

export const selectedMessageSlice = createSlice({
    name: "SelectedMessages",
    initialState,
    reducers: {
        addSelectMessage: (state, action: PayloadAction<string>) => {
            state.SelectedMessages.push(action.payload)
        },
        removeSelectMessage: (state, action: PayloadAction<any>) => {
            console.log('action.payload : ', action.payload)
            state.SelectedMessages = action.payload
        },
        setActiveSelection: (state, action: PayloadAction<boolean>) => {
            state.activeSelection = action.payload
        }
    },
});

export const {
    addSelectMessage,
    removeSelectMessage,
    setActiveSelection
} = selectedMessageSlice.actions;
export default selectedMessageSlice.reducer;