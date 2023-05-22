const mongoose = require("mongoose");
const validator = require("validator");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide name"],
      minLength: [4, "name must be more than 4 characters"],
      maxLength: [20, "name must be less than 20 characters"],
    },
    email: {
      type: String,
    //   required: [true, "please provide email"],
      validate: {
        validator: validator.isEmail,
        message: "please provide valid email",
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please provide password"],
    },
    phoneNumber: {
      type: String,
    //   required: [true, "please provide phoneNumber"],
      validate: {
        validator: validator.isMobilePhone("any"),
      },
      unique: true,
    },
    username: {
      type: String,
      unique: true,
      minLength: [10, "username must be more than 10 characters"],
      maxLength: [20, "username must be less than 20 characters"],
    },
    bio: {
      type: String,
      maxLength: [50, "bio must be less than 50 characters"],
    },
    status: {
      online: Boolean,
      lastseen: Date,
    },
    contacts: [],
    profilePic:{
        type:String,
        Url:String
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    VerificationToken:String,
    verified:Date,
    passwordToken: {
        type: String,
    },
    passwordTokenExpirationDate: {
    type: Date,
    },
  },
  { timestamps: true }
);
