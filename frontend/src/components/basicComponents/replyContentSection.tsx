import { messageTypes } from "@/src/models/enum";
import { recievedMessageInterface } from "@/src/models/interface";
import { contactInterface } from "@/src/redux/features/userContactListSlice";
import { UserInterface } from "@/src/redux/features/userInfoSlice";
import { useAppSelector } from "@/src/redux/hooks";
import Image from "next/image";
import { FC } from "react";

interface ReplyContentSectionProps {
    isReplied: boolean,
    repliedMessage: recievedMessageInterface,
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

    if (repliedMessage.senderId === user._id) sender = user
    else {
        let senderFromContact = userContactList.filter(contact => {
            if (contact._id === repliedMessage.senderId) {
                return contact
            }
        })[0]
        sender = senderFromContact
    }


    let fileName: any[] = []
    if (isReplied && repliedMessage.content.url) {
        const fileFullUrl = repliedMessage.content.url.split('\\')
        fileName = fileFullUrl.slice(fileFullUrl.length - 3, fileFullUrl.length)
    }

    return (
        <div className={`${containerClassName ?? 'flex items-center gap-2'}`}>
            {
                repliedMessage.content.contentType === messageTypes.photo && <div>
                    <Image width={40} height={40} alt="" src={`/${fileName[0]}/${fileName[1]}/${fileName[2]}`} className="w-[40px] h-[40px]" />
                </div>
            }
            <div className="flex flex-col">
                <p className="username text-blue-500 font-semibold text-sm">{sender.name}</p>
                <p className="text-black text-sm font-light">
                    {
                        repliedMessage.content.text !== ''
                            ? repliedMessage.content.text
                            : repliedMessage.content.contentType
                    }
                </p>
            </div>
        </div>
    );
}

export default ReplyContentSection;