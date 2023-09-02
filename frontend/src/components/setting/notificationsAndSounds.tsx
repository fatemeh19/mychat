import { FC, useEffect, useRef, useState } from "react";
import Toggle from "../basicComponents/toggle/toggle";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { notificationAndSoundsInterface } from "@/src/models/interface";
import { BiBell, BiMusic } from "react-icons/bi";
import { settingTitle } from "@/src/models/enum";
import { editSetting } from "@/src/helper/userInformation";

interface NotificationsAndSoundsProps {

}

const NotificationsAndSounds: FC<NotificationsAndSoundsProps> = () => {

    const dispatch = useAppDispatch()
    const setting = useAppSelector(state => state.userInfo).setting

    const [file, setFile] = useState('')
    const [notificationSetting, setNotificationSetting] = useState<notificationAndSoundsInterface>(setting.notificationAndSounds)

    const selectSound = useRef<HTMLInputElement>(null)
    const notificationPath = notificationSetting.sound.split('\\')
    const notificationName = notificationPath[notificationPath.length - 1].split('.')[0]

    const changeHandler = (e: any) => {
        // @ts-ignore
        const file = selectSound.current?.files[0]
        const reader = new FileReader()
        if (file) {
            reader.onload = () => {
                const result = reader.result;

                // @ts-ignore
                selectSound.current.src = result
                setFile(e.target.files[0])
            }
            reader.readAsDataURL(file)
        }
    };
    const formData = new FormData()
    useEffect(() => {
        return () => {
            formData.append('notifs', notificationSetting.notifs.toString())
            file && formData.append('notifSound', file)

            editSetting(settingTitle.notificationAndSounds, setting._id, formData, dispatch)
        }
    }, [notificationSetting.notifs, file])


    return (
        <div className="w-full flex flex-col gap-3 px-5 pb-3 bg-white shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)] select-none">
            <h1 className="text-mainColor">Notification for chats</h1>
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                    <BiBell className="w-5 h-5" />
                    <Toggle id="notification" text="Notification" toggle={notificationSetting.notifs} textClassName="text-black"
                        dispatchHandler={() => setNotificationSetting(prevState => ({ ...prevState, notifs: !prevState.notifs }))} />
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <BiMusic className="w-5 h-5" />
                        <p className="title">Play sound</p>
                    </div>
                    <input type="file" accept="audio/*" hidden ref={selectSound} onChange={changeHandler} />
                    <button
                        className="text-mainColor"
                        onClick={() => selectSound.current?.click()}>{notificationName}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NotificationsAndSounds;