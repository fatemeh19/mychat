import { ChatType, SearchType } from "@/src/models/enum";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface searchChatInterface {
    _id: string,
    chatType: ChatType,
    membersInfo: string,
    name: string,
}

interface senderInterface {
    lastname: string,
    name: string,
    profilePic: string
}

interface searchMessageInterface {
    _id: string,
    content: {
        text: string
    },
    senderInfo: senderInterface[],
    createdAt: string,
}

interface initialStateInterface {
    searchType: SearchType,
    isSearch: boolean,
    searchedChats: searchChatInterface[]
    searchedMessages: searchMessageInterface[]
}

const initialState = {
    searchType: SearchType.chats,
    isSearch: false,
    searchedChats: [],
    searchedMessages: []
} as initialStateInterface

export const SearchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchType: (state, action: PayloadAction<SearchType>) => {
            state.searchType = action.payload
        },
        setIsSearch: (state, action: PayloadAction<boolean>) => {
            state.isSearch = action.payload
        },
        setSearchedChats: (state, action: PayloadAction<searchChatInterface[]>) => {
            state.searchedChats = action.payload
        },
        setSearchedMessages: (state, action: PayloadAction<searchMessageInterface[]>) => {
            state.searchedMessages = action.payload
        },
    },
});

export const {
    setSearchType,
    setIsSearch,
    setSearchedChats,
    setSearchedMessages
} = SearchSlice.actions;
export default SearchSlice.reducer;