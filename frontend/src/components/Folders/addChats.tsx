"use client"

import {
    BiUser,
    BiPhoneCall,
    BiAt,
    BiFolder,
    BiRecycle,
    BiSolidFolder,
    BiX,
    BiChat,
    BiSearch

} from "react-icons/bi";
import { Dispatch, FC, LegacyRef, SetStateAction, useState } from "react";
import { useAppSelector } from "@/src/redux/hooks";
import { ImBin2 } from "react-icons/im";
import { AiFillPlusCircle } from "react-icons/ai";
import CustomizedDialogs from "../popUp";
import Input from "../auth/input";
import InputField from "../auth/input/inputField";
import PopUpBtns from "../popUp/popUpBtns";
import ChatBox from "./chatBox";
import { profilePicNameHandler } from "@/src/helper/userInformation";
interface AddChatsProps {
    chatIds: string[],
    setChatIds: Dispatch<SetStateAction<string[]>>
    addChatOpen: () => void,
    createForlderOpen: () => void
}

const AddChats: FC<AddChatsProps> = ({
    chatIds,
    setChatIds,
    addChatOpen,
    createForlderOpen
}) => {

    const selectChat = (chatId: string, chatBoxRef: LegacyRef<HTMLDivElement> | undefined) => {
        // styling selected contact :
        // @ts-ignore
        chatBoxRef.current.style = `
            width:56px;
            height:56px;
            border-radius:100%;
            display:flex;
            flex-direction:column;
            align-items:center;
            border:2px dashed blue;
            cursor:pointer;
            position:relative;
        `
        // contactBoxRef.current.style.before = 'content:"a"'
        // @ts-ignore
        setChatIds(chatIdsArr => [...chatIdsArr, chatId])
        let counter = 0
        chatIds.map(Id => {
            if (Id === chatId) {
                counter = counter + 1
                if (counter === 1) {
                    const filteredSelectedMember = chatIds.filter(mId => mId !== chatId)
                    setChatIds(filteredSelectedMember)

                    // remove styling of unSelected contact :
                    // @ts-ignore
                    chatBoxRef.current.style = ''
                }
            }
        })


    }

    const cancleHandler = () => {
        addChatOpen()
        createForlderOpen()
        setChatIds([])
    }
    const saveHandler = () => {
        addChatOpen()

    }
    const chatList = useAppSelector(state => state.userChatList).chatList
    return (
        <>
            <div className="py-5 w-full h-full">
                <div className="search-contacts flex pl-[15px]">
                    <BiSearch className="text-xl text-gray-400  mt-[15px]" />
                    <input type="text" className='outline-none bg-transparent w-full border-none p-3' placeholder='Search..' />
                </div>
                <div className=""><hr className="w-full text-gray-100 opacity-[.3]" /></div>
                <div className="no-scrollbar h-full overflow-y-auto pb-[30%] pt-3">
                    <p className="bg-gray-100 px-5 py-2 text-gray-500">Chats</p>
                    {
                        // @ts-ignore
                        (chatList.length === 0) ? null
                            : chatList.map((chatBox) => (
                                <ChatBox
                                    key={chatBox._id}
                                    profilePicName=
                                    {chatBox.chatInfo.profilePic ? `/uploads/photo/${profilePicNameHandler(chatBox.chatInfo)}`
                                        : '/uploads/photo/defaultProfilePic.png'}
                                    chatId={chatBox._id}
                                    chatName={chatBox.chatInfo.name}
                                    // chatBoxClickHandler={chatBoxClickHandler}
                                    selectChat={selectChat}
                                />

                            ))
                    }

                </div>
                <PopUpBtns
                    title1="Cancel"
                    title2="Save"
                    id1="cancel"
                    id2="save"
                    name1="cancel"
                    name2="save"
                    onClickHandler1={cancleHandler}
                    onClickHandler2={saveHandler}
                />
            </div>

        </>
    )
}

export default AddChats;