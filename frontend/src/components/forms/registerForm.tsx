"use client"
import PasswordStrengthBar from 'react-password-strength-bar';

import { Form, withFormik } from "formik"
import * as yup from 'yup'
import YupPassword from 'yup-password'
YupPassword(yup)

import Input from "../input"
import { useRouter } from 'next/navigation';
import callApi from '@/src/helper/callApi';

let btn: any;
let btnHandler: () => void

interface RegisterFormValue {
    name: string,
    email: string,
    phone: Number | '',
    password: string
}

const InnerRegisterForm = (props: any) => {

    const { values } = props
    const router = useRouter()

    // this code for navigate to login page after register
    btn = document.querySelector('#register')
    // btnHandler = () => router.push('/auth/login')

    return (
        <Form className=" w-full">

            {/* <Input name='name' label="name" /> */}
            <Input name="email" type="email" label="Email address" />
            {/* <Input name="phone" label="phone number" /> */}
            <Input name="password" type="password" label="password" />
            <PasswordStrengthBar password={values.password} userInputs={[]} />
            <div className="my-5">
                <button
                    id="register"
                    name="register"
                    type='submit'
                    className="w-full cursor-pointer bg-blue-600 hover:bg-blue-800 transition-all duration-150 text-white border border-zinc-300 px-3 py-2 outline-none rounded-lg "
                >Register</button>
            </div>
        </Form>
    )
}

const registerFormValidationSchema = yup.object().shape({
    name: yup.string().required('وارد کردن این فیلد الزامی است').min(3, 'حداقل 3 کاراکتر وارد کنید'),
    email: yup.string().required().email(),
    phone: yup.string().required(),
    password: yup
        .string()
        .required('Please Enter your password')
        .minLowercase(1, 'At least One Lowercase')
        .minUppercase(1, 'At least One Uppercase')
        .minNumbers(1, 'At least One Number')
        .minSymbols(1, 'At least One Symbole')
        .min(8, 'Must atleast contain 8 charechter')
})

interface registerFormProps {
    name?: string,
    phone?: Number | '',
    email?: string,
    password?: string
}

const RegisterForm = withFormik<registerFormProps, RegisterFormValue>({
    mapPropsToValues: props => {
        return {
            name: '',
            email: '',
            phone: '',
            password: ''
        }
    },
    validationSchema: registerFormValidationSchema,
    handleSubmit: (values) => {
        // btn.addEventListener('onclick', btnHandler());
        // const res = callApi().post('/auth/register', values)
        // console.log(res)
        console.log(' btn is : ', btn)

    }
})(InnerRegisterForm)

export default RegisterForm