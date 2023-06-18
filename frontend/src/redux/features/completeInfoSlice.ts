import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type infoFace = {
  img: string | ArrayBuffer | null,
  name: string,
  phone: string
};

const initialState = {
  img: '',
  name: '',
  phone: ''
} as infoFace;

export const completeInfoSlice = createSlice({
  name: "completeInfo",
  initialState,
  reducers: {
    setInfo: (state, action: PayloadAction<{ img: string | ArrayBuffer | null, name: string, phone: string }>) => {
      console.log('action : ', action)

      state.img = action.payload.img
      state.name = action.payload.name
      state.phone = action.payload.phone
    },
  },
});

export const {
  setInfo,
} = completeInfoSlice.actions;
export default completeInfoSlice.reducer;