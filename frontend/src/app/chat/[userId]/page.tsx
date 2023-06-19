import RightSideMainPage from "@/src/components/mainPage/rightSideMainPage";
import callApi from "@/src/helper/callApi";
import UseLocalStorage from "@/src/helper/useLocalStorate";
import { FC } from "react";

interface pageProps {
    params: {
        chatId: string
    }
}



const Page = async ({ params }: { params: any }) => {

    console.log('params : ', params.userId)

    return (
        <>
            {/* my chat
            <h1>params :::::: {params.userId}</h1> */}
            <RightSideMainPage userId={params.userId} />
        </>
    );
}

export default Page;