"use client"

import {
    BiUser,
    BiPhoneCall,
    BiAt,
    BiFolder,
    BiRecycle,
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
interface FoldersProps {

}

const Folders: FC<FoldersProps> = ({

}) => {
    const [createFolder, setCreateFolder] = useState(false)
    const [addChat, setAddChat] = useState(false)
    const createForlderOpen = () => {
        setCreateFolder(!createFolder)
    }
    const addChatOpen = () => {
        setAddChat(!addChat)
    }

    const [chatIds, setChatIds] = useState<string[]>([])
    const [folderName, setFolderName] = useState('')

    const dispatch = useAppDispatch()
    const saveFolderHandler = async () => {
        // add userId to memberIds

        try {
            let formData = new FormData()
            formData.append('name', folderName)
            chatIds.map(cId => {
                formData.append('chatIds', cId)
            })

            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const res = await callApi().post('/main/folder/', formData, config)
            console.log('createFolder res : ', res)
            if (res.status === 201 || res.statusText === 'created') {

                let newFolder = {
                    _id: res.data.value._id,
                    name: res.data.value.name
                }
                // dispatch(addFolder(newFolder))
            }
        } catch (error) {
            console.log('error in catch text info : ', error)
        }
        // setAddChat()
    }

    useEffect(() => {
        console.log('chatIds : ', chatIds)
    }, [chatIds])
    return (
        <>
            <div className="w-full h-full py-5">
                <div className="flex justify-center bg-gray-100 py-5">
                    <BiFolder />
                    <p className="text-gray-500">
                        Create folders for diffrent groups of chats
                        and quickly switch between them.
                    </p>
                </div>
                <div className="folders px-5">
                    <p className="text-blue-500">My folders</p>
                    {/* example folder */}
                    <div className="flow-root">
                        <div className="float-left flex gap-3">
                            <BiSolidFolder className="text-xl text-blue-500" />
                            <div>
                                <span className='text-sm'>Work</span>
                                <span className='text-xs text-gray-500'>6 chats</span>
                            </div>
                        </div>
                        <ImBin2 className="float-right text-gray-300" />
                    </div>
                </div>
                <div className="createFolderBtn flex gap-3 text-blue-500 px-5 hover:bg-gray-100"
                    onClick={createForlderOpen}
                >
                    <AiFillPlusCircle className="" />
                    <span className="">Create new Folder</span>
                </div>
            </div>

            {
                addChat ?

                    <CustomizedDialogs
                        open={addChat}
                        title="Include Chats"
                        handelOpen={addChatOpen}
                        children={<AddChats addChatOpen={addChatOpen} chatIds={chatIds} setChatIds={setChatIds}
                            createForlderOpen={createForlderOpen} />} />

                    : (createFolder
                        ? <CustomizedDialogs
                            open={createFolder}
                            title="New Folder"
                            handelOpen={createForlderOpen}
                            children={<CreateFolder
                                saveFolderHandler={saveFolderHandler} addChatOpen={addChatOpen} folderName={folderName} setFolderName={setFolderName}
                                createForlderOpen={createForlderOpen} />} />
                        : null)

            }

        </>
    )
}

export default Folders;