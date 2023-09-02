import { securityInterface } from "@/src/models/interface";
import { Dispatch, FC, SetStateAction } from "react";
import { HiOutlineHandRaised } from "react-icons/hi2";

interface SecurityProps {
    securityState: securityInterface,
    setSecurityState: Dispatch<SetStateAction<securityInterface>>,
    blockUserOpenHandler: () => void
}

const Security: FC<SecurityProps> = ({ securityState, setSecurityState, blockUserOpenHandler }) => {
    return (
        <div className="w-full flex flex-col gap-5 items-start px-5 pb-3 bg-white shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)]">
            <h1 className="text-mainColor">Security</h1>
            <div className='flex gap-2 cursor-pointer' onClick={blockUserOpenHandler}>
                <HiOutlineHandRaised className='text-xl' />
                <p className='text-sm'>
                    Block user
                </p>
            </div>
        </div>
    );
}

export default Security;