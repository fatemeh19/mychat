import RightSideMainPage from "@/src/components/mainPage/rightSideMainPage";
interface pageProps {
    params: {
        chatId: string
    }
}

const Page = async ({ params }: { params: any }) => {

    return (
        <>
            <RightSideMainPage contactId={params.chatId} />
        </>
    );
}

export default Page;