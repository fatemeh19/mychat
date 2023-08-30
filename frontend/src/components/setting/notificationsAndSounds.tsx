import { FC, useEffect, useState } from "react";
import Toggle from "../basicComponents/toggle/toggle";
import { useAppSelector } from "@/src/redux/hooks";
import { notificationAndSoundsInterface } from "@/src/models/interface";

interface NotificationsAndSoundsProps {

}

const NotificationsAndSounds: FC<NotificationsAndSoundsProps> = () => {

    const setting = useAppSelector(state => state.userInfo)

    // const [notificatio nSetting, setNotificationSetting] = useState<notificationAndSoundsInterface>({
    //     notifs: setting.notificationAndSounds.notifs,
    //     sound: setting.notificationAndSounds.sound
    // })

    useEffect(() => {
        console.log('setting : ', setting)
        // console.log('notificationSetting setting : ', notificationSetting)
    }, [setting])


    return (
        <div className="w-full flex gap-5 items-center px-5 pb-3 bg-white shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)]">
            <h1>Notification for chats</h1>
            <div>
                {/* <Toggle id="notification" text="Notification" toggle={} /> */}
            </div>
        </div>
    );
}

export default NotificationsAndSounds;