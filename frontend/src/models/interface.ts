
interface infoFace {
    img: string | ArrayBuffer | null,
    name: string,
    phone: string
}

interface messageInterface {
    content : {
        contentType : string,
        text : string
    },
    senderId : string
}
export type { infoFace, messageInterface}