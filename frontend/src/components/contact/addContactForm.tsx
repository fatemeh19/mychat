import { Form, withFormik } from "formik";
import * as yup from 'yup'
import Input from "../auth/input";
import { createRef } from "react";


interface addContactFormProps {
    name: string,
    lastName:string,
    phone: string
}

let btn: any;
let add: () => void

const AddContactFormInner = (props: any) => {
    btn = createRef<HTMLButtonElement>()

    add = () => {}

    return (

          <Form className=" w-full">

                 <Input name='name' label="name" />
                 <Input name='last-name' label="last name" />
                 <Input name="phone" label="phone number" />

                 <div className="my-5">
                     <button
                         ref={btn}
                         id="add-contact"
                         name="add contact"
                         type='submit'
                        className="w-full cursor-pointer bg-blue-600 hover:bg-blue-800 transition-all duration-150 text-white border border-zinc-300 px-3 py-2 outline-none rounded-lg "
                     >Add</button>
                 </div>
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
    lastName?:string,
    phone?: Number | '',

}

const AddContactForm = withFormik<addContactFormValue,addContactFormProps>({
    mapPropsToValues: props => {
        return {
            name: '',
            lastName: '',
            phone: '',
        }
    },
    validationSchema: addContactFormValidationSchema,
    handleSubmit: async (values, { props }) => {
        try {
            if (true) {
                btn.addEventListener('onClick', add());
            }
        } catch (error) {
            console.log(error)
        }
    }

})(AddContactFormInner)

export default AddContactForm;