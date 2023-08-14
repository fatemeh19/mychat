"use client"

import {
    BiSolidFolder,
    BiX,
} from "react-icons/bi";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import InputField from "../auth/input/inputField";
import { Form, Formik } from "formik";
import * as yup from 'yup'
import { BsChatTextFill } from "react-icons/bs";
import { useAppSelector } from "@/src/redux/hooks";
interface CreateFolderProps {
    addChatOpen: () => void,
    createForlderOpen: () => void,
    folderName: string,
    saveFolderHandler: () => void
    setFolderName: Dispatch<SetStateAction<string>>,
    chatsInfo: any[],
    chatIds: string[],
    setChatIds: Dispatch<SetStateAction<string[]>>,
    setEdit: (bol: boolean) => void,
    edit: boolean
}

const CreateFolder: FC<CreateFolderProps> = ({
    addChatOpen,
    createForlderOpen,
    folderName,
    saveFolderHandler,
    setFolderName,
    chatsInfo,
    chatIds,
    setChatIds,
    setEdit,
    edit
}) => {

    const initialValues = {
        folderName: folderName
    }

    const validation = yup.object().shape({
        folderName: yup.string().required()
    })

    const submitHandler = (values: any) => {
        setFolderName(values.folderName)
        if (folderName !== '') {
            saveFolderHandler()
            console.log('create or edit folder', values)
        }
        createForlderOpen()
    }
    const removeChat = (chatId: string) => {
        let counter = 0
        chatIds.map(Id => {
            if (Id === chatId) {
                counter = counter + 1
                if (counter === 1) {
                    const filteredSelectedMember = chatIds.filter(mId => mId !== chatId)
                    setChatIds(filteredSelectedMember)
                }
            }
        })
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
                        <div className="pb-2 shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)]">
                            {/* <p className="text-blue-500 ">Folder name</p> */}
                            <InputField name='folderName' label="Folder name" icon={BiSolidFolder} />
                        </div>
                        <div className="py-2 w-full bg-gray-100">

                        </div>
                        <div>

                            <p className="text-blue-500 my-1 px-5 font-bold">Included chats</p>
                            <div className="addChatBtn cursor-pointer flex gap-3 text-blue-500 py-1 px-5 hover:bg-gray-100"
                                onClick={() => {
                                    createForlderOpen()
                                    addChatOpen()
                                }}
                            >
                                <AiFillPlusCircle className="text-[21px]" />
                                <span className="font-semibold">Add chats</span>
                            </div>
                            <div className="chats my-2 px-5">
                                {/* example chat */}
                                {
                                    (chatsInfo.length !== 0) ?
                                        chatsInfo.map((chat) => (
                                            <div className="flow-root" key={chat._id}>
                                                <div className="float-left flex gap-3">
                                                    <BsChatTextFill className="text-xl m-auto text-blue-500" />
                                                    <div>
                                                        <span className='text-sm'>{chat.chatInfo.name}</span>
                                                        {/* <span className='text-xs text-gray-500'>6 chats</span> */}
                                                    </div>
                                                </div>
                                                <BiX onClick={() => removeChat(chat._id)}
                                                    className="float-right text-gray-300 cursor-pointer hover:text-gray-500" />
                                            </div>
                                        ))
                                        : null
                                }

                                {/* <div className="flow-root">
                                    <div className="float-left flex gap-3">
                                        <BsChatTextFill className="text-xl m-auto text-blue-500" />
                                        <div>
                                            <span className='text-sm'>contact1</span>
                                            
                                        </div>
                                    </div>
                                    <BiX className="float-right text-gray-300 hover:text-gray-500" />
                                </div>  */}
                            </div>

                        </div>

                        <div className="flex justify-end gap-5 px-5">
                            <button
                                id="cancel"
                                name="cancel"
                                onClick={() => {
                                    createForlderOpen();
                                    setEdit(false);
                                    setChatIds([]);
                                    setFolderName('');

                                }}
                                className="font-semibold cursor-pointer bg-white hover:text-sky-700 transition-all duration-150 text-sky-500 outline-none text-base "
                            >Cancle</button>
                            <button
                                type="submit"
                                id="create"
                                name="create"
                                className="font-semibold cursor-pointer bg-white hover:text-sky-700 transition-all duration-150 text-sky-500 outline-none text-base "
                            >
                                {edit ? 'Edit' : 'Create'}
                            </button>
                        </div>
                    </div>

                </Form>
            </Formik>

        </>
    )
}

export default CreateFolder;