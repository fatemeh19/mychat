import { FC } from "react";
import InputField from "../../auth/input/inputField";
import { Form, Formik } from "formik";
import * as yup from 'yup'

interface EditUsernameProps {

}

const EditUsername: FC<EditUsernameProps> = () => {

    const submitHandler = (values: any) => console.log(values)
    const validation = yup.object().shape({
        groupName: yup.string().required()
    })
    return (
        <Formik
            initialValues={{ username: '' }}
            validationSchema={validation}
            onSubmit={(values) => submitHandler(values)}
        >
            <Form className="w-full flex gap-5 items-center px-5 pb-3 bg-white shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)]">
                <div className="no-scrollbar flex overflow-y-auto w-full ">
                    <InputField name="username" label="@username" containerClassName={'w-full !mr-0'} />
                </div>
                <div>
                    <p>You can choose a username on myChat. If you do, other people will be able to find you by this username and contact you without knowing your phone number.</p>
                    <p>you cna use a-z, 0-9 and underscores.</p>
                    <p>Minimum length is 5 charecters.</p>

                </div>
            </Form>
        </Formik>
    );
}

export default EditUsername;