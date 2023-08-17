import Toggle from "@/src/components/basicComponents/toggle/toggle";
import { userPermissionsInterface } from "@/src/redux/features/chatSlice";
import { Dispatch, FC, SetStateAction } from "react";

interface PermissionOptionsProps {
    permissions: userPermissionsInterface,
    setPermissions: Dispatch<SetStateAction<userPermissionsInterface>>

}

const PermissionOptions: FC<PermissionOptionsProps> = ({ permissions, setPermissions }) => {
    return (
        <div className="overflow-hidden w-full flex flex-col items-start gap-5 relative select-none p-[25px] bg-white
                        shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)]">
            PermissionOptions
            <h1 className="text-blue-500 font-semibold">What can members of this group do?</h1>
            <ul className="flex flex-col w-full">
                <Toggle id="sendMessage" text={'Send messages'} toggle={permissions.sendMessage}
                    dispatchHandler={() => setPermissions(prevState => ({ ...prevState, sendMessage: !permissions.sendMessage }))}
                />
                <Toggle id="sendMedia" text={'Send media 9/9 > '} toggle={permissions.sendMedia.all}
                    dispatchHandler={() => setPermissions(prevState => {
                        if (prevState.sendMedia.all === true) return { ...prevState, sendMedia: { all: !prevState.sendMedia.all, file: false, music: false, photo: false, videoMessage: false, voice: false } }
                        else
                            return { ...prevState, sendMedia: { all: !prevState.sendMedia.all, file: true, music: true, photo: true, videoMessage: true, voice: true } }
                    })}
                />
                <Toggle id="addMember" text={'Add member'} toggle={permissions.addMember}
                    dispatchHandler={() => setPermissions(prevState => ({ ...prevState, addMember: !permissions.addMember }))}
                />
                <Toggle id="pinMessages" text={'Pin messages'} toggle={permissions.pinMessages}
                    dispatchHandler={() => setPermissions(prevState => ({ ...prevState, pinMessages: !permissions.pinMessages }))}
                />
                <Toggle id="changeGroupInfo" text={'Change group info'} toggle={permissions.changeGroupInfo}
                    dispatchHandler={() => setPermissions(prevState => ({ ...prevState, changeGroupInfo: !permissions.changeGroupInfo }))}
                />
            </ul>
        </div>
    );
}

export default PermissionOptions;