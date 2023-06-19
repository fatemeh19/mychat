import { configureStore, applyMiddleware  } from '@reduxjs/toolkit'
import popUpReducer from './features/popUpSlice'
import localStorageReducer from './features/localStorageSlice'
// ...
export const store = configureStore({
  reducer: {
    popUp: popUpReducer,
    localStorage : localStorageReducer
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
