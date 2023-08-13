"use client"

import {

    BiSolidFolder

} from "react-icons/bi";
import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { ImBin2 } from "react-icons/im";
import { AiFillPlusCircle } from "react-icons/ai";
import CustomizedDialogs from "../popUp";
import CreateFolder from "./createFolder";
import AddChats from "./addChats";
import callApi from "@/src/helper/callApi";
import { addFolder } from "@/src/redux/features/folderSlice";
import Image from "next/image";
interface FoldersProps {

}

const Folders: FC<FoldersProps> = ({

}) => {

    //states 
    const [createFolder, setCreateFolder] = useState(false)
    const [addChat, setAddChat] = useState(false)
    const [chatIds, setChatIds] = useState<string[]>([])
    const [folderName, setFolderName] = useState('')
    const [chatsInfo, setChatsInfo] = useState<any[]>([])

    // redux states
    const folders = useAppSelector(state => state.folders).folders
    const chatList = useAppSelector(state => state.userChatList).chatList
    // dispatch
    const dispatch = useAppDispatch()

    // functions
    const createForlderOpen = () => {
        setCreateFolder(!createFolder)
    }
    const addChatOpen = () => {
        setAddChat(!addChat)
    }
    const saveFolderHandler = async () => {

        try {

            let formData = {
                name: folderName,
                chatIds: chatIds
            }
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            console.log(formData)
            const res = await callApi().post('/main/folder/', formData, config)
            console.log('createFolder res : ', res)
            if (res.status === 200) {

                let newFolder = {
                    _id: res.data.value._id,
                    name: folderName
                }
                dispatch(addFolder(newFolder))
            }
        } catch (error) {
            console.log('error in catch text info : ', error)
        }
    }
    const findChatInfo = () => {
        if (chatIds.length !== 0) {
            for (let i = 0; i < chatIds.length; i++) {
                for (let j = 0; j < chatList.length; j++) {
                    if (chatIds[i] === chatList[j]._id) {
                        setChatsInfo(chatInfo => [...chatInfo, chatList[j]]);
                        break;
                    }
                }
            }

        }
    }

    useEffect(() => {
        console.log('chatIds : ', chatIds)
        findChatInfo();
    }, [chatIds])

    return (
        <>
            <div className="w-full h-full pb-3">
                <div className="grid m-auto bg-gray-100 pb-3">
                    <div className="flex justify-center">
                        <Image
                            src='/images/icons8-folder-500.png'
                            className="w-[150px] h-[150px]"
                            width={500} height={50} alt="folder" />
                    </div>

                    <p className="text-gray-500 text-sm text-center px-5">
                        Create folders for diffrent groups of chats
                        and quickly switch between them.
                    </p>
                </div>
                <div className="folders px-5 py-3">
                    <p className="text-blue-500 font-bold mb-5">My folders</p>
                    {
                        (folders.length === 0) ? null
                            : folders.map((folder) => (

                                <div className="flow-root mt-3" key={folder._id}>
                                    <div className="float-left flex gap-3">
                                        <BiSolidFolder className="m-auto text-xl text-blue-500" />
                                        <div className="grid">
                                            <span className='text-sm'>{folder.name}</span>
                                            <span className='text-xs text-gray-500'>6 chats</span>
                                        </div>
                                    </div>
                                    <ImBin2 className="float-right text-gray-300" />
                                </div>

                            ))

                    }
                </div>
                <div className="createFolderBtn cursor-pointer flex gap-3 text-blue-500 py-1 px-5 hover:bg-gray-100"
                    onClick={createForlderOpen}
                >
                    <AiFillPlusCircle className="text-[21px]" />
                    <span className="font-semibold">Create new Folder</span>
                </div>
            </div>

            {
                addChat ?

                    <CustomizedDialogs
                        open={addChat}
                        title="Include Chats"
                        handelOpen={addChatOpen}
                        children={<AddChats addChatOpen={addChatOpen} chatsInfo={chatsInfo}
                            chatIds={chatIds} setChatIds={setChatIds}
                            createForlderOpen={createForlderOpen} />} />

                    : (createFolder
                        ? <CustomizedDialogs
                            open={createFolder}
                            title="New Folder"
                            handelOpen={createForlderOpen}
                            children={<CreateFolder chatsInfo={chatsInfo}
                                saveFolderHandler={saveFolderHandler} addChatOpen={addChatOpen}
                                folderName={folderName} setFolderName={setFolderName}
                                createForlderOpen={createForlderOpen} />} />
                        : null)

            }

        </>
    )
}

export default Folders;