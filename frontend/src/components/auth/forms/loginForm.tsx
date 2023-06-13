"use client"

import { Form, withFormik } from "formik"
import Input from "../input"
import { useRouter } from 'next/navigation';
import callApi from '@/src/helper/callApi';
import ValidationError from '@/src/errors/validationError';
import {GenerateString} from '@/src/helper/captcha';
import { BiRedo } from "react-icons/bi";
import Image from "next/image"
import {BsFingerprint} from 'react-icons/bs'
import {MdAlternateEmail} from 'react-icons/md'

let btn: any;
let btnHandler: () => void

interface LoginFormValue {
    email: string,
    password: string,
    captcha : string,
    msg : string,
    token : string
}

const InnerLoginForm = (props: any) => {

    const { values } = props
    const router = useRouter()
    btn = document.querySelector('#Login')
    const handleRedo = () => {
        values.captcha=GenerateString()
    }
    btnHandler = () => {
        // @ts-ignore
        var inputData = document.querySelector("#captchaInput").value;
        console.log(inputData)
        if(values.captcha == inputData){
            values.msg='Successful, wait to Login ..'
            console.log(values.token)
            localStorage.setItem('token',values.token)
            router.push('/')
            console.log("login")
        }
        else{
            values.msg="Captcha Code is wrong try again"
            values.captcha=GenerateString()
            
        }
        
    }

    return (
        <Form className=" w-full">

            <Input name="email" type="email" label="Email address" icon={MdAlternateEmail} />
            <Input name="password" type="password" label="password" icon={BsFingerprint}/>
            <div className="flex relative w-full   py-2 outline-none " >
                <Image src={'/images/captcha_img.jpg'}  width={20} height={40} alt=""  className="w-4/5 h-[40px] rounded  select-none tracking-[2rem] italic "/>
                <div className="select-none absolute w-4/5 top-[1rem] text-center tracking-[2rem] italic font-bold">{values.captcha}</div>
                <div onClick={handleRedo} className="rounded w-[40px] h-[39px] cursor-pointer absolute right-0 bg-mainColor"><BiRedo className="text-white ml-[5px] mt-[3px] text-3xl" /></div>
            </div>
            <input
                id="captchaInput"
                type="text"
                className={`w-full border border-zinc-300 px-3 py-2 outline-none tracking-[2rem] rounded-lg`}/>
            <p className={`text-cyan-600 text-sm rtl `}>
                {values.msg}
            </p>
            <div className="my-5">
                <button id="Login" name="Login" type='submit' className="w-full cursor-pointer bg-blue-600 hover:bg-blue-800 transition-all duration-150 text-white border border-zinc-300 px-3 py-2 outline-none rounded-lg ">Login</button>
            </div>
        </Form>
    )
}


interface LoginFormProps {

    email?: string,
    password?: string,
    // captcha?: string,
    // msg? : string
}

const LoginForm = withFormik<LoginFormProps, LoginFormValue>({
    mapPropsToValues: props => {
        return {
            email: "",
            password: "",
            captcha: GenerateString(),
            msg : '',
            token : ''
        }
    },
    handleSubmit: async (values, { setFieldError }) => {
        try {
            console.log('submit')
            const res = await callApi().post('/auth/login', values)
            console.log(res)
            if (res.statusText && res.statusText === 'OK') {
                values.token=res.data.value.token;
                btn.addEventListener('onclick', btnHandler());
            }
            
            
        } catch (error) {
            if (error instanceof ValidationError) {
                console.log('error : ', error)
                let spliteArr = error.message.split(' ')
                spliteArr.forEach(item => {
                    if(item === 'email' || item === 'Email')
                    {
                        // @ts-ignore
                        setFieldError('email', error.message)
                    }
                    else if(item === 'password' || item === 'Password') {
                        // @ts-ignore
                        setFieldError('password', error.message)
                    }
                })
            }
        }


    }

})(InnerLoginForm)

export default LoginForm