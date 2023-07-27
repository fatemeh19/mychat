
interface infoFace {
    img: string | ArrayBuffer | null,
    name: string,
    phone: string
}

interface recievedMessageInterface {
    _id: string,
    content: {
        contentType: string,
        url: string,
        text: string,
        originalName?: string,
    },
    reply: {
        isReplied: boolean,
        messageId: string
    },
    senderId: string,
    seenIds: string[],
    deletedIds: string[],
    createdAt?: any,
    updatedAt?: any,
    __v?: number
}
export type { infoFace, recievedMessageInterface }