"use client"

import callApi from "@/src/helper/callApi"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FC, useState } from "react"
import { SiMinutemailer } from 'react-icons/si'
interface VerifyEmailComponentProps {
    searchParams: any,
}

const VerifyEmailComponent: FC<VerifyEmailComponentProps> = ({ searchParams }) => {
    const [verified, setVerified] = useState(false)
    const [second, setSecond] = useState<number>(10)

    const router = useRouter()

    const verifyEmailHandler = async () => {
        console.log('search params in verify components : ', searchParams)
        // سرچ پارامز شامل ایمیل و توکن است و به همین آبجکت رو به ای پی آی میفرستیم
        const res = await callApi().post('/auth/verifyEmail', searchParams)
        console.log('res : ', res)

        // اینجا باید کدی اضاف بشه که چک کنه اگه استاتوس رسپانس 200 بود یا اوکی بود اونموقع وریفای رو ترو کنه
        if (res.statusText === "OK") setVerified(true)
        console.log('verified')

        setTimeout(() => {
            setSecond(second - 1)
        }, 1000)

        setTimeout(() => {
            router.push('/auth/login')
        }, 10000)
    }

    console.log('how')

    return (
        <>
            {
                !verified
                    ?
                    (
                        <div className="font-[Vazir] flex items-center justify-center w-full h-screen bg-blue-600" >
                            <div className="verify-box bg-white w-[500px] flex items-center justify-center flex-col p-8 rounded-md">
                                <SiMinutemailer className="text-blue-600 text-7xl mb-4" />
                                <h1 className="font-[700] text-3xl">Verify your email</h1>
                                <p className="text-gray-500 my-3">Hi Dear! Use the link below to verify your email and start enjoying your Chat</p>
                                <button
                                    className="bg-mainColor font-[600] rounded-md text-white w-full p-3 my-2"
                                    onClick={verifyEmailHandler}
                                > Verify email
                                </button>
                            </div>
                        </div>
                    )
                    :
                    (
                        <div className="font-[Vazir] flex items-center justify-center w-full h-screen bg-blue-600" >
                            <div className="verify-box bg-white w-[500px] flex items-center justify-center flex-col p-8 rounded-md">
                                <SiMinutemailer className="text-blue-600 text-7xl mb-4" />
                                {/* اینجا یه گیف تیک اضافه بشه */}
                                <h1 className="font-[700] text-3xl">Your Email Verified!!!!</h1>

                                <p className="mt-5 text-gray-600">after <span className="text-blue-500">{second}</span> second you will translate to login page</p>

                            </div>
                        </div>
                    )}
        </>

        // <>
        //     <div className="bg-gray-100 w-full h-screen flex items-center justify-center font-[vazir]">
        //         <div className="box flex items-center flex-col w-[400px] h-aut p-3 bg-white rounded-lg relative">
        //             {/* <svg width="130" height="50" className="absolute top-0">
        //                 <path d="M10,0 a65,70 0 0,0 115,0" fill="#f3f4f6" />
        //             </svg>
        //             <Image 
        //                 width={500}
        //                 height={0}
        //                 src={'/images/logo2.png'}
        //                 alt=""
        //                 className="w-20 my-2 mt-6 absolute top-[-55px] right-[150px]"
        //                 /> */}

        //             <Image
        //                 width={500}
        //                 height={0}
        //                 src={'/images/tik3.png'}
        //                 alt=""
        //                 className="w-20 mb-3"
        //             />
        //             <h1 className="font-bold" > Please verify your email </h1>

        //             <p className="text-center opacity-75 leading-5 text-xs my-5">
        //                 <span className=""> Just click on the below link to complete your signup</span>
        //                 <br />
        //                 <span> and start chatting your friends.</span>

        //             </p>

        //             <button className="
        //                 bg-blue-500 rounded-lg py-3 px-8 text-white
        //                 transition-all duration-300 outline-none active:bg-blue-500
        //                 hover:bg-blue-700
        //                 "
        //                 // onClick={verifyEmailHandler}
        //             > verify email</button>
        //         </div>
        //     </div>
        // </>
    )
}


export default VerifyEmailComponent