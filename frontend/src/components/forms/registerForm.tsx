"use client"

import { Form, withFormik } from "formik"
import Input from "../input"


interface RegisterFormValue {
    name: string,
    email: string,
    phone: Number | '',
    password: string
}
const InnerRegisterForm = () => {
    return (
        <Form className=" w-full">

            <Input name="name" label="name" />
            <Input name="email" type="email" label="Email address" />
            <Input name="phone" label="phone number" />
            <Input name="password" type="password" label="password" />
            <div className="my-5">
                <button
                    id="register"
                    name="register"
                    className="w-full cursor-pointer bg-blue-600 hover:bg-blue-800 transition-all duration-150 text-white border border-zinc-300 px-3 py-2 outline-none rounded-lg "
                >Register</button>
            </div>
        </Form>
    )
}

interface registerFormProps {
    name : string,
    phone : Number | '',
    email : string,
    password : string
}

const RegisterForm = withFormik<registerFormProps, RegisterFormValue>({
    mapPropsToValues: props => {
        return {
            name: props.name,
            email: props.email,
            phone: props.phone,
            password: props.password
        }
    },
    handleSubmit: (values) => console.log(values)
})(InnerRegisterForm)

export default RegisterForm