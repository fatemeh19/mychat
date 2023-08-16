import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
      // minLength: [4, "name must be more than 4 characters"],
      // maxLength: [2, "name must be less than 20 characters"],
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "please provide email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please provide password"],
    },
    phoneNumber: {
      type: String,
      //   required: [true, "please provide phoneNumber"],
      // validate: {
      //   validator: validator.isMobilePhone('ir-IR'),
      // },
      unique: true,
    },
    username: {
      type: String,
      // minLength: [10, "username must be more than 10 characters"],
      // maxLength: [20, "username must be less than 20 characters"],
    },
    bio: {
      type: String,
      maxLength: [50, "bio must be less than 50 characters"],
    },
    status: {
      online: Boolean,
      lastseen: Date,
    },
    profilePic: {
      type:mongoose.Types.ObjectId,
      ref:'File'
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isFirstTimeLogin: {
      type: Boolean,
      default: true,
    },
    verificationToken: String,
    verified: Date,
    passwordToken: {
      type: String,
    },
    passwordTokenExpirationDate: {
      type: Date,
    },
    contacts: [
      {
        userId: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        name: {
          type: String,
        },
        lastname: {
          type: String,
        },
        
      },
    ],
    folders: [
      {
        type:mongoose.Types.ObjectId,
        ref:"Folder"
      }
    ],
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
        addedAt:{
          type:Date,
          default:Date.now()
        }
      },
    ],
    pinnedChats: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Chat",
      },
    ],
    settingId:{
      type:mongoose.Types.ObjectId,
      ref:'Setting'
    }
  },
  { timestamps: true }
  
);
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// UserSchema.methods.hashPassowrd = async function(){

// }
// UserSchema.methods.comparePassowrd = async function(password){
//   const isMatch = await bcrypt.compare(password,this.password)
//   return isMatch

// }
UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};
UserSchema.methods.hasThisContact = async function (contact) {
  // let contactNameExists = false
  let contactExists = false;
  this.contacts.forEach((value, index) => {
    if (value.userId.equals(contact.userId)) {
      contactExists = true;
    }
  });
  return { contactExists };
};

export default mongoose.model("User", UserSchema);
