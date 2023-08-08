"use client"

import {
    BiUser,
    BiPhoneCall,
    BiAt,
    BiFolder,
    BiRecycle,
    BiSolidFolder,
    BiX,
    BiChat

} from "react-icons/bi";
import { FC, useState } from "react";
import { useAppSelector } from "@/src/redux/hooks";
import { ImBin2 } from "react-icons/im";
import { AiFillPlusCircle } from "react-icons/ai";
import CustomizedDialogs from "../popUp";
import Input from "../auth/input";
import InputField from "../auth/input/inputField";
interface CreateFolderProps {

}

const CreateFolder: FC<CreateFolderProps> = ({

}) => {
    // const [createFolder, setCreateFolder] = useState(false)
    // const createForlderHandler = () => {
    //     setCreateFolder(!createFolder)
    // }
    return (
        <>
            <div className="py-5 w-full h-full">
                <div className="">
                    {/* <p className="text-blue-500 ">Folder name</p> */}
                    <InputField name='name' label="Folder name" icon={BiSolidFolder} />
                </div>

                <div>

                    <p className="text-blue-500">Included chats</p>
                    <div className="createFolderBtn flex gap-3 text-blue-500 px-5 hover:bg-gray-100"
                    // onClick={createForlderHandler}
                    >
                        <AiFillPlusCircle className="" />
                        <span className="">Add chats</span>
                    </div>
                    <div className="chats px-5">
                        <div className="flow-root">
                            <div className="float-left flex gap-3">
                                <BiChat className="text-xl text-blue-500" />
                                <div>
                                    <span className='text-sm'>contact1</span>
                                    {/* <span className='text-xs text-gray-500'>6 chats</span> */}
                                </div>
                            </div>
                            <BiX className="float-right text-gray-300 hover:text-gray-500" />
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default CreateFolder;