'use client'

import { FC, useState } from "react";
import ProfileImgSelector from "./profileImgSelector";
import TextInformation from "./textInformation";

interface CompleteInformationFormProps {

}

const CompleteInformationForm: FC<CompleteInformationFormProps> = ({ }) => {

    const [img, setImg] = useState<string>('')


    return (

        <div className="flex flex-col items-center gap-6 w-auto">
            <ProfileImgSelector setImage={setImg} />
            <TextInformation image={img} />
        </div>
    );


}

export default CompleteInformationForm;