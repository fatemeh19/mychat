import LoginForm from "@/src/components/auth/forms/loginForm"
import Image from "next/image"


const Login = () => {


    return (
        <div className="font-[Vazir] flex items-center justify-center w-full h-screen" >
            <div className=" w-[28rem] shadow-md px-9 pt-0 rounded-lg flex items-center flex-col">
                <div className=" w-full flex flex-col items-center mb-4">
                    <Image src={'/images/messenger-icon-3.svg'} width={50} height={0} alt="messenger-icon" />
                    <h1 className="text-2xl my-5 font-[600]">Login on messenger</h1>
                </div>
                <LoginForm />
                
            </div>
        </div>
    )
}

export default Login


