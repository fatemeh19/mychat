
interface infoFace {
    img: string | ArrayBuffer | null,
    name: string,
    phone: string
}

interface messageInterface {
    content : {
        contentType : string,
        text : string,
        url?: string
    },
    senderId : string,
    reply : {
        isReplied : boolean
    },
    seenIds : string[],
    // createdAt : Date,
    createdAt : string,
}

interface recievedMessageInterface {
    _id ?: string,
    content : {
        contentType : string,
        url : string,
        text : string
    },
    reply : {
        isReplied : boolean
    },
    senderId : string,
    seenIds : string[],
    createdAt ?: string,
    updatedAt ?: string,
    __v ?: number
}
export type { infoFace, messageInterface, recievedMessageInterface}