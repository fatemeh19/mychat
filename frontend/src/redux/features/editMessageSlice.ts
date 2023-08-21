import { recievedMessageInterface } from "@/src/models/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateInterface {
    isEdit: boolean,
    editedMessageId: recievedMessageInterface,
}

// @ts-ignore
const initialState = {
    isEdit: false,
    editedMessageId: {},
} as initialStateInterface


export const EditMessageSlice = createSlice({
    name: "editMessage",
    initialState,
    reducers: {
        setIsEdit: (state, action: PayloadAction<boolean>) => {
            state.isEdit = action.payload
        },
        setEditedMessage: (state, action: PayloadAction<recievedMessageInterface>) => {
            state.editedMessageId = action.payload
        },
    },
});

export const {
    setIsEdit,
    setEditedMessage,
} = EditMessageSlice.actions;
export default EditMessageSlice.reducer;