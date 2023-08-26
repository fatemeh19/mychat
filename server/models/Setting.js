import mongoose from "mongoose";
import * as consts from "../utils/consts.js";
import * as enums from "../utils/enums.js";
const settingSchema = new mongoose.Schema({
  notificationAndSounds: {
    notifs: {
      type: Boolean,
      default: true,
    },
    sound: {
      type: String,
      default: consts.DEFAULT_NOTIF_SOUND,
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
      lastSeen: {
        type:String,
        enum: enums.privacy,
        default: enums.privacy[0]
      },
      profilePhotos: {
        type:String,
        enum: enums.privacy,
        default: enums.privacy[0]
      },
      addToGroup: {
        type:String,
        enum: enums.privacy,
        default:  enums.privacy[0]
      },
      forwardedMessages: {
        type:String,
        enum: enums.privacy,
        default: enums.privacy[0]
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
