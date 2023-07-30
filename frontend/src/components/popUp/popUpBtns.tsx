"use client"
import { FC } from "react"

interface popUpBtnsProps {
    title1: string,
    title2: string,
    id1: string,
    id2: string,
    name1: string,
    name2: string,
    onClickHandler1: () => void,
    onClickHandler2: () => void,
    btnContainerClassName?: string,
}

const PopUpBtns: FC<popUpBtnsProps> = ({
    title1,
    title2,
    id1,
    name1,
    id2,
    name2,
    onClickHandler1,
    onClickHandler2,
    btnContainerClassName,

}) => {

    return (
        <div className="absolute bottom-0 w-full bg-white ">
            <div className=""><hr className="w-full text-gray-100 opacity-[.3]" /></div>
            <div className={`flex px-[15px] py-3 relative ${btnContainerClassName ?? 'justify-between'}`}>
                <button
                    id={id1}
                    name={name1}
                    onClick={onClickHandler1}
                    className="font-semibold cursor-pointer bg-white hover:text-sky-700 transition-all duration-150 text-sky-500 outline-none text-base "
                >{title1}</button>
                <button
                    id={id2}
                    name={name2}
                    onClick={onClickHandler2}
                    className=" font-semibold cursor-pointer bg-white hover:text-sky-700 transition-all duration-150 text-sky-500  outline-none text-base"
                >{title2}</button>
            </div>

        </div>
    )
}

export default PopUpBtns