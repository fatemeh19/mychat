import mongoose from "mongoose";
import { messageType } from "../utils/enums.js";
const MessageSchema = new mongoose.Schema(
  {
    content: {
      contectType: {
        type: String,
        enum: messageType,
      },
      url:String,
      text:String,
    },
    senderId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    seenIds: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Message", MessageSchema);
