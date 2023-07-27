import { FC, Dispatch, SetStateAction } from "react";

import Toggle from "./toggle/toggle";
import CustomizedDialogs from "../popUp";
import { useAppSelector } from "@/src/redux/hooks";

interface ConfirmModalProps {
    confirmHandler: () => void,
    showConfirm: boolean,
    setShowConfirm: Dispatch<SetStateAction<boolean>>,
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}

const ConfirmModal: FC<ConfirmModalProps> = ({ showConfirm, setShowConfirm, open, setOpen, confirmHandler }) => {

    const deleteToggle = useAppSelector(state => state.toggle).Toggle

    const handelOpen = () => setOpen(!open)

    return (
        <>
            {showConfirm && <CustomizedDialogs
                title='delete'
                children={<div className="px-6 pb-3 gap-2 flex flex-col">
                    <p className="font-semibold text-lg">Are you sure?</p>
                    <Toggle id="deleteAll" text="delete All" toggle={deleteToggle} />
                    <div className="btns flex gap-1 justify-end">
                        <button className='bg-white text-black py-2 px-4 rounded-md hover:bg-slate-200 transition duration-75' onClick={() => setShowConfirm(false)}>cancel</button>
                        <button className='bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-75' onClick={confirmHandler}>confirm</button>
                    </div>
                </div>}
                open={open}
                handelOpen={handelOpen}
            />}
        </>
    );
}

export default ConfirmModal;