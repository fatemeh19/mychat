"use client"
import PasswordStrengthBar from 'react-password-strength-bar';

import { Form, withFormik } from "formik"
import * as yup from 'yup'

import {BsFingerprint} from 'react-icons/bs'
import {MdAlternateEmail} from 'react-icons/md'

// implement of yup for password checking the requirement like lowerCase & UperCase & etc.
import YupPassword from 'yup-password'
YupPassword(yup)

import Input from "../input"
import { useRouter } from 'next/navigation';
import callApi from '@/src/helper/callApi';
import ValidationError from '@/src/errors/validationError';
import { useState } from 'react';

let btn: any;
let btnHandler: () => void
let message : string;
// let notif: any

interface RegisterFormValue {
    // name?: string,
    // phone?: Number | '',
    email: string,
    password: string
}

const InnerRegisterForm = (props: any) => {

    const [show, setShow] = useState(false)

    const { values } = props
    const router = useRouter()

    // this code for navigate to varifiy email page after register
    btn = document.querySelector('#register')

    btnHandler = () => {
        router.push('/auth/register/notification?message=please go to your Email and press the link to verify your Email')

    }
    
    // notif = document.querySelector('#notif')
    return (
        <Form className=" w-full">

            {/* <Input name='name' label="name" /> */}
            <Input name="email" type="email" label="Email address" icon={MdAlternateEmail}/>
            {/* <Input name="phone" label="phone number" /> */}
            <Input name="password" type={show ? 'text' : 'password'} label="password" icon={BsFingerprint} setShow={setShow} show={show} />
            <PasswordStrengthBar password={values.password} />
            <div className="my-5">
                <button
                    id="register"
                    name="register"
                    type='submit'
                    className="w-full cursor-pointer bg-blue-600 hover:bg-blue-800 transition-all duration-150 text-white border border-zinc-300 px-3 py-2 outline-none rounded-lg "
                >Register</button>
                {/* <h1 id='notif' className='text-red-400 my-2 hidden'>please go to your Email and press the link to verify your Email </h1> */}
            </div>
        </Form>
    )
}

// name : we will recieve 
const registerFormValidationSchema = yup.object().shape({
    // name: yup.string().required('وارد کردن این فیلد الزامی است').min(3, 'حداقل 3 کاراکتر وارد کنید'),
    // phone: yup.string().required(),
    email: yup.string().required().email(),
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
    // name?: string,
    // phone?: Number | '',
    email?: string,
    password?: string
}

const RegisterForm = withFormik<registerFormProps, RegisterFormValue>({
    mapPropsToValues: props => {
        return {
            // name: '',
            email: "",
            // phone: '',
            password: ""
        }
    },
    validationSchema: registerFormValidationSchema,
    handleSubmit: async (values, { setFieldError }) => {
        try {
            const res = await callApi().post('/auth/register', values)
            console.log(res)
            if (res.statusText && res.statusText === 'OK') {
                btn.addEventListener('onclick', btnHandler());
                // notif?.classList.remove('hidden')
            }
        } catch (error) {
            if (error instanceof ValidationError) {
                setFieldError('email', error.message)
            }
        }


    }

})(InnerRegisterForm)

export default RegisterForm