import Toggle from "@/src/components/basicComponents/toggle/toggle";
import { userPermissionsInterface } from "@/src/redux/features/chatSlice";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

interface PermissionOptionsProps {
    permissions: userPermissionsInterface,
    setPermissions: Dispatch<SetStateAction<userPermissionsInterface>>
}

const PermissionOptions: FC<PermissionOptionsProps> = ({ permissions, setPermissions }) => {
    const [openSubPermitions, setOpenSubPermitions] = useState(false)
    // const [counter, setCounter] = useState<number>(0)
    // useEffect(() => {
    //     Object.keys(permissions).forEach((key, index) => {
    //         if (key === 'sendMedia') {
    //             console.log('permissions[key]: ', permissions[key])
    //             if (permissions[key].file === true) setCounter(counter + 1)
    //             if (permissions[key].music === true) setCounter(counter + 1)
    //             if (permissions[key].photo === true) setCounter(counter + 1)
    //             if (permissions[key].voice === true) setCounter(counter + 1)
    //             if (permissions[key].videoMessage === true) setCounter(counter + 1)
    //         }
    //     })
    // }, [])

    // useEffect(() => {
    //     console.log('counter : ', counter)

    //     if (counter === -5) setPermissions(prevState => ({ ...prevState, sendMedia: { ...prevState.sendMedia, all: true } }))
    //     if (counter === 0 || counter === 5) setPermissions(prevState => ({ ...prevState, sendMedia: { ...prevState.sendMedia, all: false } }))
    // }, [counter])
    return (
        <div className="overflow-hidden w-full flex flex-col items-start gap-5 relative select-none p-[25px] bg-white
                        shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)]">
            PermissionOptions
            <h1 className="text-blue-500 font-semibold">What can members of this group do?</h1>
            <ul className="flex flex-col w-full">
                <Toggle id="sendMessage" text={'Send messages'} toggle={permissions.sendMessage}
                    dispatchHandler={() => setPermissions(prevState => ({ ...prevState, sendMessage: !permissions.sendMessage }))}
                    textClassName="!text-black"
                />
                <li>
                    <Toggle id="sendMedia" text={'Send media . . . v '} toggle={permissions.sendMedia.all}
                        dispatchHandler={() => setPermissions(prevState => {
                            if (prevState.sendMedia.all === true) return { ...prevState, sendMedia: { all: !prevState.sendMedia.all, file: false, music: false, photo: false, videoMessage: false, voice: false } }
                            else
                                return { ...prevState, sendMedia: { all: !prevState.sendMedia.all, file: true, music: true, photo: true, videoMessage: true, voice: true } }
                        })}
                        textClassName="!text-black hover:!text-blue-500 transition-all duration-150 cursor-pointer"
                        state={openSubPermitions}
                        setState={setOpenSubPermitions}
                    />
                    {
                        openSubPermitions && <div className="ml-7">
                            <Toggle id="photos" text="Photos" toggle={permissions.sendMedia.photo}
                                dispatchHandler={() => { setPermissions(prevState => ({ ...prevState, sendMedia: { ...prevState.sendMedia, photo: !prevState.sendMedia.photo } })); }}
                                textClassName="!text-black"
                            />
                            <Toggle id="videoMessage" text="Video message" toggle={permissions.sendMedia.videoMessage}
                                dispatchHandler={() => { setPermissions(prevState => ({ ...prevState, sendMedia: { ...prevState.sendMedia, videoMessage: !prevState.sendMedia.videoMessage } })); }}
                                textClassName="!text-black"
                            />
                            <Toggle id="music" text="Music" toggle={permissions.sendMedia.music}
                                dispatchHandler={() => { setPermissions(prevState => ({ ...prevState, sendMedia: { ...prevState.sendMedia, music: !prevState.sendMedia.music } })); }}
                                textClassName="!text-black"
                            />
                            <Toggle id="voice" text="Voice message" toggle={permissions.sendMedia.voice}
                                dispatchHandler={() => { setPermissions(prevState => ({ ...prevState, sendMedia: { ...prevState.sendMedia, voice: !prevState.sendMedia.voice } })); }}
                                textClassName="!text-black"
                            />
                            <Toggle id="file" text="File" toggle={permissions.sendMedia.file}
                                dispatchHandler={() => { setPermissions(prevState => ({ ...prevState, sendMedia: { ...prevState.sendMedia, file: !prevState.sendMedia.file } })) }}
                                textClassName="!text-black"
                            />
                        </div>
                    }
                </li>
                <Toggle id="addMember" text={'Add member'} toggle={permissions.addMember}
                    dispatchHandler={() => setPermissions(prevState => ({ ...prevState, addMember: !permissions.addMember }))}
                    textClassName="!text-black"
                />
                <Toggle id="pinMessages" text={'Pin messages'} toggle={permissions.pinMessages}
                    dispatchHandler={() => setPermissions(prevState => ({ ...prevState, pinMessages: !permissions.pinMessages }))}
                    textClassName="!text-black"
                />
                <Toggle id="changeGroupInfo" text={'Change group info'} toggle={permissions.changeGroupInfo}
                    dispatchHandler={() => setPermissions(prevState => ({ ...prevState, changeGroupInfo: !permissions.changeGroupInfo }))}
                    textClassName="!text-black"
                />
            </ul>
        </div>
    );
}

export default PermissionOptions;