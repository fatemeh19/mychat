import { Form, withFormik } from "formik";
import * as yup from 'yup'
import { BiUser } from "react-icons/bi";
import { BiPhone } from "react-icons/bi";
import { createRef } from "react";
import InputField from "../../auth/input/inputField";
import callApi from "@/src/helper/callApi";


interface addContactFormProps {
    name: string,
    lastName: string,
    phone: string,
    handelOpen?: () => void,
    token: string,
    userId: string
}

let addBtn: any;
let cancelBtn: any;
let add: () => void

const AddContactFormInner = (props: any) => {
    const { handelOpen } = props;
    addBtn = createRef<HTMLButtonElement>()
    cancelBtn = createRef<HTMLButtonElement>()
    add = () => { }

    return (

        <Form className=" w-full px-5">
            <InputField name='name' label="First name" children={<BiUser className='h-auto text-2xl text-gray-500' />} />
            <InputField name='last-name' label="Last name" />
            <InputField name='phone' label="Phone Number" children={<BiPhone className='h-auto text-2xl text-gray-500' />} />
            <div className="my-5 gap-1 flex justify-end">
                {/* <button
                         ref={cancelBtn}
                         id="cancel"
                         name="cancel"
                         onClick={handelOpen}
                        className="font-bold cursor-pointer bg-white hover:bg-gray-500 transition-all duration-150 text-sky-500 p-3 outline-none rounded-lg "
                     >Cancel</button> */}
                <button
                    ref={addBtn}
                    id="add-contact"
                    name="add contact"
                    type='submit'
                    className="font-bold cursor-pointer bg-white hover:text-sky-700 transition-all duration-150 text-sky-500  outline-none "
                >Create</button>
            </div>
        </Form>

    );
}

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const addContactFormValidationSchema = yup.object().shape({
    name: yup.string().required().min(3, 'Atleast enter 3 words'),
    phone: yup.string().required().matches(phoneRegExp, 'Phone number is not valid'),
})

interface addContactFormValue {
    name?: string,
    phone?: Number | '',
}

const AddContactForm = withFormik<addContactFormValue, addContactFormProps>({
    mapPropsToValues: props => {
        return {
            name: '',
            lastName: '',
            phone: '',
            token: '',
            userId: ''
        }
    },
    validationSchema: addContactFormValidationSchema,
    handleSubmit: async (values, { props }) => {
        try {
            console.log('submit')
            const res = await callApi().post('/auth/login', values)
            if (res.statusText && res.statusText === 'OK') {
                console.log(res)
                values.token = res.data.value.token
                values.userId = res.data.value.userId
                btn.addEventListener('onclick', btnHandler());
            }

            // if (true) {
            //     addBtn.addEventListener('onClick', add());
            // }
        } catch (error) {
            console.log(error)
        }
    }

})(AddContactFormInner)

export default AddContactForm;