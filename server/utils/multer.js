import multer from "multer";
import path from "path";
import * as consts from "./consts.js";
import fileTypeGetter from "./fileTypeIdentifier.js";
import * as fileController from "./file.js";
import * as RH from "../middlewares/ResponseHandler.js";
import * as CustomError from "../errors/index.js";
import errors from "../messages/errors.js";
var storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    let fileType;

    fileType = await fileTypeGetter(file.mimetype);
    if (!fileType) {
      throw new CustomError.BadRequestError(
        ErrorMessages.notAllowedToSend,
        fields.file,
      );
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
