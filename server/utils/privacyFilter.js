import * as consts from "./consts.js";
import * as Services from "../services/dbServices.js";
import { determinedPrivacyFields } from "./enums.js";
import BadRequestError from "../errors/BadRequest.js";
import errors from "../messages/errors.js";
const privacyFilter = async (contactData, userId, contactId) => {
  contactData.lastseen = contactData?.status?.lastseen;
  const contact = await Services.findOne(
    "user",
    { _id: contactId },
    { contacts: 1, settingId: 1 }
  );
  const contactSetting = await Services.findOne(
    "setting",
    { _id: contact.settingId },
    { "privacyAndSecurity.privacy": 1 }
  );

  const {
    privacyAndSecurity: { privacy },
  } = contactSetting;
  for (const element of determinedPrivacyFields) {
    if (contactData[element]) {
      switch (privacy[element]) {
        case "everybody":
          continue
        case "myContacts":
          const contact = await Services.findOne(
            "user",
            { _id: contactId },
            { contacts: 1 }
          );
         
          const userIsAContact = contact.contacts.find((contact) =>
            contact.userId.equals(userId)
          );
          if (!userIsAContact) {
            privacy[element] = "nobody";
          } else {
            break;
          }

        case "nobody":
          switch (element) {
            case "phoneNumber":
                contactData[element] = undefined
              break;
            case "lastseen":
              contactData.status.lastseen = undefined;
              break;
            case "profilePic":
              contactData[element].path = consts.DEFAULT_PROFILE_PICTURE;
              break;
            case "addToGroup":
                throw new BadRequestError(errors.PrivacyError)
          }
          break;

        default:
          break;
      }
    }
  }
  contactData.lastseen = undefined;

  return contactData;
};


export default privacyFilter
