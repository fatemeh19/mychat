import * as Services from "../services/dbServices.js";
import * as consts from "../utils/consts.js";
import validatorSelector from "../validators/settingValidators/index.js";
import * as fileController from "../utils/file.js";
import ValidationError from "../errors/ValidationError.js";
import * as Validators from "../validators/index.js";
const editSetting = async (body, settingId, files) => {
  
  try {
    await Validators.editSetting.validate(body, {
      stripUnknown: true,
      abortEarly: false,
    });
  } catch (errors) {
    throw new ValidationError(errors);
  }
  const {title} = body
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

  if (files.notifSound) {
    if (setting[title].sound != consts.DEFAULT_NOTIF_SOUND) {
      await fileController.deleteFile(setting[title].sound);
    }
    data.sound = files.notifSound[0].path;
  } else if (data.notifs) {
    data.sound = consts.DEFAULT_NOTIF_SOUND;
    await fileController.deleteFile(setting[title].sound);
  } else {
    data.sound = undefined;
    await fileController.deleteFile(setting[title].sound);
  }

  if (files.background) {
    if (setting[title].background != consts.DEFAULT_BACKGROUND_PICTURE) {
      await fileController.deleteFile(setting[title].background);
    }
    data.background = files.background[0].path;
  } else {
    data.background = consts.DEFAULT_BACKGROUND_PICTURE;
    await fileController.deleteFile(setting[title].background);
  }

  await Services.findByIdAndUpdate(
    "setting",
    { _id: settingId },
    {
      $set: { [title]: data },
    },
    {
      new: true,
    }
  );
};

const getSetting = async (settingId) => {
  const setting = await Services.findOne("setting", { _id: settingId });

  return setting;
};

export { editSetting, getSetting };
