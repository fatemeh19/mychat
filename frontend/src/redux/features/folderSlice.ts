import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface folderChatInterface {
    _id: string,
    chatInfo: string,
    pinned: boolean
}
export interface folderInterface {
    _id: string,
    name: string,
    chats: folderChatInterface[],
    pinnedChats: any[],
    numOfChat: number,
    open: boolean
}
interface initialStateInterface {
    folders: folderInterface[]
}

const initialState = {
    folders: []
} as initialStateInterface

export const folderSlice = createSlice({
    name: "Folders",
    initialState,
    reducers: {
        addFoldersList: (state, action: PayloadAction<any>) => {
            state.folders = action.payload
        },
        addFolder: (state, action: PayloadAction<any>) => {
            state.folders.push(action.payload)
        },
        setOpenFolder: (state, action: PayloadAction<any>) => {
            state.folders.map(folder => {
                if (folder._id === action.payload) {
                    folder.open = true
                }
                else {
                    folder.open = false
                }
            })
        },
        setCloseFolders: (state) => {
            state.folders.map(folder => {
                folder.open = false
            })
        },
        editFolder: (state, action: PayloadAction<{ index: number, editedFolder: folderInterface }>) => {
            state.folders[action.payload.index] = action.payload.editedFolder
        }
    },
});

export const {
    addFolder,
    addFoldersList,
    setOpenFolder,
    setCloseFolders,
    editFolder
} = folderSlice.actions;
export default folderSlice.reducer;