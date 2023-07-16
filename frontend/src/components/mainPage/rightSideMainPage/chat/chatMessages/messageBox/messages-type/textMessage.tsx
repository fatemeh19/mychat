import { recievedMessageInterface } from "@/src/models/interface"



const TextMessage = ({ dir, msg }: { dir: string, msg: recievedMessageInterface }) => {

    // const hour = new Date(msg.createdAt)
    const date = new Date(msg.createdAt);
    const time = date.getHours() + ":" + date.getMinutes()

    return (
        <div className=" max-w-lg ">
            <div className={`relative flex gap-1 items-end px-2 py-1 w-fit rounded-xl shadow-[0_0_1px_.1px_rgb(0_0_0_/.2)] ${dir === 'rtl' ? 'rounded-tr-sm bg-white' : 'rounded-tl-sm bg-yellow-200'} dark:bg-bgColorDark3 dark:text-white`}>
                <p className="break-all whitespace-pre-line text-sm ">
                    {msg.content.text}
                </p>
                <div className="w-20 h-2 relative">
                    <span className="absolute right-0 bottom-[-5px] date text-xs text-[#9a9a9a] ml-1 mb-[.5px] whitespace-nowrap">{time} AM
                        <span className="pl-1 text-green-500"> \// </span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default TextMessage