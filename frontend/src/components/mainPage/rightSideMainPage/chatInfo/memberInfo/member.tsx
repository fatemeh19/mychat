import ConfirmModal from "@/src/components/basicComponents/confirmModal";
import MemberRightClick from "@/src/components/rightClick/memberRightClick";
import findIndex from "@/src/helper/findIndex";
import { removeGroupMember } from "@/src/helper/useAxiosRequests";
import { profilePicHandler } from "@/src/helper/userInformation";
import { groupMemberInterface } from "@/src/models/interface";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
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

    const [contextMenu, setContextMenu] = useState(initialContextMenu)
    const [open, setOpen] = useState<boolean>(false)
    const [showConfirm, setShowConfirm] = useState<boolean>(false)
    const [confirmInfo, setConfirmInfo] = useState({
        confirmDiscription: '',
    })

    const chatId = useAppSelector(state => state.chat.Chat)._id
    const groupMembers = useAppSelector(state => state.chat).groupMembers
    const dispatch = useAppDispatch()

    const contaxtMenuHandler = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        e.preventDefault()
        const { clientX, clientY } = e
        // access to currentTarget = currentTarget = div:messageBox
        setContextMenu({ show: true, x: clientX, y: clientY })
        // const member = e.currentTarget
    }
    const deleteMember = () => {
        const groupMemberIds = groupMembers.map(groupMember => groupMember._id)
        const memberIndex = findIndex(0, groupMemberIds.length, groupMemberIds, member._id)
        removeGroupMember(chatId, member._id, memberIndex, dispatch)
        setShowConfirm(false)
        closeContextMenu()
    }
    const closeContextMenu = () => setContextMenu(initialContextMenu)

    const showConfirmModal = (type: string) => {
        setOpen(true)
        setShowConfirm(true)
        closeContextMenu()
        setConfirmInfo({
            confirmDiscription: 'Remove Fatemeh from the group?'
        })

    }

    return (
        <div key={member._id} className="flex px-5 py-2 gap-2 relative items-center w-full cursor-pointer hover:bg-gray-200 transition-all duration-100" onContextMenuCapture={contaxtMenuHandler}>
            {contextMenu.show && <MemberRightClick
                closeContextMenu={closeContextMenu}
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
                    src={profilePicHandler(member)}
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
            <ConfirmModal showConfirm={showConfirm} setShowConfirm={setShowConfirm} open={open} setOpen={setOpen} confirmHandler={deleteMember} confirmInfo={confirmInfo} />
        </div>
    );
}

export default Member;