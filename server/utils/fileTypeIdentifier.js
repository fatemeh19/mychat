import * as consts from "./consts.js";

const fileTypeGetter = async (mimetype) => {
  let [fileType, ext] = mimetype.split("/");
  switch (fileType) {
    case "image":
      fileType = "photo";
      break;
    case "video":
      fileType = "videoMessage";
      break;

    case "audio":
      if (ext == "ogg" || ext == "ogv" || ext == "ogm" || ext == "wav") {
        fileType = "voice";
      } else {
        fileType = "music";
      }
      break;
    case "voice":
      fileType = "voice";
      break;
    case "application":
      if (!consts.POSSIBLE_FILE_FORMATS.includes(ext)) {
        return undefined;
      } else {
        fileType = "file";
      }
      break;
    default:
      return undefined;
  }
  return fileType;
};

export default fileTypeGetter;
