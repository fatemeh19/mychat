import { fileHandler } from "@/src/helper/userInformation";
import { messageTypes } from "@/src/models/enum";
import { recievedMessageInterface } from "@/src/models/interface";
import { contactInterface } from "@/src/redux/features/userContactListSlice";
import { UserInterface } from "@/src/redux/features/userInfoSlice";
import { useAppSelector } from "@/src/redux/hooks";
import Image from "next/image";
import { FC, useEffect } from "react";

interface ForwardContentSectionProps {
    isReplied: boolean,
    forwaredMessage: recievedMessageInterface | undefined,
    containerClassName?: string
}

const ForwardContentSection: FC<ForwardContentSectionProps> = ({
    isReplied,
    forwaredMessage,
    containerClassName
}) => {

    const userContactList = useAppSelector(state => state.userContactsList).contacts
    const user = useAppSelector(state => state.userInfo).User
    const forwardMessageIds = useAppSelector(state => state.forwardMessage).forwardMessageIds
    const isEdit = useAppSelector(state => state.editMessage).isEdit


    let sender: contactInterface | UserInterface
    if (forwaredMessage?.messageInfo.senderId === user._id) sender = user
    else {
        let senderFromContact = userContactList.filter(contact => {
            if (contact._id === forwaredMessage?.messageInfo.senderId) {
                return contact
            }
        })[0]
        sender = senderFromContact
    }

    return (
        <div className={`flex items-center gap-2 ${containerClassName ?? ''}`}>
            {
                forwaredMessage?.messageInfo.content.file && forwaredMessage?.messageInfo.content.file.contentType === messageTypes.photo && <div>
                    <Image width={40} height={40} alt="" src={fileHandler(forwaredMessage.messageInfo.content.file)} className="w-[40px] h-[40px]" />
                </div>
            }
            <div className="flex flex-col">
                {!isEdit
                    ? <p className="username text-blue-500 font-semibold text-sm">{sender.name}</p>
                    : <p className="title text-blue-500 font-semibold text-sm">Edit Message</p>
                }
                <p className="text-black text-sm font-light">
                    {
                        forwaredMessage?.messageInfo.content.text !== ''
                            ? forwardMessageIds.length > 1 ? `${forwardMessageIds.length} messages` : forwaredMessage?.messageInfo.content.text
                            : forwaredMessage?.messageInfo.content.file.contentType
                    }
                </p>
            </div>
        </div>
    );
}

export default ForwardContentSection;