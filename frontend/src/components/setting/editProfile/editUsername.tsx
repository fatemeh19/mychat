import { Dispatch, FC, SetStateAction } from "react";
import InputField from "../../auth/input/inputField";
import { Form, Formik } from "formik";
import * as yup from 'yup'
import { UserInterface } from "@/src/redux/features/userInfoSlice";
import { profilePicInterface } from "@/src/models/interface";
import PopUpBtns from "../../popUp/popUpBtns";

interface EditUsernameProps {
    setUsernameOpen: Dispatch<SetStateAction<boolean>>,
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

const EditUsername: FC<EditUsernameProps> = ({ setUsernameOpen, User, setUserInfo }) => {

    const submitHandler = (values: any) => {
        console.log(values)
        setUserInfo(prevState => ({ ...prevState, username: values.username }))
        setUsernameOpen(false)
    }
    const validation = yup.object().shape({
        username: yup.string().required().min(5).matches(/^[A-Za-z0-9_]+$/, 'you only can use a-z, 0-9 and underscores')
    })
    return (
        <Formik
            initialValues={{ username: User.username }}
            validationSchema={validation}
            onSubmit={(values) => submitHandler(values)}
        >
            <Form >
                <div className="overflow-hidden w-full flex flex-col items-end relative select-none pb-[50px] bg-gray-100">
                    <div className="no-scrollbar flex flex-col overflow-y-auto w-full px-5 bg-white shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)]">
                        <InputField name="username" label="@username" containerClassName={'w-full !mx-0'} />
                    </div>
                    <div className="w-full flex flex-col gap-5 px-5 py-3 text-gray-600 text-sm">
                        <p>You can choose a username on myChat. If you do, other people will be able to find you by this username and contact you without knowing your phone number.</p>
                        <div>
                            <p>you cna use a-z, 0-9 and underscores.</p>
                            <p>Minimum length is 5 charecters.</p>
                        </div>
                    </div>
                    <PopUpBtns title1="Cancle" id1="cancle" name1="cancle" title2="Save" id2="save" name2="save" onClickHandler1={() => setUsernameOpen(false)} onClickHandler2={() => { submitHandler }} btnContainerClassName={'flex justify-end gap-5'} />
                </div>
            </Form>
        </Formik>
    );
}

export default EditUsername;