export default{
    sendMessage: {
        type: Boolean,
        default: true,
      },
      sendMedia: {
        all:{
          type:Boolean,
          default:true
        },
        photo: {
          type: Boolean,
          default: true,
        },
        videoMessage: {
          type: Boolean,
          default: true,
        },
        voice: {
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