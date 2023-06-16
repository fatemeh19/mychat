const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
      // minLength: [4, "name must be more than 4 characters"],
      // maxLength: [2, "name must be less than 20 characters"],
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
      unique: true,
    },
    username: {
      type: String,
      // unique: true,
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
    profilePic: {
      type: String,
      url: String,
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
      },
    ],
  },
  { timestamps: true }
);
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};
UserSchema.methods.hasThisContactOrName = async function (contact) {
  let contactExists = false
  let contactNameExists = false
  

  this.contacts.forEach((value, index)=>{
    // console.log("value.name = ",value.name)
    // console.log("contact.name = ",contact.name)
    // console.log("value.userId = ",value.userId)
    // console.log("contact.userId = ",contact.userId)
    // console.log("contactNameExists = ",contactNameExists)
    // console.log("contactExists = ",contactExists)
    if(value.name==contact.name){
      
      contactNameExists = true
    }

    if(value.userId.equals(contact.userId)){
      contactExists = true
    }

  })
  return {contactExists,contactNameExists}
};
module.exports = mongoose.model("User", UserSchema);
