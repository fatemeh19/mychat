
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatType } from "@/src/models/enum";
import { recievedMessageInterface } from "@/src/models/interface";

// باید به اطلاعات چند نوع چت هم اضافه بشه که از سمت سرور گرفته میشه
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
