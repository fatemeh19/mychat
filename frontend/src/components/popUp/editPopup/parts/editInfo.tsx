import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { Form, Formik } from "formik";
import * as yup from 'yup'
import { setIsEditChat } from "@/src/redux/features/chatSlice";
import ProfileImgSelector from "@/src/components/completeInformationForm/profileImgSelector";
import InputField from "@/src/components/auth/input/inputField";
import PopUpBtns from "../../popUpBtns";


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
    const formikbtnRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        setChatProfilePicName(chatProfilePic[chatProfilePic.length - 1])
        setFormikbtnRef(formikbtnRef)
    }, [])

    const initialValues = {
        chatName: chatName
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
                        <div className="no-scrollbar flex overflow-y-auto w-full ">
                            <ProfileImgSelector chatProfilePicName={chatProfilePicName} setImage={setImage} styleClassName={'!w-24 !h-24'} />
                            <InputField name="chatName" label="chat name" containerClassName={'w-full !mr-0'} />
                        </div>
                    </div>
                    <button type="submit" ref={formikbtnRef} hidden ></button>
                </Form>
            </Formik>
        </>
    );
}

export default EditChatInfo;