import { updateProfilePic } from "../controllers/profilePicController";
const updateProfilePicRoute = async (req, res)=>{
    const {
    params: { id },
    file,
  } = req;
  updateProfilePic(id,file)
  RH.SendResponse({ res, statusCode: StatusCodes.OK, title: "ok" });

}

export {updateProfilePicRoute}