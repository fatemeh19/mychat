import RightSideMainPage from "@/src/components/mainPage/rightSideMainPage";
import callApi from "@/src/helper/callApi";
import UseLocalStorage from "@/src/helper/useLocalStorate";
import { Socket } from "dgram";
import { FC } from "react";
import io from 'socket.io-client'
interface pageProps {
    params: {
        chatId: string
    }
}



const Page = async ({ params }: { params: any }) => {

    console.log('params : ', params.contactId)

    return (
        <>
            {/* my chat
            <h1>params :::::: {params.userId}</h1> */}
            <RightSideMainPage contactId={params.contactId} />
        </>
    );
}

export default Page;