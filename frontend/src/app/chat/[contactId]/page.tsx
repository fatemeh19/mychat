import RightSideMainPage from "@/src/components/mainPage/rightSideMainPage";
interface pageProps {
    params: {
        chatId: string
    }
}

const Page = async ({ params }: { params: any }) => {

    return (
        <>
            <RightSideMainPage contactId={params.contactId} />
        </>
    );
}

export default Page;