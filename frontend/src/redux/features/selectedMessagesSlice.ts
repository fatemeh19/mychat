import { recievedMessageInterface } from "@/src/models/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateInterface {
    SelectedMessages: string[],
    SelectedMessagesMainIds: string[],
    activeSelection: boolean,
    selectedMessagesContent: recievedMessageInterface[]
}

const initialState = {
    SelectedMessages: [],
    SelectedMessagesMainIds: [],
    activeSelection: false,
    selectedMessagesContent: []
} as initialStateInterface

export const selectedMessageSlice = createSlice({
    name: "SelectedMessages",
    initialState,
    reducers: {
        addSelectMessage: (state, action: PayloadAction<string>) => {
            state.SelectedMessages.push(action.payload)
        },
        removeSelectMessage: (state, action: PayloadAction<any>) => {
            state.SelectedMessages = action.payload
        },
        addSelectedMessagesMainIds: (state, action: PayloadAction<string>) => {
            state.SelectedMessagesMainIds.push(action.payload)
        },
        removeSelectedMessagesMainIds: (state, action: PayloadAction<any>) => {
            state.SelectedMessagesMainIds = action.payload
        },
        setActiveSelection: (state, action: PayloadAction<boolean>) => {
            state.activeSelection = action.payload
        },
        addSelectedMessagesContent: (state, action: PayloadAction<recievedMessageInterface>) => {
            state.selectedMessagesContent.push(action.payload)
        },
        removeSelectMessageContent: (state, action: PayloadAction<recievedMessageInterface[]>) => {
            state.selectedMessagesContent = action.payload
        },
    },
});

export const {
    addSelectMessage,
    removeSelectMessage,
    setActiveSelection,
    addSelectedMessagesContent,
    removeSelectMessageContent,
    addSelectedMessagesMainIds,
    removeSelectedMessagesMainIds
} = selectedMessageSlice.actions;
export default selectedMessageSlice.reducer;