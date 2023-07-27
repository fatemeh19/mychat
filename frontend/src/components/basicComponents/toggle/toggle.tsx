import { FC } from "react";
import style from './toggle.module.css'
import { useAppDispatch } from "@/src/redux/hooks";
import { setToggle } from "@/src/redux/features/toggleSlice";

interface ToggleProps {
    id: string,
    text: string,
    toggle: boolean,
}

const Toggle: FC<ToggleProps> = ({ id, text, toggle }) => {

    const dispatch = useAppDispatch()

    let inputHandler = (e: any) => {
        dispatch(setToggle(e.target.checked))
    }

    return (
        <div className={`${style.container}`}>
            <h4 className={`${style.h4}`}>{text}</h4>
            <input className={`${style.tgl} ${style.tgl_ios}`} id={id} type="checkbox" onChange={inputHandler} checked={toggle} />
            <label className={`${style.tgl_btn}`} htmlFor={id}></label>
        </div>
    );
}

export default Toggle;