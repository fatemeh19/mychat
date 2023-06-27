"use client"

import { Form, withFormik } from "formik";
import * as yup from 'yup'
import { BiMenu, BiUser } from "react-icons/bi";
import { BiPhone } from "react-icons/bi";
import { createRef } from "react";
import InputField from "../../auth/input/inputField";
import callApi from "@/src/helper/callApi";
import ValidationError from "@/src/errors/validationError";
import UseLocalStorage from "@/src/helper/useLocalStorate";
import CustomizedDialogs from "../../popUp";
import ContactList from "../contactList/contactList";
import Contacts from "..";

import { useState } from 'react'
import Menu from "../../mainPage/leftSideMainPage/menu";


interface addContactFormProps {
    name: string,
    lastName: string,
    phone: string,
    handelOpen?: () => void,
    msg: string
}

let addBtn: any;
let add: () => void

const AddContactFormInner = (props: any) => {
    const { handleAddContact, values } = props;
    addBtn = createRef<HTMLButtonElement>()

    add = () => {
        handleAddContact()
    }

    return (

        <Form className=" w-full px-5">
            <InputField name='name' label="First name" children={<BiUser className='h-auto text-2xl text-gray-500' />} />
            <InputField name='lastName' label="Last name" />
            <InputField name='phone' label="Phone Number" children={<BiPhone className='h-auto text-2xl text-gray-500' />} />
            <div className="errMessage ml-8 w-auto text-red-500 text-sm">{values.msg}</div>
            <div className="my-5 gap-1 flex justify-end">
                <button
                    ref={addBtn}
                    id="add-contact"
                    name="add contact"
                    type='submit'
                    className="font-bold cursor-pointer bg-white hover:text-sky-700 transition-all duration-150 text-sky-500  outline-none "
                >Create</button>
            </div>

        </Form>

    );
}

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const addContactFormValidationSchema = yup.object().shape({
    name: yup.string().required().min(3, 'Atleast enter 3 words'),
    phone: yup.string().required().matches(phoneRegExp, 'Phone number is not valid')
})

interface addContactFormValue {
    name?: string,
    phone?: Number | '',
    handleAddContact?: () => void
}

const AddContactForm = withFormik<addContactFormValue, addContactFormProps>({
    mapPropsToValues: props => {
        return {
            name: '',
            lastName: '',
            phone: '',
            msg: ''
        }
    },
    validationSchema: addContactFormValidationSchema,
    handleSubmit: async (values, { props }) => {
        try {
            // const { token } = UseLocalStorage();
            const token = localStorage.getItem('token')

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const contact = {
                name: values.name + " " + values.lastName,
                phoneNumber: values.phone
            };
            const res = await callApi().post('/main/contact/', contact, config)
            console.log(res)
            if (res.status === 200) {
                values.msg = "با موفقیت ایجاد شد"
                addBtn.addEventListener('onClick', add())
            }
        } catch (error) {
            console.log('error in catch add contact form : ', error)
            if (error instanceof ValidationError) {
                // @ts-ignore
                values.msg = error.Error.errors[0].message
            }
        }
    }

})(AddContactFormInner)

export default AddContactForm;