import { Form, withFormik } from "formik";
import * as yup from 'yup'
import Input from "../auth/input";
import { createRef } from "react";


interface textInformationFormProps {
    name: string,
    phone: string
}

let btn: any;
let apply: () => void

const TextInformationForm = (props: any) => {

    btn = createRef<HTMLButtonElement>()

    apply = () => {
        //   go to anothe page
    }

    return (
        <div className="flex items-center justify-center flex-col gap-5">
            <Form className=" w-full">

                <Input name='name' label="name" />
                <Input name="phone" label="phone number" />

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
    image: string | ArrayBuffer | null
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

            const info = {
                img: props.image,
                name: values.name,
                phone: values.phone
            }

            // const res = await callApi().post('/main/user/setInfo', info)

            // if (res.status === 200) {
            if (true) {
                btn.addEventListener('onClick', apply());
            }
        } catch (error) {
            console.log(error)
        }
    }

})(TextInformationForm)

export default textInformation;