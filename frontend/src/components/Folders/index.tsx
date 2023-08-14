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
import { addFolder, addFoldersList, folderInterface } from "@/src/redux/features/folderSlice";
import Image from "next/image";
interface FoldersProps {

}

const Folders: FC<FoldersProps> = ({

}) => {

    //states 
    const [createFolder, setCreateFolder] = useState(false)
    const [addChat, setAddChat] = useState(false)
    const [edit, setEdit] = useState(false)
    const [chatIds, setChatIds] = useState<string[]>([])
    const [folderName, setFolderName] = useState('')
    const [chatsInfo, setChatsInfo] = useState<any[]>([])
    const [folderIdForEdit, setFolderIdForEdit] = useState('')
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
            if (edit) {
                const res = await callApi().put(`/main/folder/${folderIdForEdit}`, formData, config)
                console.log('editFolder res : ', res)
                if (res.status === 200) {
                    let editFolder = {
                        _id: res.data.value.folderId,
                        name: folderName
                    }
                    let newFolders: folderInterface[]
                    newFolders = []
                    for (let i = 0; i < folders.length; i++) {
                        if (folders[i]._id === editFolder._id) {
                            folders[i].name = editFolder.name
                            let j = 0;
                            chatIds.map((chatId) => {
                                folders[i].chats[j].chatInfo = chatId
                                folders[i].chats[j].pinned = false
                                j = j + 1

                            })
                        }
                        newFolders.push(folders[i])
                    }
                    dispatch(addFoldersList(newFolders))
                    setChatIds([])
                    setFolderName('')
                }
            }
            else {

                const res = await callApi().post('/main/folder/', formData, config)
                console.log('createFolder res : ', res)
                if (res.status === 200) {
                    let newFolder = {
                        _id: res.data.value.folderId,
                        name: folderName
                    }
                    dispatch(addFolder(newFolder))
                    setChatIds([])
                    setFolderName('')
                }

            }
        } catch (error) {
            console.log('error in catch text info : ', error)
        }
    }
    const findChatInfo = () => {
        setChatsInfo([])
        for (let i = 0; i < chatIds.length; i++) {
            for (let j = 0; j < chatList.length; j++) {
                if (chatIds[i] === chatList[j]._id) {
                    setChatsInfo(chatInfo => [...chatInfo, chatList[j]]);
                    break;
                }
            }
        }


    }
    const deleteFolder = async (folderId: string) => {

        try {

            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const res = await callApi().delete(`/main/folder/${folderId}`, config)
            console.log('delete folder res : ', res)
            if (res.status === 200) {
                let counter = 0
                folders.map(folder => {
                    if (folder._id === folderId) {
                        counter = counter + 1
                        if (counter === 1) {
                            const filteredSelectedfolder = folders.filter(folder => folder._id !== folderId)
                            dispatch(addFoldersList(filteredSelectedfolder))
                        }
                    }
                })

            }
        } catch (error) {
            console.log('error in catch text info : ', error)
        }
    }
    const editFolder = (folder: folderInterface) => {
        setEdit(true)
        setFolderIdForEdit(folder._id)
        let folderChatIds: string[];
        folderChatIds = []
        folder.chats.map(chat => {
            folderChatIds.push(chat.chatInfo)
        })
        setChatIds(folderChatIds)
        setFolderName(folder.name)
        createForlderOpen()
    }

    useEffect(() => {
        console.log('chatIds : ', chatIds)
        findChatInfo();
    }, [chatIds])

    return (
        <>
            <div className="w-full h-full pb-3
            shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)]">
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

                                <div onClick={() => editFolder(folder)}
                                    className="flow-root mt-3" key={folder._id}>
                                    <div className="float-left flex gap-3">
                                        <BiSolidFolder className="m-auto text-xl text-blue-500" />
                                        <div className="grid">
                                            <span className='text-sm'>{folder.name}</span>
                                            <span className='text-xs text-gray-500'>6 chats</span>
                                        </div>
                                    </div>
                                    <ImBin2 onClick={() => deleteFolder(folder._id)}
                                        className="float-right text-gray-300 cursor-pointer hover:text-gray-500" />
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
                            edit={edit}
                            createForlderOpen={createForlderOpen} />} />

                    : (createFolder
                        ? <CustomizedDialogs
                            open={createFolder}
                            title={edit ? "Edit Folder" : "New Folder"}
                            handelOpen={createForlderOpen}
                            children={<CreateFolder chatsInfo={chatsInfo}
                                chatIds={chatIds} setChatIds={setChatIds}
                                saveFolderHandler={saveFolderHandler} addChatOpen={addChatOpen}
                                folderName={folderName} setFolderName={setFolderName}
                                edit={edit} setEdit={setEdit}
                                createForlderOpen={createForlderOpen} />} />
                        : null)

            }

        </>
    )
}

export default Folders;