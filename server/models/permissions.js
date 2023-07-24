export default{
    sendMessage: {
        type: Boolean,
        default: true,
      },
      sendMedia: {
        photos: {
          type: Boolean,
          default: true,
        },
        videoFiles: {
          type: Boolean,
          default: true,
        },
        videoMessages: {
          type: Boolean,
          default: true,
        },
        music: {
          type: Boolean,
          default: true,
        },
        file: {
          type: Boolean,
          default: true,
        },
        stickers: {
          type: Boolean,
          default: true,
        },
        ebmedLinks: {
          type: Boolean,
          default: true,
        },
        polls: {
          type: Boolean,
          default: true,
        },
      },
      addMember: {
        type: Boolean,
        default: true,
      },
      pinMessages: {
        type: Boolean,
        default: true,
      },
      changeGroupInfo: {
        type: Boolean,
        default: true,
      },
}