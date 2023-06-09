"use client"

import Link from "next/link";
import Image from "next/image"
import { Form, withFormik } from "formik"
import Input from "../input"
import { useRouter } from 'next/navigation';
import callApi from '@/src/helper/callApi';
import ValidationError from '@/src/errors/validationError';
import { GenerateString } from '@/src/helper/captcha';
import { useState, createRef } from "react";
import dynamic from "next/dynamic";
// icons
import { BiRedo } from "react-icons/bi";
import { BsFingerprint } from 'react-icons/bs'
import { MdAlternateEmail } from 'react-icons/md'

let btn: any;
let btnHandler: () => void
let checkCaptcha: () => boolean

interface LoginFormValue {
    email: string,
    password: string,
    captcha: string,
    msg: string,
    token: string,
    handleRedo: () => void,
    firstLogin: Boolean
}

const InnerLoginForm = (props: any) => {
    const [show, setShow] = useState(false);
    const { values } = props;
    const router = useRouter();
    
    btn = createRef<HTMLButtonElement>();

    checkCaptcha = () => {
        // @ts-ignore
        var inputData = document.querySelector("#captchaInput").value;
        if (values.captcha == inputData) {
            return true
        } else return false
    }

    btnHandler = () => {
        values.msg = 'Successful, wait to Login ..'
        localStorage.setItem('token', values.token)
        if (values.firstLogin) {
            router.push('/complete-information')
        }
        else {
            router.push('/chat')
        }
    }

    return (
        <Form className=" w-full">

            <Input name="email" type="email" label="Email address" icon={MdAlternateEmail} />
            <Input name="password" type={show ? 'text' : 'password'} label="password" icon={BsFingerprint} setShow={setShow} show={show} />
            <div className="flex relative w-full   py-2 outline-none " >
                <Image src={'/images/captcha_img.jpg'} width={20} height={40} alt="" className="w-4/5 h-[40px] rounded  select-none tracking-[2rem] italic " />
                <div className="select-none absolute w-4/5 top-[1rem] text-center tracking-[2rem] italic font-bold">{values.captcha}</div>
                <div onClick={values.handleRedo} className="rounded w-[40px] h-[39px] cursor-pointer absolute right-0 bg-mainColor"><BiRedo className="text-white ml-[5px] mt-[3px] text-3xl" /></div>
            </div>
            <input

                id="captchaInput"
                type="text"
                className={`w-full border border-zinc-300 px-3 py-2 outline-none tracking-[2rem] rounded-lg`} />
            <p className={`text-cyan-600 text-sm rtl `}>
                {values.msg}
            </p>
            <div className="my-5">
                <button ref={btn} id="Login" name="Login" type='submit' className="w-full cursor-pointer bg-blue-600 hover:bg-blue-800 transition-all duration-150 text-white border border-zinc-300 px-3 py-2 outline-none rounded-lg ">Login</button>
            </div>
            <div className="text-sm text-gray-500 text-center mb-2">
                You don't have an account?
                <Link href={'/auth/register'} className="text-blue-500 font-semibold"> Register </Link>
            </div>
        </Form>
    )
}


interface LoginFormProps {

    email?: string,
    password?: string,
    captcha?: string
}

const LoginForm = withFormik<LoginFormProps, LoginFormValue>({
    mapPropsToValues: props => {
        return {
            email: "",
            password: "",
            captcha: GenerateString(),
            msg: '',
            token: '',
            handleRedo: () => {
                props.captcha = GenerateString()
            },
            firstLogin: true
        }
    },
    handleSubmit: async (values, { setFieldError }) => {
        const isCaptchaTrue = checkCaptcha()
        
        if (isCaptchaTrue) {
            try {
                console.log('submit')
                const res = await callApi().post('/auth/login', values)
                if (res.statusText && res.statusText === 'OK') {
                    console.log('login res : ', res)
                    values.token = res.data.value.token
                    if (!res.data.value.isFirstTimeLogin) {
                        values.firstLogin = false;
                    }
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
        else {
            values.msg = "Captcha Code is wrong try again"
            values.captcha = GenerateString()
        }
    }

})(InnerLoginForm)

// export default LoginForm
export default dynamic(() => Promise.resolve(LoginForm), { ssr: false })