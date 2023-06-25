import multer from "multer";
import path from "path";
import * as RH from "../middlewares/ResponseHandler.js";
import * as CustomError from "../errors/index.js";
import ErrorMessages from "../messages/errors.js";
import fields from "../messages/fields.js";
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let filePath;
    if (req.body.content) {
      // if (req.body.content.contentType == "text") {
      //   return RH.CustomError({
      //     errorClass: CustomError.BadRequestError,
      //     errorType: ErrorMessages.FileContentError,
      //   });
      // }
      filePath = path.join(
        "../frontend/public/uploads",
        req.body.content.contentType
      );
    } else {
      filePath = "../frontend/public/uploads/picture";
    }
    cb(null, filePath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});
const upload = multer({ storage: storage });

export default upload;
