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

export { messageTypes, MessageBoxDir, ChatType, fileType }