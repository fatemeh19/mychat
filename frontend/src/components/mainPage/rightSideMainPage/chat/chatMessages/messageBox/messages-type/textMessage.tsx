import { recievedMessageInterface } from "@/src/models/interface"



const TextMessage = ({ dir, msg}: { dir: string, msg: recievedMessageInterface }) => {

    // const hour = new Date(msg.createdAt)
    const date = new Date(msg.createdAt); 
    const time = date.getHours() + ":" + date.getMinutes()
    console.log('date : ', date.getHours(),":", date.getMinutes())
    console.log('createAt type : ', msg.createdAt)

    return (
        <div className="relative max-w-lg ">
            <div className={`bg-white w-fit rounded-lg shadow-[0_.3px_.1px_.5px_rgb(0_0_0_/.2)] ${dir === 'rtl' ? 'rounded-tr-sm bg-blue-400' : 'rounded-tl-sm bg-yellow-200'} dark:bg-bgColorDark3 dark:text-white`}>
                <p className="break-all px-2 py-1 pb-2">
                    {msg.content.text}
                    <p className="date text-xs text-[#9a9a9a] mb-[.5px] whitespace-nowrap ">{time}</p>
                </p>
            </div>
        </div>
    )
}

export default TextMessage