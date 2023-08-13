import * as Services from "../services/dbServices.js";
import * as fileController from "../utils/file.js";
import * as RH from "./ResponseHandler.js";
import * as CustomError from "../errors/index.js";
import ErrorMessages from "../messages/errors.js";
const permissionChecker = (routeName) => {
  return async function (req, res, next) {
    const {
      params: { chatId: groupId },
      user: { userId },
      file,
    } = req;
    const group = await Services.findOne('chat',
      { _id: groupId },
      { userPermissionsAndExceptions: 1, chatType: 1 }
    );
    if (group.chatType != "group") {
      return next();
    }
    let perms;
    if (res.locals.permissionType) {
      routeName = res.locals.permissionType;
    }
    perms = routeName.split(".");
    let hasPermission;

    if (!group) {
      //  group does not exists
    }
    const exceptions = group.userPermissionsAndExceptions.exceptions;
    let userIsException = false;
    exceptions.forEach((exception) => {
      if (exception.userId == userId) {
        if (exception.restrictUntil > Date.now()) {
          if (perms.length == 1) {
            hasPermission = exception.permissions[perms[0]];
          } else if (perms.length == 2) {
            hasPermission = exception.permissions[perms[0]][perms[1]];
          }
          // else{
          //     exception.permissions[perms[0]][perms[1]][]
          // }

          userIsException = true;
        }
      }
    });
    if (!userIsException) {
      const permissions = group.userPermissionsAndExceptions.permissions;
      if (perms.length == 1) {
        hasPermission = permissions[perms[0]];
      } else if (perms.length == 2) {
        hasPermission = permissions[perms[0]][perms[1]];
      }
    }
    if (hasPermission) {
      next();
    } else {
      if (file) {
        await fileController.deleteFile(file.path);
      }
      await RH.CustomError({
        errorClass: CustomError.UnauthorizedError,
        errorType: ErrorMessages.notAllowedError,
      });
    }
  };
};

export default permissionChecker;
