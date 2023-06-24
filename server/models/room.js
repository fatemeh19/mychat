import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    onlineMembers : [{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }],
    members : [{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }],
    name:String
    
})

export default mongoose.model('Room', roomSchema)