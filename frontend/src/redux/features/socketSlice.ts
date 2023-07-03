import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Socket, io,  } from "socket.io-client";

interface socketInterface {
    Socket : Socket
}
// @ts-ignore
const initialState = {
    Socket : io('http://localhost:3000')
} as socketInterface


const SocketSlice = createSlice({
    name : 'socket',
    initialState,
    reducers: {
        addSocket : (state, action:PayloadAction<Socket>) => {
            // @ts-ignore
            state.Socket = action.payload
        }
    }
})


export const {
    addSocket
} = SocketSlice.actions

export default SocketSlice.reducer