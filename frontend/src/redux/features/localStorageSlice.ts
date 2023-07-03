import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type storageFace = {
    token: string,
    userId: string,
  };
  
  const initialState = {
    token: '',
    userId: '',
  } as storageFace;
  

export const localStorageSlice = createSlice({
  name: "localStorage",
  initialState,
  reducers: {
    setStorage: (state, action: PayloadAction<storageFace>) => {
      // console.log('action : ', action)

      state.token = action.payload.token
      state.userId = action.payload.userId
    },
  },
});

export const {
    setStorage,
} = localStorageSlice.actions;
export default localStorageSlice.reducer;