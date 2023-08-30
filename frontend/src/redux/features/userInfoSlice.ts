import { chatSettingInterface, notificationAndSoundsInterface, privacyAndSecurityInterface, profilePicInterface, settingInterface } from "@/src/models/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserInterface {
    name: string,
    lastname: string,
    phoneNumber: string,
    username: string,
    profilePic: profilePicInterface,
    email: string,
    _id: string,
    settingId: string,
    pinnedChats: any[]
}
interface initialStateInterface {
    User: UserInterface,
    setting: settingInterface
}

const initialState = {
    User: {},
    setting: {}
} as initialStateInterface

export const UserSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        addUserInfo: (state, action: PayloadAction<any>) => {
            state.User = action.payload
        },
        updateUserProfilePic: (state, action: PayloadAction<profilePicInterface>) => {
            state.User.profilePic = action.payload
        },
        updateUserProfileInfo: (state, action: PayloadAction<{ name: string, lastname: string, phoneNumber: string, username: string }>) => {
            state.User.name = action.payload.name
            state.User.lastname = action.payload.lastname
            state.User.phoneNumber = action.payload.phoneNumber
            state.User.username = action.payload.username
        },
        addSetting: (state, action: PayloadAction<settingInterface>) => {
            state.setting = action.payload
        },
        editNotificationSetting: (state, action: PayloadAction<any>) => {
            state.setting.notificationAndSounds = action.payload
        },
        editPrivacySetting: (state, action: PayloadAction<privacyAndSecurityInterface>) => {
            state.setting.privacyAndSecurity = action.payload
        },
        editChatSetting: (state, action: PayloadAction<chatSettingInterface>) => {
            state.setting.chatSetting = action.payload
        },
    },
});

export const {
    addUserInfo,
    updateUserProfilePic,
    updateUserProfileInfo,
    addSetting,
    editNotificationSetting,
    editPrivacySetting,
    editChatSetting
} = UserSlice.actions;
export default UserSlice.reducer;