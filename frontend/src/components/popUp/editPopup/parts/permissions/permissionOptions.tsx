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
                // @ts-ignore
                // dispatchHandler={() => setPermissions(prevState => {
                //     let jasper = Object.assign({}, prevState);  // creating copy of state variable jasper
                //     jasper.sendMessage = false;                     // update the name property, assign a new value                 
                //     return { jasper };                                 // return new object jasper object
                // })} 
                />
                <Toggle id="sendMessage" text={'Send media 9/9 > '} toggle={permissions.sendMessage} />
                <Toggle id="sendMessage" text={'Add members'} toggle={permissions.sendMessage} />
                <Toggle id="sendMessage" text={'Pin messages'} toggle={permissions.sendMessage} />
                <Toggle id="sendMessage" text={'Change group info'} toggle={permissions.sendMessage} />
            </ul>
        </div>
    );
}

export default PermissionOptions;