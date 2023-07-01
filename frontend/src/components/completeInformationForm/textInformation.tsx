import { Form, withFormik } from "formik";
import * as yup from 'yup'
import { createRef } from "react";
import callApi from "@/src/helper/callApi";
import { useRouter } from "next/navigation";
import InputField from "../auth/input/inputField";
import ValidationError from "@/src/errors/validationError";

interface textInformationFormProps {
    name: string,
    phone: string,
    msg: string
}

let btn: any;
let apply: () => void

const TextInformationForm = (props: any) => {

    btn = createRef<HTMLButtonElement>()
    const router = useRouter()

    apply = () => {
        //   go to anothe page
        router.push('/chat')
    }

    return (
        <div className="flex items-center justify-center flex-col gap-5">
            <Form className="w-80">

                {/* <Input name='name' label="name" inputClassName="w-96" /> */}
                {/* <Input name="phone" label="phone number" /> */}
                <InputField name="name" label="name" containerClassName="ml-0" />
                <InputField name="phone" label="phone number" containerClassName="ml-0" />

                <div className="my-5">
                    {/* <p className={`text-cyan-600 text-sm rtl `}>{values.msg}</p> */}
                    <button
                        ref={btn}
                        id="register"
                        name="register"
                        type='submit'
                        className="w-full cursor-pointer bg-blue-600 hover:bg-blue-800 transition-all duration-150 text-white border border-zinc-300 px-3 py-2 outline-none rounded-lg "
                    >Apply</button>
                </div>
                <div className="errMessage w-full text-red-500">{props.values.msg}</div>
            </Form>
        </div>
    );
}

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const textInformationFormValidationSchema = yup.object().shape({
    name: yup.string().required().min(3, 'Atleast enter 3 words'),
    phone: yup.string().required().matches(phoneRegExp, 'Phone number is not valid'),
})

interface registerFormProps {
    name?: string,
    phone?: Number | '',
    image: string
}

const textInformation = withFormik<registerFormProps, textInformationFormProps>({
    mapPropsToValues: props => {
        return {
            name: '',
            phone: '',
            msg: '',
        }
    },
    validationSchema: textInformationFormValidationSchema,
    handleSubmit: async (values, { props }) => {
        try {

            let formData = new FormData()
            formData.append('profilePic', props.image)
            formData.append('name', values.name)
            formData.append('phoneNumber', values.phone)

            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const res = await callApi().patch('/main/user/setInfo', formData, config)
            console.log('set info res : ', res)
            if (res.status === 200) {
                btn.addEventListener('onClick', apply());
            }
        } catch (error) {
            console.log('error in catch text info : ', error)
            if (error instanceof ValidationError) {
                // @ts-ignore
                values.msg = error.Error.errors[0].message
            }
        }
    }

})(TextInformationForm)

export default textInformation;