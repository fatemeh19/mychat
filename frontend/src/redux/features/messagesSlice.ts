import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface messageInterface {
    content : {
        contentType : string,
        text : string
    },
    senderId : string
}

interface initialStateInterface {
    Messages: messageInterface[]
}

const initialState = {
    Messages: []
} as initialStateInterface

export const messageSlice = createSlice({
    name: "Messages",
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<messageInterface>) => {
            state.Messages.push(action.payload)
            console.log('action : ', action)
        },
        addAllMessages: (state, action: PayloadAction<any>) => {
            state.Messages = action.payload
        }
    },
});

export const {
    addMessage,
    addAllMessages,
} = messageSlice.actions;
export default messageSlice.reducer;