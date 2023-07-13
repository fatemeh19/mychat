enum messageTypes {
    text = 'text',
    picture = 'picture',
    video = 'video',
    voice = 'voice',
    gif = 'gif',
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

enum MessageBoxProps {
    rtl = 'rtl',
    ltr = 'ltr'
}

enum ChatType {
    Private = 'Private',
    Group = 'Group',
    Channel = 'Channel'
}
export { messageTypes, MessageBoxProps, ChatType, fileType }