import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface folderInterface {
    _id: string,
    name: string
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
            state.folders[state.folders.length - 1] = action.payload
        },
    },
});

export const {
    addFolder,
    addFoldersList
} = folderSlice.actions;
export default folderSlice.reducer;