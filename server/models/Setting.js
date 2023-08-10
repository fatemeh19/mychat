import mongoose from "mongoose";

const settingSchema = new mongoose.Schema({
    notifocationAndSounds:{
        notifs:{
            type:Boolean,
            default:true
        },
        sound:{
            type:String,
            default:"default sound path"
        },    
    },
    privacyAndSecurity:{
        security:{
            blockedUsers:[{
                type:mongoose.Types.ObjectId,
                ref:'User'
            }]
        },
        privacy:{
            phoneNumber:{
                type:String
            },
            lastSeen:{
                type:String
            },
            profilePhotos:{
                String
            },
            addToGroup:{
                type:String
            },
            forwardedMessages:{
                type:String
            }
        },
        chatSetting:{
            background:{
                type:String,
                default:"default background pic"
            },
            theme:{
                type:String,
                default:"a default theme"
            },

        },

        


    }


})

export default mongoose.model("Setting",settingSchema)