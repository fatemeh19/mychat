
import { ChatType } from "@/src/models/enum";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface recievedMessageInterface {
    _id : string,
    content : {
        contentType : string,
        url : string,
        text : string
    },
    reply : {
        isReplied : boolean
    },
    senderId : string,
    seenIds : string[],
    createdAt : string,
    updatedAt : string,
    __v : number
}

interface chatInterface {
    _id:string,
    memberIds : string[],
    messages : recievedMessageInterface[],
    updatedAt : string,
    __v : number
}
interface initialStateInterface {
    Chat : chatInterface,
    chatType : ChatType,
    firstChat : boolean
}

const initialState = {
    Chat : {},
    chatType : ChatType.Private,
    firstChat : true
} as initialStateInterface

export const ChatSlice = createSlice({
    name: "Chat",
    initialState,
    reducers: {
        addChat: (state, action: PayloadAction<any>) => {
            state.Chat = action.payload
        },
        setChatType: (state, action: PayloadAction<ChatType>) => {
            state.chatType = action.payload
        },
        setFirstChat : (state, action: PayloadAction<boolean>) => {
            state.firstChat = action.payload
        },
        addMessage: (state, action: PayloadAction<any>) => {
            state.Chat.messages.push(action.payload)
            // console.log('action : ', action)
        },
    },
});

export const {
    addChat,
    setChatType,
    setFirstChat,
    addMessage
} = ChatSlice.actions;
export default ChatSlice.reducer;
