import { configureStore } from '@reduxjs/toolkit'
import completeInfoReducer from './features/completeInfoSlice'
// ...
export const store = configureStore({
  reducer: {
    completeInfo: completeInfoReducer
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
