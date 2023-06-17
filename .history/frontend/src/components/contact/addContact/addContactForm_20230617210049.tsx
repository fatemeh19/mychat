import { Form, withFormik } from "formik";
import * as yup from 'yup'
import { BiUser } from "react-icons/bi";
import { BiPhone } from "react-icons/bi";
import { createRef } from "react";
import InputField from "../../auth/input/inputField";
import callApi from "@/src/helper/callApi";
import ValidationError from "@/src/errors/validationError";


interface addContactFormProps {
    name: string,
    lastName: string,
    phone: string,
    handelOpen?: () => void,
    token: string,
    userId: string,
    msg: string
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
            <div className="errMessage w-full text-red-500">{props.values.msg}</div>
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
    phone?: Number | ''
}

const AddContactForm = withFormik<addContactFormValue, addContactFormProps>({
    mapPropsToValues: props => {
        return {
            name: '',
            lastName: '',
            phone: '',
            token: '',
            userId: '',
            msg: ''
        }
    },
    validationSchema: addContactFormValidationSchema,
    handleSubmit: async (values, { props }) => {
        try {
            let localStorageString = localStorage.getItem('items')
            let localStorageArray = localStorageString?.split(',')
            // @ts-ignore
            let token = localStorageArray[0].slice(1, localStorageArray[0].length)
            // @ts-ignore
            let userId = localStorageArray[1].slice(0, localStorageArray[1].length-1)
            console.log(token)
            console.log(userId)

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            values.name=values.name+" "+values.lastName;
            const res = await callApi().post('/main/user/contact/', values, config)
            console.log(res)
            if (res.status === 200) {
                addBtn.addEventListener('onClick', add());
            }
        } catch (error) {
            console.log('error in catch text info : ', error)
            if (error instanceof ValidationError) {
                values.msg = error.Error.errors[0].message
            }
        }
    }

})(AddContactFormInner)

export default AddContactForm;