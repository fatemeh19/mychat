import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    open: false
};

export const PopUpSlice = createSlice({
    name: "PopUp",
    initialState,
    reducers: {
        setOpen: (state, action: PayloadAction<boolean>) => {
            state.open = action.payload
            // console.log('action : ', action)
        },
    },
});

export const {
    setOpen,
} = PopUpSlice.actions;
export default PopUpSlice.reducer;