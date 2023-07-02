"use client"

import * as yup from 'yup'
import Link from "next/link"
import { useRouter } from 'next/navigation';
import { Form, withFormik } from "formik"
import { MdAlternateEmail } from 'react-icons/md'
// implement of yup for password checking the requirement like lowerCase & UperCase & etc.
import YupPassword from 'yup-password'
YupPassword(yup)

// import components
import Input from "../input"
import callApi from '@/src/helper/callApi';
import ValidationError from '@/src/errors/validationError';
import PasswordStrengthMeter from '../inputPassword/passwordStrengthMeter';
import { createRef } from 'react';

let btn: any;
let btnHandler: () => void

interface RegisterFormValue {
    email: string,
    password: string,
    msg: string
}

const InnerRegisterForm = (props: any) => {
    const router = useRouter()

    const { values } = props

    // this code for navigate to varifiy email page after register
    btn = createRef<HTMLButtonElement>();
    btnHandler = () => {
        setTimeout(() => {
            router.push('/auth/register/notification?message=please go to your Email and press the link to verify your Email')
        }, 3000);
    }

    return (
        <Form className=" w-full">
            <Input name="email" type="email" label="Email address" icon={MdAlternateEmail} />
            <PasswordStrengthMeter name="password" />
            <div className="my-5">
                <p className={`text-cyan-600 text-sm rtl `}>{values.msg}</p>
                <button
                    ref={btn}
                    id="register"
                    name="register"
                    type='submit'
                    className="w-full cursor-pointer bg-blue-600 hover:bg-blue-800 transition-all duration-150 text-white border border-zinc-300 px-3 py-2 outline-none rounded-lg "
                >Register</button>
            </div>
            <div className="text-sm text-gray-500 text-center mb-2">
                Do you have account already?
                <Link href={'/auth/login'} className="text-blue-500 font-semibold"> Login </Link>
            </div>
        </Form>
    )
}

const registerFormValidationSchema = yup.object().shape({
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
    email?: string,
    password?: string
}

const RegisterForm = withFormik<registerFormProps, RegisterFormValue>({
    mapPropsToValues: props => {
        return {
            email: "",
            password: "",
            msg: ''
        }
    },
    validationSchema: registerFormValidationSchema,
    handleSubmit: async (values, { setFieldError }) => {
        try {
            const res = await callApi().post('/auth/register', values)
            console.log('register res : ', res)
            if (res.statusText === 'OK') {
                values.msg = 'Successful, wait ..'
                btn.addEventListener('onclick', btnHandler());
            }

        } catch (error) {
            if (error instanceof ValidationError) {
                // @ts-ignore
                const err = error.Error.errors;
                err.map((e: any) => {
                    setFieldError(e.field, e.message)
                });
            }
        }
    }

})(InnerRegisterForm)

export default RegisterForm