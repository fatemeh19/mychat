"use client"

import {
    BiUser,
    BiPhoneCall,
    BiAt,
    BiFolder,
    BiRecycle,
    BiSolidFolder

} from "react-icons/bi";
import { FC, useState } from "react";
import { useAppSelector } from "@/src/redux/hooks";
import { ImBin2 } from "react-icons/im";
import { AiFillPlusCircle } from "react-icons/ai";
import CustomizedDialogs from "../popUp";
import CreateFolder from "./createFolder";
interface FoldersProps {

}

const Folders: FC<FoldersProps> = ({

}) => {
    const [createFolder, setCreateFolder] = useState(false)
    const createForlderHandler = () => {
        setCreateFolder(!createFolder)
    }
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
                    onClick={createForlderHandler}
                >
                    <AiFillPlusCircle className="" />
                    <span className="">Create new Folder</span>
                </div>
            </div>
            {createFolder
                ? <CustomizedDialogs
                    open={createFolder}
                    title="New Folder"
                    handelOpen={createForlderHandler}
                    children={<CreateFolder />} />
                : null
            }
        </>
    )
}

export default Folders;