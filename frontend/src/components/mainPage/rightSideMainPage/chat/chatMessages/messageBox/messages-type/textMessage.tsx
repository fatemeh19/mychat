import { recievedMessageInterface } from "@/src/models/interface"



const TextMessage = ({ dir, msg }: { dir: string, msg: recievedMessageInterface }) => {

    // const hour = new Date(msg.createdAt)
    const date = new Date(msg.createdAt);
    const time = date.getHours() + ":" + date.getMinutes()

    return (
        <div className="relative max-w-lg ">
            <div className={`bg-green-300 px-2  w-fit rounded-xl shadow-[0_0_1px_.1px_rgb(0_0_0_/.2)] ${dir === 'rtl' ? 'rounded-tr-sm bg-blue-400' : 'rounded-tl-sm bg-yellow-200'} dark:bg-bgColorDark3 dark:text-white`}>
                <p className="break-all whitespace-pre-line bg-yellow-200">
                    {msg.content.text}
                </p>
                <span className="date text-xs text-[#9a9a9a] mb-[.5px] whitespace-nowrap ml-2 bg-red-200">{time}</span>
            </div>
        </div>
    )
}

export default TextMessage