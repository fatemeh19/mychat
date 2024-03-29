
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatType } from "@/src/models/enum";
import { groupMemberInterface, profilePicInterface, recievedMessageInterface } from "@/src/models/interface";

// باید به اطلاعات چند نوع چت هم اضافه بشه که از سمت سرور گرفته میشه

interface member {
    _id: string,
    memberId: string,
    joinedAt: string
}

export interface userPermissionsInterface {
    sendMessage: boolean,
    sendMedia: {
        all: boolean,
        photo: boolean,
        videoMessage: boolean,
        music: boolean,
        file: boolean,
        voice: boolean
    },
    addMember: boolean,
    pinMessages: boolean,
    changeGroupInfo: boolean
}

export interface userExceptionsInterface {
    userId: string,
    restrictUntil: string,
    specificTime: string,
    permissions: userPermissionsInterface
}

interface userPermissionsAndExceptionsInterface {
    permissions: userPermissionsInterface,
    exceptions: userExceptionsInterface[]
}

export interface groupTypeSettingInterface {
    groupType: string,//'private' | 'public'
    restrictSavingContent: boolean,
    approveNewMembers: boolean,
    url: string
}

export interface chatInterface {
    _id: string,
    name: string,
    description: string,
    profilePic: profilePicInterface,
    owner: string,
    groupTypeSetting: groupTypeSettingInterface,
    chatType: string,
    members: member[],
    messages: recievedMessageInterface[],
    updatedAt: string,
    notifications: boolean,
    pinnedMessages: string[],
    userPermissionsAndExceptions: userPermissionsAndExceptionsInterface,
    inviteLinks: string[],
    __v: number
}
interface initialStateInterface {
    Chat: chatInterface,
    chatType: ChatType,
    firstChat: boolean,
    chatCreated: boolean,
    groupMembers: groupMemberInterface[],
    isEditChat: boolean,
    chatFetched: boolean
}

const initialState = {
    Chat: {},
    chatType: ChatType.private,
    firstChat: true,
    chatCreated: false,
    isEditChat: false,
    chatFetched: false
} as initialStateInterface

export const ChatSlice = createSlice({
    name: "Chat",
    initialState,
    reducers: {
        addChat: (state, action: PayloadAction<any>) => {
            state.Chat = action.payload
        },
        setChatType: (state, action: PayloadAction<ChatType>) => {
            state.chatType = action.payload
        },
        setFirstChat: (state, action: PayloadAction<boolean>) => {
            state.firstChat = action.payload
        },
        addMessage: (state, action: PayloadAction<any>) => {
            state.Chat.messages.push(action.payload)
        },
        setChatCreated: (state, action: PayloadAction<boolean>) => {
            state.chatCreated = action.payload
        },
        updateArrayMessages: (state, action: PayloadAction<any>) => {
            state.Chat.messages = action.payload
        },
        deleteMessageFromMessageArray: (state, action: PayloadAction<any>) => {
            state.Chat.messages.splice(action.payload, 1)

        },
        addPinMessage: (state, action: PayloadAction<string>) => {
            state.Chat.pinnedMessages.push(action.payload)
        },
        deleteMessageFromPinnedMessagesArray: (state, action: PayloadAction<number>) => {
            console.log('delete pin message : ', action.payload)
            state.Chat.pinnedMessages.splice(action.payload, 1)
        },
        setPinState: (state, action: PayloadAction<any>) => {
            console.log('action : ', action.payload)
            state.Chat.messages[action.payload.index].pinStat = action.payload.pinStat
        },
        addSeenIds: (state, action: PayloadAction<any>) => {
            console.log('contact seen message id : ', action.payload)
            state.Chat.messages[action.payload.index].seenIds.push(action.payload.userId)
        },
        setGroupMembersInformation: (state, action: PayloadAction<groupMemberInterface[]>) => {
            state.groupMembers = action.payload
        },
        addMemberToGroup: (state, action: PayloadAction<groupMemberInterface>) => {
            state.groupMembers.push(action.payload)
        },
        removeMemberFromGroup: (state, action: PayloadAction<number>) => {
            state.groupMembers.splice(action.payload, 1)
        },
        editMessage: (state, action: PayloadAction<{ index: number, message: any }>) => {
            state.Chat.messages[action.payload.index].messageInfo = action.payload.message
        },
        setIsEditChat: (state, action: PayloadAction<boolean>) => {
            state.isEditChat = action.payload
        },
        editUserPermissionsAndExceptions: (state, action: PayloadAction<userPermissionsAndExceptionsInterface>) => {
            state.Chat.userPermissionsAndExceptions = action.payload
        },
        setChatFetched: (state, action: PayloadAction<boolean>) => {
            state.chatFetched = action.payload
        },
        editGroupTypeSetting: (state, action: PayloadAction<groupTypeSettingInterface>) => {
            state.Chat.groupTypeSetting = action.payload
        },
        editGroupInfoAction: (state, action: PayloadAction<{ name: string, description: string }>) => {
            state.Chat.name = action.payload.name
            state.Chat.description = action.payload.description
        },
        editProfilePicAction: (state, action: PayloadAction<profilePicInterface>) => {
            state.Chat.profilePic = action.payload
        },
    },
});

export const {
    addChat,
    setChatType,
    setFirstChat,
    addMessage,
    setChatCreated,
    updateArrayMessages,
    deleteMessageFromMessageArray,
    addPinMessage,
    deleteMessageFromPinnedMessagesArray,
    setPinState,
    addSeenIds,
    setGroupMembersInformation,
    addMemberToGroup,
    removeMemberFromGroup,
    editMessage,
    setIsEditChat,
    editUserPermissionsAndExceptions,
    setChatFetched,
    editGroupTypeSetting,
    editGroupInfoAction,
    editProfilePicAction
} = ChatSlice.actions;
export default ChatSlice.reducer;