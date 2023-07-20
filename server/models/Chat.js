import mongoose from "mongoose";
import { chatType } from "../utils/enums.js";
import { boolean } from "yup";

const ChatSchema = new mongoose.Schema(
  {
    
    memberIds: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Message",
      },
    ],
    chatType: {
      type:String,
      enum:chatType,
    },
    notifications: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Chat", ChatSchema);
