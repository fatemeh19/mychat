"use client"

import { Field, ErrorMessage } from 'formik'
import { FC } from "react"

interface inputProps {
    name: string,
    label: string,
    type?: string,
    inputClassName?: string,
    errorClassName?: string
}

const Input: FC<inputProps> = ({
    name,
    label,
    type = 'text',
    inputClassName,
    errorClassName
}) => {

    return (
        <div className="my-4 ">
            <label htmlFor={name} className="text-zinc-600 font-[500]">{label}</label>
            <Field
                id={name}
                name={name}
                type={type}
                className={`w-full border border-zinc-300 px-3 py-2 outline-none rounded-lg ${inputClassName ?? ''}`} />
            <ErrorMessage name={name} className={`text-red-500 ${errorClassName ?? ''}`} />
        </div>
    )
}

export default Input