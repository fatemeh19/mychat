import mongoose from "mongoose";
import Chat from './Chat.js'
const privateChatSchema = new mongoose.Schema({

})

export default Chat.discriminator("privateChat",privateChatSchema,"chats")