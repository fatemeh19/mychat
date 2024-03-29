import mongoose from "mongoose";
import * as consts from "../utils/consts.js";
import * as enums from "../utils/enums.js";
const settingSchema = new mongoose.Schema({
  notificationAndSounds: {
    notifs: {
      type: Boolean,
      default: true,
    },
  },
  privacyAndSecurity: {
    security: {
      blockedUsers: [
        {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    privacy: {
      phoneNumber: {
        type:String,
        enum: enums.privacy,
        default: enums.privacy[0],
      },
      lastseen: {
        type:String,
        enum: enums.privacy,
        default: enums.privacy[0]
      },
      profilePic: {
        type:String,
        enum: enums.privacy,
        default: enums.privacy[0]
      },
      addToGroup: {
        type:String,
        enum: enums.privacy,
        default:  enums.privacy[0]
      },
      
    }, 
  },
  chatSetting: {
    background: {
      type: String,
      default: consts.DEFAULT_BACKGROUND_PICTURE,
    },
    theme: {
      type:String,
      enum: enums.themes,
      default: enums.themes[0],
    },
  },
});

export default mongoose.model("Setting", settingSchema);
