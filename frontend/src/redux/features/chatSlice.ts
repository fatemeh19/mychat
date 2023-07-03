
import { ChatType } from "@/src/models/enum";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface messageInterface {
//     content : {
//         contentType : string,
//         text : string
//     },
//     senderId : string
// }

interface chatInterface {
    _id:string,
    memberIds : string[],
    messages : [],
    updatedAt : string,
    __v : number
}
interface initialStateInterface {
    Chat : chatInterface,
    chatType : ChatType
}

const initialState = {
    Chat : {},
    chatType : ChatType.Private
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
    },
});

export const {
    addChat,
    setChatType
} = ChatSlice.actions;
export default ChatSlice.reducer;