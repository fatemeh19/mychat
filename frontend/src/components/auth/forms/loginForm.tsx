"use client"

import { Form, withFormik } from "formik"
import Input from "../input"
import { useRouter } from 'next/navigation';
import callApi from '@/src/helper/callApi';
import ValidationError from '@/src/errors/validationError';

let btn: any;
let btnHandler: () => void

interface LoginFormValue {
    // name?: string,
    // phone?: Number | '',
    email: string,
    password: string
}

const InnerLoginForm = (props: any) => {

    const { values } = props
    const router = useRouter()
    btn = document.querySelector('#Login')

    btnHandler = () => {
        // localStorage.setItem('message', 'please go to your Email and press the link to verify your Email ')
        // router.push('/auth/Login/notification?message=please go to your Email and press the link to verify your Email')
        console.log("login")
    }

    return (
        <Form className=" w-full">

            <Input name="email" type="email" label="Email address" />
            <Input name="password" type="password" label="password" />
          
            <div className="my-5">
                <button id="Login" name="Login" type='submit' className="w-full cursor-pointer bg-blue-600 hover:bg-blue-800 transition-all duration-150 text-white border border-zinc-300 px-3 py-2 outline-none rounded-lg ">Login</button>
            </div>
        </Form>
    )
}


interface LoginFormProps {

    email?: string,
    password?: string
}

const LoginForm = withFormik<LoginFormProps, LoginFormValue>({
    mapPropsToValues: props => {
        return {
            email: "",
            password: ""
        }
    },

    handleSubmit: async (values, { setFieldError }) => {
        try {
            console.log('submit')
            const res = await callApi().post('/auth/Login', values)
            console.log(res)
            if (res.statusText && res.statusText === 'OK') {
                console.log('transfering ...')
                btn.addEventListener('onclick', btnHandler());
            }
        } catch (error) {
            if (error instanceof ValidationError) {
                setFieldError('email', error.message)
            }
        }


    }

})(InnerLoginForm)

export default LoginForm