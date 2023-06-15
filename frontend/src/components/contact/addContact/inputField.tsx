"use client"
import {FC} from "react"
import Input from '../../auth/input'

interface inputFieldProps {
    name: string,
    label: string,
    children?: React.ReactNode,
}

const InputField: FC<inputFieldProps> = ({
    name,
    label,
    children
}) => {

    return (
        <div className="flex gap-2">
            <div className="w-8 flex ">{children}</div>
            <Input name={name} label={label} placeholder={label}
                inputClassName="border-b border-gray-200 focus:border-sky-500 inputField "
                labelClassName='w-full invisible text-cyan-600 text-sm  peer-focus:visible !peer-placeholder-shown:visible'
            />
        </div>
    )
}

export default InputField