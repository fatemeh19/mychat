import { configureStore, applyMiddleware  } from '@reduxjs/toolkit'
import popUpReducer from './features/popUpSlice';
import localStorageReducer from './features/localStorageSlice';
import userContactReducer from './features/userContactSlice';
import openChatReducer from './features/openChatSlice';
import userContactListReducer from './features/userContactListSlice';
import userInfoReducer from './features/userInfoSlice';
import messagesReducer from './features/messagesSlice'
// ...
export const store = configureStore({
  reducer: {
    popUp: popUpReducer,
    localStorage : localStorageReducer,
    userContact : userContactReducer,
    openChat: openChatReducer,
    userContactsList : userContactListReducer,
    userInfo: userInfoReducer,
    message : messagesReducer
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
