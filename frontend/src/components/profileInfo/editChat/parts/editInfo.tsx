import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/src/redux/hooks";
import { Form, Formik } from "formik";
import * as yup from 'yup'
import ProfileImgSelector from "@/src/components/completeInformationForm/profileImgSelector";
import InputField from "@/src/components/auth/input/inputField";
import { TextareaAutosize } from "@mui/material";
import { profilePicHandler } from "@/src/helper/userInformation";


interface EditChatInfoProps {
    setFormikbtnRef: Dispatch<SetStateAction<any>>,
    setImage: Dispatch<SetStateAction<string>>,
    chatName: string,
    chatDescription: string,
    setChatName: Dispatch<SetStateAction<string>>,
    formikSubmitHandler: (values: any) => void
}

const EditChatInfo: FC<EditChatInfoProps> = ({ setFormikbtnRef, setImage, chatName, chatDescription, formikSubmitHandler }) => {

    const chat = useAppSelector(state => state.chat).Chat
    const contact = useAppSelector(state => state.userContact).Contact

    const [chatProfilePicName, setChatProfilePicName] = useState('')
    const formikbtnRef = useRef<HTMLButtonElement>(null)


    useEffect(() => {
        // console.log('chat in editInfo: ', chat)
        // console.log('contact in editInfo: ', contact)
        setChatProfilePicName(profilePicHandler(chat))
        setFormikbtnRef(formikbtnRef)
    }, [chat])

    const initialValues = {
        chatName: chatName,
        description: chatDescription
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
                {
                    props => (
                        <Form >
                            <div className="overflow-hidden w-full flex flex-col items-end gap-5 relative select-none p-[25px] bg-white
                                shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)]">
                                <div className="no-scrollbar flex flex-col overflow-y-auto w-full ">
                                    <div className="flex w-full">
                                        <ProfileImgSelector chatProfilePicName={chatProfilePicName} setImage={setImage} styleClassName={'!w-24 !h-24'} />
                                        <InputField name="chatName" label="chat name" containerClassName={'w-full !mr-0'} />
                                    </div>
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
                                        value={props.values.description}
                                        onChange={props.handleChange}
                                        name="description"
                                        id="description"
                                    />
                                </div>
                            </div>
                            <button type="submit" ref={formikbtnRef} hidden ></button>
                        </Form>

                    )
                }
            </Formik>
        </>
    );
}

export default EditChatInfo;