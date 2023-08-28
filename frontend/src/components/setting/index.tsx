import { profilePicHandler } from "@/src/helper/userInformation";
import { useAppSelector } from "@/src/redux/hooks";
import Image from "next/image";
import { FC } from "react";
import EditProfile from "./editProfile";
import NotificationsAndSounds from "./notificationsAndSounds";
import PrivacyAndSecurity from "./privacyAndSecurity";
import ChatSettings from "./chatSettings";
import { BiBell, BiChat, BiKey, BiNotification, BiUser } from "react-icons/bi";

interface SettingsProps {
    editProfileOpenHandler: () => void,
    notificationsAndSoundOpenHandler: () => void,
    privacyAndSecurityOpenHandler: () => void,
    chatSettingsOpenHandler: () => void,
    settingOpenHandler: () => void
}

const Settings: FC<SettingsProps> = ({
    editProfileOpenHandler,
    notificationsAndSoundOpenHandler,
    privacyAndSecurityOpenHandler,
    chatSettingsOpenHandler,
    settingOpenHandler
}) => {

    const userInfo = useAppSelector(state => state.userInfo).User

    return (
        <div className="overflow-auto overflow-x-hidden chat-scrollbar bg-gray-100">
            <div className="w-full flex gap-5 items-center px-5 pb-3 bg-white shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)]">
                <Image
                    src={profilePicHandler(userInfo)}
                    className="mt-3 h-[50px] w-[50px] min-h-[70px] min-w-[70px]  object-cover rounded-full  "
                    width={500} height={0} alt="contact-profile"
                />
                <div className="info flex flex-col">
                    <p className="font-bold">{userInfo.name}</p>
                    <p className="text-sm">{userInfo.phoneNumber}</p>
                    {userInfo.username && <p className="text-gray-500 text-sm">username{userInfo.username}</p>}
                </div>
            </div>

            <div className="flex gap-5 p-2 mt-3 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                    settingOpenHandler()
                    editProfileOpenHandler()
                }}>
                <BiUser className="text-gray-500 text-2xl" />
                <span className="text-base">My Account</span>
            </div>
            <div className="flex gap-5 p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                    settingOpenHandler()
                    notificationsAndSoundOpenHandler()
                }}>
                <BiBell className="text-gray-500 text-2xl" />
                <span className="text-base">Notifications and Sounds</span>
            </div>
            <div className="flex gap-5 p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                    settingOpenHandler()
                    privacyAndSecurityOpenHandler()
                }}>
                <BiKey className="text-gray-500 text-2xl" />
                <span className="text-base">Privacy and Security</span>
            </div>
            <div className="flex gap-5 p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                    settingOpenHandler()
                    chatSettingsOpenHandler()
                }}>
                <BiChat className="text-gray-500 text-2xl" />
                <span className="text-base">Chat Settings</span>
            </div>
            {/* <EditProfile />
            <NotificationsAndSounds />
            <PrivacyAndSecurity />
            <ChatSettings /> */}

        </div>
    );
}

export default Settings;