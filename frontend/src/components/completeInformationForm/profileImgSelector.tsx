'use client'
import { Dispatch, FC, SetStateAction, createRef, useContext, useEffect } from "react";
import { HiOutlinePlus } from 'react-icons/hi'


interface profileImgSelector {
    setImage: Dispatch<SetStateAction<string>>,
    styleClassName?: string,
    chatProfilePicName?: any
}

const ProfileImgSelector: FC<profileImgSelector> = ({ chatProfilePicName, setImage, styleClassName }) => {

    const defaultBtn = createRef<HTMLInputElement>()
    const profileImg = createRef<HTMLImageElement>()

    useEffect(() => {
        // @ts-ignore
        profileImg.current.src = `/uploads/photo/${chatProfilePicName}`
    }, [chatProfilePicName])

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
            <div className={`
                ${`
                    wraper
                    overflow-hidden
                    bg-transparent
                    w-64 h-64
                    rounded-full
                    flex flex-col items-center justify-center
                    border-2 border-dashed border-blue-500
                    hover:border-blue-900
                    cursor-pointer
                    group
                    relative
                    ${styleClassName ?? ''}
                `}
            `}>
                <img
                    src=''
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
                        group-[:hover]:opacity-50
                        "
                    onClick={() => defaultBtn.current?.click()}
                />
                <HiOutlinePlus className=" text-[100px] group-[:hover]:text-blue-900 text-blue-500" />
            </div>
        </div>
    );


}

export default ProfileImgSelector;