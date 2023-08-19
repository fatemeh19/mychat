import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { Form, Formik } from "formik";
import * as yup from 'yup'
import { setIsEditChat } from "@/src/redux/features/chatSlice";
import ProfileImgSelector from "@/src/components/completeInformationForm/profileImgSelector";
import InputField from "@/src/components/auth/input/inputField";
import PopUpBtns from "../../popUpBtns";
import Image from "next/image";
import { TextareaAutosize } from "@mui/material";


interface EditChatInfoProps {
    setFormikbtnRef: Dispatch<SetStateAction<any>>,
    setImage: Dispatch<SetStateAction<string>>,
    chatName: string,
    setChatName: Dispatch<SetStateAction<string>>,
    formikSubmitHandler: (values: any) => void
}

const EditChatInfo: FC<EditChatInfoProps> = ({ setFormikbtnRef, setImage, chatName, setChatName, formikSubmitHandler }) => {

    const chatProfilePic = useAppSelector(state => state.chat).Chat.profilePic.split('\\')
    const [chatProfilePicName, setChatProfilePicName] = useState('')
    const [chatDescription, setChatDescription] = useState('')
    const formikbtnRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        setChatProfilePicName(chatProfilePic[chatProfilePic.length - 1])
        setFormikbtnRef(formikbtnRef)
    }, [])

    const initialValues = {
        chatName: chatName,
        description: ''
    }

    const validation = yup.object().shape({
        chatName: yup.string().required()
    })

    return (
        <>

            <Formik
                initialValues={initialValues}
                onSubmit={(values) => formikSubmitHandler(values)}
                validationSchema={validation}
            >
                <Form >
                    <div className="overflow-hidden w-full flex flex-col items-end gap-5 relative select-none p-[25px] bg-white
                                shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)]">
                        <div className="no-scrollbar flex flex-col overflow-y-auto w-full ">
                            <div className="flex w-full">
                                <ProfileImgSelector chatProfilePicName={chatProfilePicName} setImage={setImage} styleClassName={'!w-24 !h-24'} />
                                {/* <Image
                                    width={500}
                                    height={0}
                                    src={
                                        contact.profilePic
                                            ? `/uploads/photo/${profilePicName[profilePicName.length - 1]}`
                                            : '/uploads/photo/defaultProfilePic.png'
                                    }
                                    alt=""
                                    className="w-[70px] h-[70px] object-cover rounded-full"
                                /> */}
                                <InputField name="chatName" label="chat name" containerClassName={'w-full !mr-0'} />
                            </div>
                            {/* <TextareaAutosize /> 
                             */}
                            <TextareaAutosize
                                placeholder="Description (optional)"
                                className="
                                    pt-6
                                    w-full 
                                    bg-transparent
                                    text-[14px]
                                    font-[200]
                                    placeholder:text-sm
                                    focus-visible:outline-none
                                    resize-none
                                    placeholder:leading-[1.8rem]
                                    leading-5
                                    untvisible-scrollbar
                                    font-[Arial,FontAwesome]
                                "
                                maxRows={12}
                                onChange={e => setChatDescription(e.target.value)}
                                value={chatDescription}
                                name="description"
                                id="description"
                            />
                        </div>
                    </div>
                    <button type="submit" ref={formikbtnRef} hidden ></button>
                </Form>
            </Formik>
        </>
    );
}

export default EditChatInfo;