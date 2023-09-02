import { FC } from "react";
import SearchBox from "../../mainPage/leftSideMainPage/chatList/searchBox";
import { useAppSelector } from "@/src/redux/hooks";
import ChatContactBox from "../../mainPage/leftSideMainPage/chatList/chatContactBox";
import { profilePicHandler } from "@/src/helper/userInformation";

interface SelectBlockUserProps {

}

const SelectBlockUser: FC<SelectBlockUserProps> = () => {

    const chatList = useAppSelector(state => state.userChatList).chatList

    return (
        <div>
            <SearchBox />
            <div className="flex w-full items-center justify-around">
                <h1 className="uppercase active ">CHATS</h1>
                <h1 className="uppercase active:text-mainColor">CONTACTS</h1>
            </div>
            {/* <div className="flex flex-col ">
                {
                    chatList.map(chat => {
                        return <ChatContactBox
                            ContactName={chat.chatInfo.name}
                            profilePicName={chat.chatInfo.profilePic ? profilePicHandler(chat) : '/defaults/defaultProfilePic.png'}
                            contactId={chat.chatInfo._id}
                            chatOpennedP={true}
                            lastMessegeByContact={false}
                            status={chat.chatInfo.status}
                            lastMessage={''}
                            ContactSeen={false}
                            lastMessageTime={''}
                            numberOfUnSeen={''}
                            recivedMessage={true}
                            isTyping={false}
                            popup={true}
                        />
                    })
                }
            </div> */}
        </div>
    );
}

export default SelectBlockUser;