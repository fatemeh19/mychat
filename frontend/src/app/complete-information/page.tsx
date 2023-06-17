import CompleteInformationForm from "@/src/components/completeInformationForm";
import Image from "next/image";
import { FC } from "react";
import { BsCaretRightFill } from 'react-icons/bs'

interface CompleteInformationProps {

}

const CompleteInformation: FC<CompleteInformationProps> = () => {


    

    return (
        <main className="md:grid w-full h-screen md:grid-cols-4">
            <div className="
                hidden 
                col-span-2 
                md:flex 
                items-center 
                justify-end 
                lg:pr-[150px]
                md:pr-[50px]
                ml-9
            ">
                <div>
                    <Image
                        width={300}
                        height={0}
                        alt="complete"
                        src={'/images/Collaboration-amico.png'}
                        className=""
                    />
                    <h1 className=" font-semibold text-md flex items-center gap-2 text-center " >
                        Help us set complete your informatoin
                        <BsCaretRightFill />
                    </h1>
                </div>
            </div>

            {/* *** col-span-2 *** */}
            <div className="md:col-span-2 flex h-full items-center md:justify-start justify-center pl-[50px]">
                <CompleteInformationForm />
            </div>
        </main>
    );
}

export default CompleteInformation;