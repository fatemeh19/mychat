const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const services = require("../services");
const ErrorMessages = require("../messages/errors.json");
const Fields = require("../messages/fields.json");
const validators = require("../validators");
const path = require("path");
const {
  RHCustomError,
  RHSendResponse,
} = require("../middlewares/ResponseHandler");
const setInfo = async (req, res) => {
  console.log(req.body);
  const {
    user: { userId },
    body: { name, phoneNumber },
  } = req;
  // try {
  //   data = validators.setInfo.validate(req.body, {
  //     abortEarly: false,
  //     stripUnknown: true,
  //   });
  // } catch (err) {
  //    console.log("err")
  //   // await RHCustomError({ err, errorClass: CustomError.ValidationError });
  // }
  let url = "";
  if (req.file) {
    url = path.join(process.cwd(), "../", req.file.path);
  }

  const update = {
    name: name,
    phoneNumber: phoneNumber,
    profilePic: url,
  };
  const user = await services.User.findAndUpdateUser(userId, update);

  if (!user) {
    await RHCustomError({
      errorClass: CustomError.NotFoundError,
      errorType: ErrorMessages.NotFoundError,
      Field: Fields.user,
    });
  }

  await RHSendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
  });
};


module.exports = { setInfo };
