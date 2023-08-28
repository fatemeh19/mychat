import { profilePicInterface } from "@/src/models/interface";
import { UserInterface } from "@/src/redux/features/userInfoSlice";
import { Form, Formik } from "formik";
import { Dispatch, FC, SetStateAction } from "react";
import * as yup from 'yup'
import InputField from "../../auth/input/inputField";
import PopUpBtns from "../../popUp/popUpBtns";

interface EditPhoneNumberProps {
    setPhonNumberOpen: Dispatch<SetStateAction<boolean>>,
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

const EditPhoneNumber: FC<EditPhoneNumberProps> = ({ setPhonNumberOpen, User, setUserInfo }) => {

    const submitHandler = (values: any) => {
        console.log(values)
        setUserInfo(prevState => ({ ...prevState, phoneNumber: values.phoneNumber }))
        setPhonNumberOpen(false)
    }
    const validation = yup.object().shape({
        phoneNumber: yup.string().required().max(11).min(11)
    })
    return (
        <Formik
            initialValues={{ phoneNumber: User.phoneNumber }}
            validationSchema={validation}
            onSubmit={(values) => submitHandler(values)}
        >
            <Form >
                <div className="overflow-hidden w-full flex flex-col items-end relative select-none pb-[50px] bg-gray-100">
                    <div className="no-scrollbar flex flex-col overflow-y-auto w-full px-5 pb-0 pt-4 bg-white shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)]">
                        <InputField name="phoneNumber" label="Phone number" containerClassName={'w-full !mx-0'} />
                    </div>
                    <PopUpBtns title1="Cancle" id1="cancle" name1="cancle" title2="Save" id2="save" name2="save" onClickHandler1={() => setPhonNumberOpen(false)} onClickHandler2={() => { submitHandler }} btnContainerClassName={'flex justify-end gap-5'} />
                </div>
            </Form>
        </Formik>
    );
}

export default EditPhoneNumber;