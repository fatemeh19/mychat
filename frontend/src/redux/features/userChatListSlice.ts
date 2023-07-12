import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface ContactInterface {
    _id : string,
    name: string,
    profilePic: string,
}
interface chatBoxInterface {
    _id: string,
    lastMessage: string,
    lastMessageTime: string,
    contact:ContactInterface
}
interface initialStateInterface {
    chatList : chatBoxInterface[]
}

const initialState = {
    chatList : []
} as initialStateInterface

export const contactSlice = createSlice({
    name: "chatList",
    initialState,
    reducers: {
        addChat: (state, action: PayloadAction<any>) => {
            state.chatList[state.chatList.length] = action.payload
        },
        addChatList: (state, action: PayloadAction<any>) => {
            state.chatList = action.payload
        },
    },
});

export const {
    addChat,
    addChatList
} = contactSlice.actions;
export default contactSlice.reducer;