const messageType = ["text", "photo", "videoMessage", "voice", "music","file"]
const groupType = ['private','public']
const chatType = ['group','private']
const chatSearchType = ['memberIds','chatId']
const restrictUserDate = ["forever","specificTime"]
const themes = ['default']
const privacy = ['everybody','myContacts','nobody']
const determinedPrivacyFields = ['phoneNumber','lastseen','profilePic','addToGroup']
const editSettingOptions = ["notificationAndSounds","privacyAndSecurity","chatSetting"]
export{
    messageType,
    groupType,
    chatType,
    chatSearchType,
    restrictUserDate,
    themes,
    privacy,
    editSettingOptions,
    determinedPrivacyFields
}