import { ChatType } from "@/src/models/enum";
import { FC, useState, Dispatch, SetStateAction } from "react";
import style from '@/src/components/basicComponents/dropDown/dropDown.module.css'
import { useAppDispatch } from "@/src/redux/hooks";
import { setDropDownValue } from "@/src/redux/features/dropDownSlice";

interface DropDownProps {
    title: string,
    items: string[],
    currentValue: string,
    dispatchHandler?: (value: string) => void
}
const DropDown: FC<DropDownProps> = ({ items, currentValue, dispatchHandler }) => {
    const [dropDownState, setDropDownState] = useState(currentValue)
    const dispatch = useAppDispatch()

    let openParent = (e: any) => {
        e.target.parentNode.parentNode.children[1].classList.toggle(`${style.show}`)
        e.target.parentNode.children[1].classList.toggle('rotate-180')
    }
    let menuHandler = (e: any) => {
        setDropDownState(e.target.innerHTML)
        dispatch(setDropDownValue(e.target.innerHTML))
        dispatchHandler && dispatchHandler(e.target.innerHTML)
        // access to wrapp from this position
        e.currentTarget.parentNode.classList.remove(`${style.show}`)
        e.currentTarget.parentNode.previousSibling.children[1].classList.remove('rotate-180')
    }
    return (
        <>
            <div className={`dropDown ${style.dropDown}`}>
                <div className={`dropDown-box ${style.dropDown_box}`} >
                    <div className={`dropDown-btn ${style.dropDown_btn}`}>
                        <p onClick={openParent}>{dropDownState}</p>
                        <p className={`${style.icon} transition-all duration-150`} onClick={openParent}>▼</p>
                    </div>
                    <div className={`wrapper ${style.wrapper}`}>
                        <ul className={`menu ${style.menu}`} onClick={menuHandler}>
                            {
                                items.map((item, index) => (
                                    <li className={`${style.li}`} key={index}>{item}</li>
                                ))
                            }
                        </ul>
                    </div>

                </div>
            </div>

        </>
    );
}

export default DropDown;