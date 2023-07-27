import { messageTypes } from "@/src/models/enum";
import { setShowReply } from "@/src/redux/features/repliedMessageSlice";
import { contactInterface } from "@/src/redux/features/userContactListSlice";
import { UserInterface } from "@/src/redux/features/userInfoSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import Image from "next/image";
import { Dispatch, FC, SetStateAction } from "react";
import { BsFillReplyFill } from "react-icons/bs";
import { GrClose } from 'react-icons/gr'
interface ReplySectionProps {
    // showReply: boolean,
    // setShowReply: Dispatch<SetStateAction<boolean>>
}

const ReplySection: FC<ReplySectionProps> = () => {

    const dispatch = useAppDispatch()

    const showReply = useAppSelector(state => state.repledMessage).ShowReply
    const repliedMessage = useAppSelector(state => state.repledMessage).RepliedMessage
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
    if (showReply && repliedMessage.content.url) {
        const fileFullUrl = repliedMessage.content.url.split('\\')
        fileName = fileFullUrl.slice(fileFullUrl.length - 3, fileFullUrl.length)
    }

    console.log(sender)
    // console.log(repliedMessage)
    return (
        <>
            {
                showReply && <div className="bg-white flex justify-between items-center px-4 pt-2 font-[vazir] select-none">
                    <div className="left flex items-center gap-2">
                        <BsFillReplyFill className={`w-[25px] h-[25px] text-blue-500`} />
                        <div className=" flex items-center justify-center gap-2">
                            {
                                repliedMessage.content.contentType === messageTypes.picture && <div>
                                    <Image width={40} height={40} alt="" src={`/${fileName[0]}/${fileName[1]}/${fileName[2]}`} className="w-[40px] h-[40px]" />
                                </div>
                            }
                            <div className="flex flex-col">
                                <p className="username text-blue-500 font-semibold text-sm">{sender.name}</p>
                                <p className="text-black break-all whitespace-pre-line text-sm">
                                    {
                                        repliedMessage.content.text !== ''
                                            ? repliedMessage.content.text
                                            : repliedMessage.content.contentType
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="righ cursor-pointer" onClick={() => dispatch(setShowReply(false))}>
                        <GrClose />
                    </div>
                </div>
            }
        </>
    );
}

export default ReplySection;