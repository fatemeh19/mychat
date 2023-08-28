'use client'
import { profilePicHandler } from "@/src/helper/userInformation";
import { UserInterface } from "@/src/redux/features/userInfoSlice";
import { Dispatch, FC, SetStateAction, createRef, useContext } from "react";
import { BiCamera } from 'react-icons/bi'


interface ImgSelector {
    setImage: Dispatch<SetStateAction<string>>,
    userInfo: any
}

const ImageSelector: FC<ImgSelector> = ({ setImage, userInfo }) => {

    const defaultBtn = createRef<HTMLInputElement>()
    const profileImg = createRef<HTMLImageElement>()

    const changeHandler = (e: any) => {
        // @ts-ignore
        const file = defaultBtn.current?.files[0]
        const reader = new FileReader()
        if (file) {
            reader.onload = () => {
                const result = reader.result;

                // @ts-ignore
                profileImg.current.src = result
                setImage(e.target.files[0])
            }
            reader.readAsDataURL(file)

        }
    };

    return (
        <div className="flex justify-center">
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
                
                w-32 h-32
                rounded-full
                flex items-center justify-center
                cursor-pointer
                group
                bg-sky-100

                relative
            ">
                <img
                    src={profilePicHandler(userInfo)}
                    ref={profileImg}
                    alt=""
                    className="
                        absolute
                        w-full 
                        h-full
                        object-cover
                        rounded-full
                        group-[:hover]:opacity-50
                        "
                    onClick={() => defaultBtn.current?.click()}
                />
                <div className="w-[40px] h-[40px] absolute right-[5px] bottom-[4px] pt-[8px] rounded-full flex justify-center group-[:hover]:bg-blue-700 bg-blue-500">
                    <BiCamera className=" text-2xl text-white" />
                </div>
            </div>
        </div>
    );


}

export default ImageSelector;