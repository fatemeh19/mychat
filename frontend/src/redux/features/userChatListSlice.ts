import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface chatInfoInterface {
    _id: string,
    name: string,
    profilePic: string,
    status: {
        online: boolean,
        lastseen: string | Date | number
    },
}
interface chatBoxInterface {
    _id: string,
    lastMessage: string,
    lastMessageTime: string,
    chatInfo: chatInfoInterface,
    open: boolean,
    chatType: string
}
interface initialStateInterface {
    chatList: chatBoxInterface[],
    privateChatList: chatBoxInterface[],
    groupChatList: chatBoxInterface[],
}

const initialState = {
    chatList: [],
    privateChatList: [],
    groupChatList: []
} as initialStateInterface

export const contactSlice = createSlice({
    name: "chatList",
    initialState,
    reducers: {
        addChat: (state, action: PayloadAction<any>) => {
            state.chatList[state.chatList.length] = action.payload
        },
        addGroupTopList: (state, action: PayloadAction<any>) => {
            state.chatList = [action.payload].concat(state.chatList)
        },
        addChatList: (state, action: PayloadAction<any>) => {
            state.chatList = action.payload
        },
        addChatToTop: (state, action: PayloadAction<any>) => {
            const element = state.chatList.splice(action.payload, 1)[0]
            console.log("chat list after state.chatList.splice(action.payload,1): ", state.chatList)
            state.chatList.splice(state.chatList.length, 0, element)
        },
        openHandle: (state, action: PayloadAction<any>) => {
            state.chatList[action.payload].open = !(state.chatList[action.payload].open);
        },
        addPrivateChat: (state, action: PayloadAction<any>) => {
            state.privateChatList[state.privateChatList.length] = action.payload
        },
        addGroupChat: (state, action: PayloadAction<any>) => {
            state.groupChatList[state.groupChatList.length] = action.payload
        },
    },
});

export const {
    addChat,
    addGroupTopList,
    addChatList,
    addChatToTop,
    openHandle,
    addPrivateChat,
    addGroupChat
} = contactSlice.actions;
export default contactSlice.reducer;