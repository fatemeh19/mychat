'use client'
import { Dispatch, FC, SetStateAction, createRef, useContext } from "react";
import { HiOutlinePlus } from 'react-icons/hi'


interface profileImgSelector {
    setImage : Dispatch<SetStateAction<string | ArrayBuffer | null>>
}

const ProfileImgSelector: FC<profileImgSelector> = ({setImage}) => {

    const defaultBtn = createRef<HTMLInputElement>()
    const profileImg = createRef<HTMLImageElement>()

    const changeHandler = () => {
        // @ts-ignore
        const file = defaultBtn.current?.files[0]
        console.log(!!file)
        const reader = new FileReader()
        if (file) {
            reader.onload = () => {
                const result = reader.result;

                // @ts-ignore
                profileImg.current.src = result
                setImage(result)
            }
            reader.readAsDataURL(file)

        }
    };

    return (
        <div className="flex flex-col">
            <input
                ref={defaultBtn}
                name="imageInput"
                type="file"
                className=""
                accept="image/*"
                hidden
                onChange={changeHandler}
            />
            <div className="
                wraper
                overflow-hidden
                bg-transparent
                w-64 h-64
                rounded-full
                flex flex-col items-center justify-center
                border-2 border-dashed border-blue-500
                cursor-pointer
                relative
            ">
                <img
                    src=""
                    ref={profileImg}
                    alt=""
                    className="
                        absolute
                        w-full 
                        h-full
                        object-cover
                        border-4
                        border-white
                        rounded-full
                        "
                    onClick={() => defaultBtn.current?.click()}
                />
                <HiOutlinePlus className=" text-[100px] text-blue-500 " />
            </div>
        </div>
    );


}

export default ProfileImgSelector;