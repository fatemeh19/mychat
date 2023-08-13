import { configureStore } from '@reduxjs/toolkit'
import popUpReducer from './features/popUpSlice';
import localStorageReducer from './features/localStorageSlice';
import userContactReducer from './features/userContactSlice';
import openReducer from './features/openSlice';
import userContactListReducer from './features/userContactListSlice';
import userChatListReducer from './features/userChatListSlice';
import userInfoReducer from './features/userInfoSlice';
import selectedMessagesReducer from './features/selectedMessagesSlice';
import chatReducer from './features/chatSlice'
import socketReducer from './features/socketSlice';
import chatOpenInListReducer from './features/chatOpenInListSlice';
import toggleReducer from './features/toggleSlice'
import repledMessageReducer from './features/repliedMessageSlice'
import foldersReducer from './features/folderSlice'
import forwardMessageReducer from './features/forwardMessageSlice'
// ...
export const store = configureStore({
  reducer: {
    popUp: popUpReducer,
    localStorage: localStorageReducer,
    userContact: userContactReducer,
    open: openReducer,
    chatOpenInList: chatOpenInListReducer,
    userContactsList: userContactListReducer,
    userChatList: userChatListReducer,
    userInfo: userInfoReducer,
    selectedMessage: selectedMessagesReducer,
    chat: chatReducer,
    socket: socketReducer,
    toggle: toggleReducer,
    repledMessage: repledMessageReducer,
    folders: foldersReducer,
    forwardMessage: forwardMessageReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
