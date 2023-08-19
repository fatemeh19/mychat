import fileTypeGetter from "./fileTypeIdentifier.js";
import * as Services from "../services/dbServices.js";
const fileCreator = async (file) => {
  let newFile = await Services.create("file", {
    originalName: file.originalname,
    contentType: await fileTypeGetter(file.mimetype),
    path: file.path,
  });
  return newFile._id
};

export default fileCreator

