import { setStatus } from "../controllers/userController.js";
import * as Services from "../services/dbServices.js";
import fileCreator from "./fileCreator.js";
import * as consts from "../utils/consts.js"
const userDependencies = async (user) => {
//   set last seen
  setStatus({ userId: user._id, online: false });

//   initialize settings for user
  const setting = await Services.create("setting");
  user.settingId = setting._id;

//    set file for user profile
  const defaultProfileAsFile = {
    originalname: "default-profile",
    mimetype: "image/jpg",
    path: consts.DEFAULT_PROFILE_PICTURE,
  };
  const file = await fileCreator(defaultProfileAsFile);
  user.profilePic = file._id
};

export { userDependencies };
