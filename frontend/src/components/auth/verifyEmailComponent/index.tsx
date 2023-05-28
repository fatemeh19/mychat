"use client"

import callApi from "@/src/helper/callApi"
import { Dispatch, FC, SetStateAction, useState } from "react"
import { SiMinutemailer } from 'react-icons/si'
interface VerifyEmailComponentProps {
    searchParams: any,
}

const VerifyEmailComponent: FC<VerifyEmailComponentProps> = ({ searchParams }) => {
    const [verified, setVerified] = useState(false)


    const verifyEmailHandler = async () => {
        console.log('search params in verify components : ', searchParams)
        // سرچ پارامز شامل ایمیل و توکن است و به همین آبجکت رو به ای پی آی میفرستیم
        const res = await callApi().post('/auth/verifyEmail', searchParams)
        console.log('res : ', res)

        // اینجا باید کدی اضاف بشه که چک کنه اگه استاتوس رسپانس 200 بود یا اوکی بود اونموقع وریفای رو ترو کنه
        if (res.statusText === "OK") setVerified(true)
        console.log('verified')
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
                            </div>
                        </div>
                    )}
        </>
    )
}


export default VerifyEmailComponent