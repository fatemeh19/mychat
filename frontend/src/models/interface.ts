import { ThemOption, privacyOption } from "./enum"

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
    messageInfo: {
        _id: string,
        content: {
            text: string,
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

interface notificationAndSoundsInterface {
    notifs: boolean,
    sound: string
}

interface privacyInterface {
    lastseen: privacyOption,
    profilePic: privacyOption,
    phoneNumber: privacyOption,
    addToGroup: privacyOption,
}

export interface blockedUser {
    _id: string,
    name: string,
    profilePic: profilePicInterface
}

interface securityInterface {
    blockedUsers: string[]
}

interface privacyAndSecurityInterface {
    security: securityInterface
    privacy: privacyInterface
}

interface chatSettingInterface {
    background: string,
    theme: ThemOption
}

interface settingInterface {
    _id: string,
    notificationAndSounds: notificationAndSoundsInterface,
    privacyAndSecurity: privacyAndSecurityInterface,
    chatSetting: chatSettingInterface,
    __v: 0
}

export type {
    infoFace,
    profilePicInterface,
    recievedMessageInterface,
    groupMemberInterface,
    settingInterface,
    notificationAndSoundsInterface,
    privacyInterface,
    securityInterface,
    privacyAndSecurityInterface,
    chatSettingInterface
}