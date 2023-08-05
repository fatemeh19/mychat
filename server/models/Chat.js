import mongoose from "mongoose";
import { chatType } from "../utils/enums.js";
import { boolean } from "yup";
import { mongo } from "mongoose";

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
        pinStat:{
          pinned:{
            type:Boolean,
            default:false
          },
          by:{
            type:mongoose.Types.ObjectId,
            ref:'User'
          }
        },
        messageId: {
          type: mongoose.Types.ObjectId,
          ref: "Message",
        },
        forwarded: {
          isForwarded: {
            type: Boolean,
            default: false,
          },
          by:{
            type:mongoose.Types.ObjectId,
            ref:'User'
          }
        },
        seenIds: [
          {
            type: mongoose.Types.ObjectId,
            ref: "User",
            
          },
        ],
        deletedIds: [
          {
            type: mongoose.Types.ObjectId,
            ref: "User",
          },
        ],
        
      },
    ],
    chatType: {
      type: String,
      enum: chatType,
    },
    notifications: {
      type: Boolean,
      default: true,
    },
    pinnedMessages:[{
      type:mongoose.Types.ObjectId,
      ref:'Message'
    }]
  },
  { timestamps: true }
);

export default mongoose.model("Chat", ChatSchema);
