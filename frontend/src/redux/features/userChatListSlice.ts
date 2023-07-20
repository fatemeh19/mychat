import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface ContactInterface {
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
    contact:ContactInterface,
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
    addChatList,
    openHandle
} = contactSlice.actions;
export default contactSlice.reducer;