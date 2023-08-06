import { FC, Dispatch, SetStateAction } from "react";

import Toggle from "./toggle/toggle";
import CustomizedDialogs from "../popUp";
import { useAppSelector } from "@/src/redux/hooks";

interface ConfirmModalProps {
    confirmHandler: () => void,
    confirmInfo: {
        confirmTitle: string;
        confirmDiscription: string;
        confirmOption: string;
    }
    showConfirm: boolean,
    setShowConfirm: Dispatch<SetStateAction<boolean>>,
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}

const ConfirmModal: FC<ConfirmModalProps> = ({ showConfirm, setShowConfirm, open, setOpen, confirmInfo, confirmHandler }) => {

    const deleteToggle = useAppSelector(state => state.toggle).Toggle

    const handelOpen = () => setOpen(!open)

    return (
        <>
            {showConfirm && <CustomizedDialogs
                title={confirmInfo.confirmTitle}
                children={<div className="px-6 pb-3 gap-2 flex flex-col">
                    <p className="text-base">{confirmInfo.confirmDiscription}</p>
                    <Toggle id="deleteAll" text={confirmInfo.confirmOption} toggle={deleteToggle} />
                    <div className="btns flex gap-1 justify-end">
                        <button className='text-blue-500 py-2 pl-4 font-semibold rounded-md hover:text-blue-700 transition-all duration-150' onClick={() => setShowConfirm(false)}>Cancel</button>
                        <button className='text-blue-500 py-2 pl-4 font-semibold rounded-md hover:text-blue-700 transition-all duration-150' onClick={confirmHandler}>Confirm</button>
                    </div>
                </div>}
                open={open}
                handelOpen={handelOpen}
            />}
        </>
    );
}

export default ConfirmModal;