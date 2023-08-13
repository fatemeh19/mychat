import ConfirmModal from "@/src/components/basicComponents/confirmModal";
import MemberRightClick from "@/src/components/rightClick/memberRightClick";
import { groupMemberInterface } from "@/src/models/interface";
import { FC, MouseEvent, useState } from "react";

interface MemberProps {
    member: groupMemberInterface
}


const initialContextMenu = {
    show: false,
    x: 0,
    y: 0
}

const Member: FC<MemberProps> = ({ member }) => {

    const profilePic = member?.profilePic ? (member.profilePic).split(`\\`) : '';
    const profilePicName = profilePic[profilePic.length - 1]

    const [contextMenu, setContextMenu] = useState(initialContextMenu)
    const [open, setOpen] = useState<boolean>(false)
    const [showConfirm, setShowConfirm] = useState<boolean>(false)
    const [confirmHandler, setConfirmHandler] = useState<() => void>(() => { })
    const [confirmInfo, setConfirmInfo] = useState({
        confirmTitle: '',
        confirmDiscription: '',
        confirmOption: '',
    })

    const contaxtMenuHandler = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        e.preventDefault()
        const { clientX, clientY } = e
        console.log(clientX, clientY)
        // access to currentTarget = currentTarget = div:messageBox
        setContextMenu({ show: true, x: clientX, y: clientY })
        // const member = e.currentTarget
    }
    const deleteMember = () => {

    }
    const closeContextMenu = () => setContextMenu(initialContextMenu)

    const showConfirmModal = (type: string) => {
        setOpen(true)
        setShowConfirm(true)
        closeContextMenu()
        setConfirmHandler(() => deleteMember)
        setConfirmInfo({
            confirmTitle: 'Delete',
            confirmDiscription: 'Are you sure?',
            confirmOption: 'delete All'
        })

    }

    return (
        <div key={member._id} className="flex px-5 py-2 gap-2 relative items-center w-full cursor-pointer hover:bg-gray-200 transition-all duration-100" onContextMenuCapture={contaxtMenuHandler}>
            {contextMenu.show && <MemberRightClick
                x={contextMenu.x}
                y={contextMenu.y}
                closeContextMenu={closeContextMenu}
                member={member}
                showConfirmModal={showConfirmModal}
            />}
            <div className={`
                    wraper
                    overflow-hidden
                    bg-transparent
                    w-12 h-12
                    rounded-full
                    flex flex-col items-center justify-start
                    
                `}>
                <img
                    src={`/uploads/photo/${profilePicName}`}
                    alt=""
                    className="
                        w-full 
                        h-full
                        object-cover
                        rounded-full
                        "
                />
            </div>
            <p >{member.name}</p>
            <ConfirmModal showConfirm={showConfirm} setShowConfirm={setShowConfirm} open={open} setOpen={setOpen} confirmHandler={confirmHandler} confirmInfo={confirmInfo} />
        </div>
    );
}

export default Member;