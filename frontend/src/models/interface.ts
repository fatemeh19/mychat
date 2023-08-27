
interface infoFace {
    img: string | ArrayBuffer | null,
    name: string,
    phone: string
}

interface profilePicInterface {
    _id: string,
    originalName: string,
    path: string,
    contentType: string,
    createAt: string,
    updateAt: string
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
            // contentType: string,
            text: string,
            // url: string,
            // originalName?: string,
            file: {
                _id: string,
                contentType: string,
                originalName: string,
                path: string,
                createdAt?: any,
                updatedAt?: any,
                __v?: number
            }
        },
        senderId: string,
        edited: boolean,
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
    status: {
        online: boolean,
        lastseen: string
    }
    profilePic: profilePicInterface
}
export type { infoFace, profilePicInterface, recievedMessageInterface, groupMemberInterface }