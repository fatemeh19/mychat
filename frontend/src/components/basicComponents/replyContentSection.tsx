import { fileHandler } from "@/src/helper/userInformation";
import { messageTypes } from "@/src/models/enum";
import { recievedMessageInterface } from "@/src/models/interface";
import { contactInterface } from "@/src/redux/features/userContactListSlice";
import { UserInterface } from "@/src/redux/features/userInfoSlice";
import { useAppSelector } from "@/src/redux/hooks";
import Image from "next/image";
import { FC, useEffect } from "react";

interface ReplyContentSectionProps {
    isReplied: boolean,
    repliedMessage: recievedMessageInterface | undefined,
    containerClassName?: string
}

const ReplyContentSection: FC<ReplyContentSectionProps> = ({
    isReplied,
    repliedMessage,
    containerClassName
}) => {

    const userContactList = useAppSelector(state => state.userContactsList).contacts
    const user = useAppSelector(state => state.userInfo).User


    let sender: contactInterface | UserInterface

    if (repliedMessage?.messageInfo.senderId === user._id) sender = user
    else {
        let senderFromContact = userContactList.filter(contact => {
            if (contact._id === repliedMessage?.messageInfo.senderId) {
                return contact
            }
        })[0]
        sender = senderFromContact
    }

    return (
        <div className={`flex items-center gap-2 ${containerClassName ?? ''}`}>
            {
                repliedMessage?.messageInfo.content.file && repliedMessage?.messageInfo.content.file.contentType === messageTypes.photo && <div>
                    <Image width={40} height={40} alt="" src={fileHandler(repliedMessage.messageInfo.content.file)} className="w-[40px] h-[40px]" />
                </div>
            }
            <div className="flex flex-col">
                <p className="username text-blue-500 font-semibold text-sm">{sender.name}</p>
                <p className="text-black text-sm font-light">
                    {
                        repliedMessage?.messageInfo.content.text !== ''
                            ? repliedMessage?.messageInfo.content.text
                            : repliedMessage?.messageInfo.content.file.contentType
                    }
                </p>
            </div>
        </div>
    );
}

export default ReplyContentSection;