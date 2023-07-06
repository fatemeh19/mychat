
interface infoFace {
    img: string | ArrayBuffer | null,
    name: string,
    phone: string
}

interface sendMessageInterface {
    content: {
        contentType: string | undefined,
        text: string,
    },
    file?: any,
    senderId : string,
    reply: {
        isReplied: boolean,
        messageId?: string
    },
}

interface recievedMessageInterface {
    _id?: string,
    content: {
        contentType: string ,
        url: string,
        text: string
    },
    reply: {
        isReplied: boolean
    },
    senderId: string,
    seenIds: string[],
    createdAt?: any,
    updatedAt?: any,
    __v?: number
}
export type { infoFace, sendMessageInterface, recievedMessageInterface }