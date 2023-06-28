import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface messageInterface {
    senderId: string,
    contentType?: string,
    content?: string,
    file?: any,
    // isReplied : boolean,
    // replyId : string
}
interface initialStateInterface {
    messages: messageInterface[]
}

const initialState = {
    messages: []
} as initialStateInterface

export const messageSlice = createSlice({
    name: "Messages",
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<messageInterface>) => {
            state.messages.push(action.payload)
            console.log('action : ', action)
        },
        addAllMessages: (state, action: PayloadAction<any>) => {
            state.messages = action.payload
        }
    },
});

export const {
    addMessage,
    addAllMessages,
} = messageSlice.actions;
export default messageSlice.reducer;