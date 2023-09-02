enum messageTypes {
    text = 'text',
    photo = 'photo',
    videoMessage = 'videoMessage',
    voice = 'voice',
    music = 'music',
    file = 'file'

}

enum fileType {
    pdf = 'pdf',
    docx = 'docx',
    pptx = 'pptx',
    zip = 'zip',
    xlsx = 'xlsx',
}

enum MessageBoxDir {
    rtl = 'rtl',
    ltr = 'ltr'
}

enum ChatType {
    private = 'private',
    group = 'group',
    channel = 'channel'
}

enum SearchType {
    chats = 'chats',
    messages = 'messages'
}

enum settingTitle {
    notificationAndSounds = "notificationAndSounds",
    privacyAndSecurity = "privacyAndSecurity",
    chatSetting = "chatSetting"
}

enum privacyOption {
    everybody = 'everybody',
    myContacts = 'myContacts',
    nobody = 'nobody'
}

enum ThemOption {
    default = 'default'
}
export { messageTypes, MessageBoxDir, ChatType, fileType, SearchType, privacyOption, ThemOption, settingTitle }