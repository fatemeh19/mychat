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
      text: String,
      file:{
        type:mongoose.Types.ObjectId,
        ref:'File'
      }
    },
    senderId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    edited:{
      type:Boolean,
      default:false
    }
    
  },
  { timestamps: true }
);

export default mongoose.model("Message", MessageSchema);
