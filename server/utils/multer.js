import multer from "multer";
import path from "path";
import * as consts from "./consts.js";
import fileTypeGetter from "./fileTypeIdentifier.js";
import * as fileController from "./file.js";
import * as CustomError from "../errors/index.js";
import errors from "../messages/errors.js";
import fields from "../messages/fields.js";
var storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    let fileType;

    fileType = await fileTypeGetter(file.mimetype);
    if (!fileType) {
     cb(new CustomError.BadRequestError(
      errors.notAllowedToSend
    )) 
    return
    }

    const filePath = path.join(consts.MEDIA_SAVE_PATH, fileType);
    if (!(await fileController.exists(filePath))) {
      fileController.mkdir(filePath);
    }
    file.fileType = fileType;
    cb(null, filePath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});
const upload = multer({ storage: storage });

export default upload;
