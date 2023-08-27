import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateInterface {
    Toggle: boolean,
}

const initialState = {
    Toggle: false,
} as initialStateInterface

export const ToggleSlice = createSlice({
    name: "toggle",
    initialState,
    reducers: {
        setToggle: (state, action: PayloadAction<boolean>) => {
            state.Toggle = action.payload
        },
    },
});

export const {
    setToggle,
} = ToggleSlice.actions;
export default ToggleSlice.reducer;