import { ChatType, SearchType } from "@/src/models/enum";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface searchChatInterface {
    _id: string,
    chatType: ChatType,
    membersInfo: string,
    name: string,
}

interface initialStateInterface {
    searchType: SearchType,
    isSearch: boolean,
    searchedChats: searchChatInterface[]
}

const initialState = {
    searchType: SearchType.chats,
    isSearch: false,
    searchedChats: []
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
        }
    },
});

export const {
    setSearchType,
    setIsSearch,
    setSearchedChats
} = SearchSlice.actions;
export default SearchSlice.reducer;