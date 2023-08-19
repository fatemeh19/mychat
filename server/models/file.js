import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  originalName:String,
  path:String,
  contentType:String

},{timestamps:true});

export default mongoose.model('File',FileSchema)
