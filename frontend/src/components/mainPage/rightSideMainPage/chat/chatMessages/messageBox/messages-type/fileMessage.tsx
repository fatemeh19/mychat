import { fileType } from "@/src/models/enum";
import { recievedMessageInterface } from "@/src/models/interface";
import { FC, useState, createRef, useEffect } from "react";
import { PiFilePdf, PiFileDoc, PiFileZip, PiFileXls, PiFilePpt, PiFile } from "react-icons/pi"
import RepliedMessage from "./repliedMessage";

interface FileMessageProps {
    dir: string,
    msg: recievedMessageInterface
}

const FileMessage: FC<FileMessageProps> = ({ dir, msg }) => {

    const [playing, setPlay] = useState(false);



    const date = new Date(msg.messageInfo.createdAt);
    const time = date.getHours() + ":" + date.getMinutes()

    const fileFullUrl = msg.messageInfo.content.url.split('\\')
    const fileUrl = fileFullUrl.slice(fileFullUrl.length - 3, fileFullUrl.length)

    const originalName = msg.messageInfo.content.originalName?.split('.')
    const pasvand = originalName ? originalName[1] : ''

    // const Icon2 = playing ? BsFillPauseCircleFill : BsFillPlayCircleFill

    let Icon = PiFile;
    switch (pasvand) {
        case fileType.pdf:
            Icon = PiFilePdf

            break;
        case fileType.docx:
            Icon = PiFileDoc

            break;
        case fileType.pptx:
            Icon = PiFilePpt

            break;
        case fileType.zip:
            Icon = PiFileZip

            break;
        case fileType.xlsx:
            Icon = PiFileXls

            break;

        default:
            Icon = PiFile

            break;
    }


    let file = createRef<HTMLDivElement>();
    useEffect(() => {
        file = createRef<HTMLDivElement>()
    }, [])

    const handelPlayPause = () => {

    }

    return (
        <div className={`px-3 pt-3 pb-1  rounded-3xl ${dir === 'rtl' ? 'rounded-tr-sm bg-white' : 'rounded-tl-sm bg-yellow-200'}`}  >
            <div className=" flex items-center w-60 gap-2">
                {
                    msg.messageInfo.reply.isReplied && <RepliedMessage msg={msg} containerClassName={'px-2 py-1'} />
                }
                <div className={` control bg-[#fafafa] cursor-pointer w-12 h-14 rounded-lg flex items-center justify-center transition duration-500 ease-in-out `} onClick={handelPlayPause}>
                    <Icon className={`w-14 h-14 text-blue-500`} />
                </div>
                <div className="info">
                    <p className="font-semibold text-sm">{msg.messageInfo.content.originalName}</p>
                    <p className="size text-xs text-[#9a9a9a] mt-1 uppercase"> 52.7 MB {pasvand} </p>
                </div>
                <div ref={file}></div>
            </div>
            <p className={`date text-xs text-[#9a9a9a] mb-1 mt-1 whitespace-nowrap`}>{time}</p>
        </div>
    );
}

export default FileMessage;