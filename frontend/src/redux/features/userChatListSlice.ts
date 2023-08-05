import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface chatInfoInterface {
    _id : string,
    name: string,
    profilePic: string,
    status:{
        online : boolean,
        lastseen : string | Date | number
    },
}
interface chatBoxInterface {
    _id: string,
    lastMessage: string,
    lastMessageTime: string,
    chatInfo:chatInfoInterface,
    open:boolean
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
        addGroupChat: (state, action: PayloadAction<any>) => {
            state.chatList = [action.payload].concat(state.chatList)
        },
        addChatList: (state, action: PayloadAction<any>) => {
            state.chatList = action.payload
        },
        openHandle: (state, action: PayloadAction<any>) => {
            state.chatList[action.payload].open = !(state.chatList[action.payload].open);
        },
    },
});

export const {
    addChat,
    addGroupChat,
    addChatList,
    openHandle
} = contactSlice.actions;
export default contactSlice.reducer;