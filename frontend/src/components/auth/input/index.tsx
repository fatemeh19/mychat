"use client"

import { Field, ErrorMessage } from 'formik'
import { Dispatch, FC, SetStateAction } from "react"
import { IconType } from 'react-icons'

interface inputProps {
    name: string,
    label: string,
    type?: string,
    inputClassName?: string,
    errorClassName?: string,
    icon?: IconType,
    show?: boolean,
    setShow?: Dispatch<SetStateAction<boolean>>,
    keyHandler?: (e: any) => void,
    placeholder?:string,
    labelClassName?: string
}

const Input: FC<inputProps> = ({
    name,
    label,
    type = 'text',
    inputClassName,
    errorClassName,
    icon: Icon,
    setShow,
    show,
    keyHandler,
    placeholder,
    labelClassName
}) => {

    return (
        <div className="py-4 relative w-full inputBox">
             
            <Field
                id={name}
                name={name}
                type={type}
                className={
                    `w-full
                    py-2 
                    outline-none
                    peer
                    ${inputClassName ?? 'border border-zinc-300 px-3 rounded-lg'}`}
                onKeyUp={keyHandler}
                placeholder={placeholder ?? ''}
            />


            <>
                {/* if icon exist => show Icon */}
                {
                    !!Icon &&
                    (
                        < Icon className={`
                                absolute top-7 right-3 
                                text-xl text-gray-500
                                ${show && 'text-red-400'}
                                peer-focus-visible:text-blue-500
                                ${type === 'text' && 'peer-focus-visible:text-red-400'}
                                ${name === 'password' && 'hover:cursor-pointer'}
                            `}
                            onClick={() => setShow && setShow(!show)}
                        />
                    )
                }
            </>
            <p className={`text-cyan-600 text-sm rtl ${errorClassName ?? ''}`}>
                <ErrorMessage name={name} />
            </p>
            <label htmlFor={name} className={`absolute top-0 ${labelClassName ?? 'text-zinc-600 font-[500] mt-[-10px]'}`}>{label}</label>
        </div>
    )
}

export default Input