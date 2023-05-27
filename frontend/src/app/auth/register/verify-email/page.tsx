
import { SiMinutemailer } from 'react-icons/si'


const VerifyEmail = () => {


    return (
        <div className="font-[Vazir] flex items-center justify-center w-full h-screen bg-blue-600" >
            <div className="verify-box bg-white w-[500px] flex items-center justify-center flex-col p-8 rounded-md">
                <SiMinutemailer className="text-blue-600 text-7xl mb-4" />
                <h1 className="font-[700] text-3xl">Verify your email</h1>
                <p className="text-gray-500 my-3">Hi Dear! Use the link below to verify your email and start enjoying your Chat</p>
                <button className="bg-mainColor font-[600] rounded-md text-white w-full p-3 my-2">Verify email</button>
            </div>
        </div>
    )
}

export default VerifyEmail