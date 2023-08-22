import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateInterface {
    DropDownValue: string,
}

const initialState = {
    DropDownValue: '',
} as initialStateInterface

export const DropDownSlice = createSlice({
    name: "dropDown",
    initialState,
    reducers: {
        setDropDownValue: (state, action: PayloadAction<string>) => {
            state.DropDownValue = action.payload
        },
    },
});

export const {
    setDropDownValue,
} = DropDownSlice.actions;
export default DropDownSlice.reducer;