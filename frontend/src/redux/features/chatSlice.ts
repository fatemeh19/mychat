
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
}

const initialState = {
    Chat : {},
} as initialStateInterface

export const ChatSlice = createSlice({
    name: "Chat",
    initialState,
    reducers: {
        addChat: (state, action: PayloadAction<any>) => {
            state.Chat = action.payload
            
            console.log('Chat action : ', action)
        },
    },
});

export const {
    addChat,
} = ChatSlice.actions;
export default ChatSlice.reducer;