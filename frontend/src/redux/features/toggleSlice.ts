import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateInterface {
    Toggle: boolean,
    ShowConfirm: boolean
}

const initialState = {
    Toggle: false,
    ShowConfirm: false
} as initialStateInterface

export const selectedMessageSlice = createSlice({
    name: "toggle",
    initialState,
    reducers: {
        setToggle: (state, action: PayloadAction<boolean>) => {
            state.Toggle = action.payload
        }
    },
});

export const {
    setToggle,
} = selectedMessageSlice.actions;
export default selectedMessageSlice.reducer;