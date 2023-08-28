import { Dispatch, FC, SetStateAction } from "react";
import InputField from "../../auth/input/inputField";
import { Form, Formik } from "formik";
import * as yup from 'yup'
import PopUpBtns from "../../popUp/popUpBtns";
import { profilePicInterface } from "@/src/models/interface";
import { UserInterface } from "@/src/redux/features/userInfoSlice";

interface EditNameProps {
    setNameOpen: Dispatch<SetStateAction<boolean>>,
    User: UserInterface,
    setUserInfo: Dispatch<SetStateAction<{
        name: string;
        lastName: string;
        phoneNumber: string;
        email: string;
        username: string;
        profilePic: profilePicInterface;
    }>>
}

const EditName: FC<EditNameProps> = ({ setNameOpen, User, setUserInfo }) => {

    const submitHandler = (values: any) => {
        console.log('edit my name values:', values)
        setUserInfo((prevState) => ({ ...prevState, name: values.name, lastName: values.lastname }))
        setNameOpen(false)
    }
    const validation = yup.object().shape({
        name: yup.string().required(),
    })
    return (
        <Formik
            initialValues={{ name: User.name, lastname: User.lastname }}
            validationSchema={validation}
            onSubmit={(values) => submitHandler(values)}
        >
            <Form>
                <div className="overflow-hidden w-full flex flex-col items-end relative select-none pb-[50px]">
                    <div className="no-scrollbar flex flex-col overflow-y-auto w-full px-5">
                        <InputField name="name" label="First name" containerClassName={'w-full !mx-0'} />
                        <InputField name="lastName" label="Last name" containerClassName={'w-full !mx-0'} />
                    </div>
                    <PopUpBtns title1="Cancle" id1="cancle" name1="cancle" title2="Save" id2="save" name2="save" onClickHandler1={() => setNameOpen(false)} onClickHandler2={() => { submitHandler }} btnContainerClassName={'flex justify-end gap-5'} />
                </div>
            </Form>
        </Formik>

    );
}

export default EditName;