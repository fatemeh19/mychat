import mongoose from "mongoose";

const FolderSchema = new mongoose.Schema({
  name: String,
  chats: [
    {
      pinned: {
        type: Boolean,
        default: false,
      },
      chatInfo: {
        type: mongoose.Types.ObjectId,
        ref: "Chat",
      },
    },
  ],
  pinnedChats: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Chat",
    },
  ],
});

export default mongoose.model('Folder',FolderSchema)
