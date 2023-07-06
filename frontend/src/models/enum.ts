enum messageTypes {
    text = 'text',
    picture = 'picture',
    video = 'video',
    voice = 'voice',
    gif = 'gif',
    music = 'music',
    file = 'file'

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
export { messageTypes, MessageBoxProps, ChatType }