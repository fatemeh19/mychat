import mongoose from "mongoose";
import { messageType } from "../utils/enums.js";
const MessageSchema = new mongoose.Schema(
  {
    reply: {
      isReplied: {
        type: Boolean,
        default: false,
      },
      messageId: {
        type: mongoose.Types.ObjectId,
        ref: "Message",
      },
    },
    content: {
      contentType:String,
      url: String,
      originalName:String,
      text: String,
    },
    senderId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    
    
  },
  { timestamps: true }
);

export default mongoose.model("Message", MessageSchema);
