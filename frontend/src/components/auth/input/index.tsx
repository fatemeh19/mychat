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
    keyHandler?: (e: any) => void
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
    keyHandler
}) => {

    return (
        <div className="my-4 relative inputBox">
            <label htmlFor={name} className="text-zinc-600 font-[500]">{label}</label>
            <Field
                id={name}
                name={name}
                type={type}
                className={
                    `w-full
                    border
                    border-zinc-300 
                    px-3 py-2 
                    outline-none 
                    rounded-lg
                    peer
                    ${inputClassName ?? ''}`}
                onKeyUp={keyHandler}
                
            />


            <>
                {/* if icon exist => show Icon */}
                {
                    !!Icon &&
                    (
                        < Icon className={`
                                absolute top-9 right-3 
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
        </div>
    )
}

export default Input