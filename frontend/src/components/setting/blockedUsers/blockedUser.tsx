import { profilePicHandler } from "@/src/helper/userInformation";
import { chatInterface } from "@/src/redux/features/chatSlice";
import { contactInterface } from "@/src/redux/features/userContactListSlice";
import { UserInterface } from "@/src/redux/features/userInfoSlice";
import { UserInfo } from "os";
import { FC } from "react";

interface BlockUserProps {
    blockUser: UserInterface | contactInterface | chatInterface
}

const BlockUser: FC<BlockUserProps> = ({ blockUser }) => {
    return (
        <div>
            <img src={profilePicHandler(blockUser)} alt="" />
        </div>
    );
}

export default BlockUser;