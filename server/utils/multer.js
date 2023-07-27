import multer from "multer";
import path from "path";
import * as consts from './consts.js'

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let filePath;

    if (req.body.content) {
      filePath =path.join(consts.MEDIA_SAVE_PATH,req.body.content.contentType)   
    } else {
      filePath =path.join(consts.MEDIA_SAVE_PATH ,'/photo/') 

    }
    cb(null, filePath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});
const upload = multer({ storage: storage });

export default upload;
