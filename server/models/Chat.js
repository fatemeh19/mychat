import mongoose, { mongo } from "mongoose";

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
  },
  { timestamps: true }
);

export default mongoose.model('Chat', ChatSchema)
