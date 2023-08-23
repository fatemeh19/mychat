import Image from "next/image";
import { FC } from "react";

interface ExceptionItemProps {

}

const ExceptionItem: FC<ExceptionItemProps> = () => {
    return (
        <div className="bg-white hover:bg-gray-100 transition-all duration-150">
            <div className="flex items-center justify-between">
                <Image src={''} alt="img" width={200} height={0} />
                <div className="info flex flex-col items-center justify-start">
                    <p className="userName font-semibold text-black">username</p>
                    <p className="text-gray-200">Restricted by Fatemeh</p>
                </div>
                <button className="text-blue-500">Delete</button>
            </div>
        </div>
    );
}

export default ExceptionItem;