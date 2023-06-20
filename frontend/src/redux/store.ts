import { configureStore, applyMiddleware  } from '@reduxjs/toolkit'
import popUpReducer from './features/popUpSlice'
import localStorageReducer from './features/localStorageSlice'
import userReducer from './features/userSlice'
// ...
export const store = configureStore({
  reducer: {
    popUp: popUpReducer,
    localStorage : localStorageReducer,
    User : userReducer
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
