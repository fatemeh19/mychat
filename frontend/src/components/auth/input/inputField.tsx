"use client"
import { FC } from "react"
import Input from '.'
import { IconType } from 'react-icons'
interface inputFieldProps {
    name: string,
    label: string,
    children?: React.ReactNode,
    inputClassName?: string,
    containerClassName?: string,
    icon?: IconType
}

const InputField: FC<inputFieldProps> = ({
    name,
    label,
    children,
    inputClassName,
    containerClassName,
    icon
}) => {

    return (
        <div className={`${containerClassName} flex gap-2 mx-5`}>
            {children && <div className="w-8 flex ">{children}</div>}
            <Input name={name} label={label} placeholder={' '} icon={icon}
                inputClassName={`${inputClassName} border-b border-gray-200 focus:border-sky-500 inputField`}
                // labelClassName='w-full invisible text-cyan-600 text-sm  peer-focus:visible !peer-placeholder-shown:visible'
                labelClassName='
                    w-full 
                    absolute top-7 left-0 
                    text-gray-500 text-sm  
                    peer-focus:top-0 
                    peer-focus:text-cyan-600 
                    peer-focus:text-xs
                    peer-[:not(:placeholder-shown)]:text-cyan-600
                    peer-[:not(:placeholder-shown)]:text-xs
                    peer-[:not(:placeholder-shown)]:top-0
                    transition-all duration-200'
            />
        </div>
    )
}

export default InputField