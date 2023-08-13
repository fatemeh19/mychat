
interface infoFace {
    img: string | ArrayBuffer | null,
    name: string,
    phone: string
}

interface recievedMessageInterface {
    _id: string,
    // content: {
    //     contentType: string,
    //     url: string,
    //     text: string,
    //     originalName?: string,
    // },
    // message :
    messageInfo: {
        _id: string,
        content: {
            contentType: string,
            text: string,
            url: string,
            originalName?: string,
        },
        senderId: string,
        reply: {
            isReplied: boolean,
            messageId: string
        },
        createdAt?: any,
        updatedAt?: any,
        __v?: number
    }
    seenIds: string[],
    deletedIds: string[],
    forwarded: {
        isForwarded: boolean,
        by: string
    },
    pinStat: {
        pinned: number,
        by: string //userId
    }
}

interface groupMemberInterface {
    _id: string,
    name: string,
    profilePic: string
}
export type { infoFace, recievedMessageInterface, groupMemberInterface }