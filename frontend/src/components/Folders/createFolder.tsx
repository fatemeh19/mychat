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
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useAppSelector } from "@/src/redux/hooks";
import { ImBin2 } from "react-icons/im";
import { AiFillPlusCircle } from "react-icons/ai";
import CustomizedDialogs from "../popUp";
import Input from "../auth/input";
import InputField from "../auth/input/inputField";
import PopUpBtns from "../popUp/popUpBtns";
import { Form, Formik } from "formik";
import * as yup from 'yup'
interface CreateFolderProps {
    addChatOpen: () => void,
    createForlderOpen: () => void,
    folderName: string,
    saveFolderHandler: () => void
    setFolderName: Dispatch<SetStateAction<string>>
}

const CreateFolder: FC<CreateFolderProps> = ({
    addChatOpen,
    createForlderOpen,
    folderName,
    saveFolderHandler,
    setFolderName
}) => {
    // const [createFolder, setCreateFolder] = useState(false)
    // const createForlderHandler = () => {
    //     setCreateFolder(!createFolder)
    // }
    const initialValues = {
        folderName: folderName
    }

    const validation = yup.object().shape({
        folderName: yup.string().required()
    })

    const submitHandler = (values: any) => {
        setFolderName(values.folderName)
        if (folderName != undefined) {
            saveFolderHandler()
            console.log('create folder', values)
        }
        createForlderOpen()
    }
    return (
        <>


            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    submitHandler(values)
                }}
                validationSchema={validation}
            >
                <Form >
                    <div className="py-2 w-full h-full">
                        <div className="mb-2">
                            {/* <p className="text-blue-500 ">Folder name</p> */}
                            <InputField name='folderName' label="Folder name" icon={BiSolidFolder} />
                        </div>

                        <div>

                            <p className="text-blue-500 my-1 px-5">Included chats</p>
                            <div className="addChatBtn cursor-pointer flex gap-3 text-blue-500 py-1 px-5 hover:bg-gray-100"
                                onClick={() => {
                                    createForlderOpen()
                                    addChatOpen()
                                }}
                            >
                                <AiFillPlusCircle className="text-[21px]" />
                                <span className="font-bold">Add chats</span>
                            </div>
                            <div className="chats my-1 px-5">
                                {/* example chat */}
                                <div className="flow-root">
                                    <div className="float-left flex gap-3">
                                        <BiSolidFolder className="text-xl text-blue-500" />
                                        <div>
                                            <span className='text-sm'>contact1</span>
                                            {/* <span className='text-xs text-gray-500'>6 chats</span> */}
                                        </div>
                                    </div>
                                    <BiX className="float-right text-gray-300 hover:text-gray-500" />
                                </div>
                            </div>

                        </div>
                        {/* <PopUpBtns
                            title1="Cancel"
                            title2="Create"
                            id1="cancel"
                            id2="create"
                            name1="cancel"
                            name2="create"
                            onClickHandler1={createForlderOpen}
                            onClickHandler2={saveFolderHandler}
                        /> */}

                        <div className="flex justify-end gap-5 px-5">
                            <button
                                id="cancel"
                                name="cancel"
                                onClick={createForlderOpen}
                                className="font-semibold cursor-pointer bg-white hover:text-sky-700 transition-all duration-150 text-sky-500 outline-none text-base "
                            >Cancle</button>
                            <button
                                type="submit"
                                id="create"
                                name="create"
                                className="font-semibold cursor-pointer bg-white hover:text-sky-700 transition-all duration-150 text-sky-500 outline-none text-base "
                            >Create</button>
                        </div>
                    </div>

                </Form>
            </Formik>

        </>
    )
}

export default CreateFolder;