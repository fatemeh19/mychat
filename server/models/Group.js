import mongoose, { Mongoose, mongo } from "mongoose";
import Chat from "./Chat.js";
import { groupType } from "../utils/enums.js";
import { string } from "yup";
const GroupChatSchema = new mongoose.Schema({
  groupTypeSetting: {
    groupType: {
      type: String,
      enum: groupType,
      default: "private",
    },
    url: String,
    restrictSavingContent: {
      type: Boolean,
      default: false,
    },
    approveNewMembers: {
      type: Boolean,
      default: false,
    },
  },
  name: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
  },
  description: {
    type: String,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // inviteLink:{

  //   createdLinks:[
  //     {
  //       creator:{
  //         type:mongoose.Types.ObjectId,
  //         ref:'User'
  //       },
  //       link: String,
  //       expireDate: Date,
  //     },

  //   ]
  // },
  inviteLinks: [
    {
      creator: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
      link: String,
      expireDate: Date,
    },
  ],
  adminRights: [
    {
      adminId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
      rights: {
        changeGroupInfo: {
          type: Boolean,
          default: true,
        },
        deleteMessages: {
          type: Boolean,
          default: true,
        },
        banUsers: {
          type: Boolean,
          default: true,
        },
        inviteUsersViaLink: {
          type: Boolean,
          default: true,
        },
        pinMessages: {
          type: Boolean,
          default: true,
        },
        manageVideoChats: {
          type: Boolean,
          default: true,
        },
        remainAnonymous: {
          type: Boolean,
          default: false,
        },
        addNewAdmins: {
          type: Boolean,
          default: true,
        },
      },
    },
  ],
});
export default Chat.discriminator("GroupChat", GroupChatSchema, "chats");
