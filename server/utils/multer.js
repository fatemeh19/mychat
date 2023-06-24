import multer from "multer" 
import path from "path" 

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      let filePath
      if(req.body.content){
        filePath = path.join('../frontend/public/uploads', req.body.content.contentType)
      }
      else{
        filePath = '../frontend/public/uploads/picture'
      }
      cb(null, filePath)
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
  })
const upload = multer({ storage: storage });

export default  upload