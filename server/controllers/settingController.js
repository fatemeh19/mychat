import * as Services from "../services/dbServices.js";
import * as consts from "../utils/consts.js";
import validatorSelector from "../validators/settingValidators/index.js";
import * as fileController from "../utils/file.js";
import ValidationError from "../errors/ValidationError.js";
import * as Validators from "../validators/index.js";
import { objectId } from "../utils/typeConverter.js";
import privacyFilter from "../utils/privacyFilter.js";
const editSetting = async (body, settingId, files) => {
  try {
    await Validators.editSetting.validate(body, {
      stripUnknown: true,
      abortEarly: false,
    });
  } catch (errors) {
    throw new ValidationError(errors);
  }
  const { title } = body;
  let data;
  try {
    let validator = await validatorSelector(title);
    data = await validator.validate(body, {
      stripUnknown: true,
      abortEarly: false,
    });
  } catch (errors) {
    throw new ValidationError(errors);
  }
  const setting = await Services.findOne(
    "setting",
    { _id: settingId },
    { [title]: 1 }
  );

  if (files.background) {
    if (setting[title].background != consts.DEFAULT_BACKGROUND_PICTURE) {
      await fileController.deleteFile(setting[title].background);
    }
    data.background = files.background[0].path;
  } else {
    data.background = consts.DEFAULT_BACKGROUND_PICTURE;
    await fileController.deleteFile(setting[title].background);
  }

  const updatedSetting = await Services.findByIdAndUpdate(
    "setting",
    { _id: settingId },
    {
      $set: { [title]: data },
    },
    {
      new: true,
    }
  );
  return updatedSetting;
};

const getSetting = async (settingId, userId) => {
  const setting = await Services.findOne("setting", { _id: settingId });

  return setting;
};

const getBlockedUsers = async (userId)=>{
  
  const user = await Services.findOne('user',{_id:userId})
  
  let setting = await Services.aggregate("setting", [
    {
      $match: { _id: user.settingId},
    },
    {
      $lookup: {
        from: "users",
        localField: "privacyAndSecurity.security.blockedUsers",
        foreignField: "_id",
        as: "blockedUsers",
      },
    },
   
    {
      $project:{
        blockedUsers:{
          _id:1,
          name:1,
          lastname:1,
          profilePic:1
        }
      }
    }


    
  ]);
  


  const profilePicIds = setting[0]?.blockedUsers.map(
    (blockedUser) => blockedUser.profilePic
  );
  const profilePics = await Services.findMany("file", {
    _id: { $in: profilePicIds },
  });

  setting[0]?.blockedUsers.forEach(
    (blockedUser, index) => {
      blockedUser.profilePic = profilePics[index];
    }
  );

  let blus = setting[0]?.blockedUsers || []
  for (let blockedUser of blus) {
    let isContact = user.contacts.find((userContact)=>userContact.userId.equals(blockedUser._id))
    if(isContact){
      blockedUser.name = isContact.name || blockedUser.name;
      blockedUser.lastname = isContact.lastname || blockedUser.lastname;
    }
    blockedUser = await privacyFilter(blockedUser,userId,blockedUser._id)
  }
  return setting[0].blockedUsers
  


}
export { editSetting, getSetting,getBlockedUsers };
