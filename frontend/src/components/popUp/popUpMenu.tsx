import { ChatType } from "@/src/models/enum";
import { useAppSelector } from "@/src/redux/hooks";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { BsTrash3 } from 'react-icons/bs'
import ConfirmModal from "../basicComponents/confirmModal";

interface PopUpMenuProps {
    setOpenChildMenu?: Dispatch<SetStateAction<boolean>>,
    openChildMenuInChild?: boolean,
    setOpenChildMenuInChild?: Dispatch<SetStateAction<boolean>>,
}

const PopUpMenu: FC<PopUpMenuProps> = ({ setOpenChildMenu, openChildMenuInChild, setOpenChildMenuInChild }) => {

    const [open, setOpen] = useState<boolean>(false)
    const [showConfirm, setShowConfirm] = useState<boolean>(false)
    const [confirmInfo, setConfirmInfo] = useState({
        confirmDiscription: '',
        confirmOption: ''
    })


    const chatId = useAppSelector(state => state.chat).Chat._id
    const socket = useAppSelector(state => state.socket).Socket
    const chatType = useAppSelector(state => state.chat.Chat).chatType
    const deleteToggle = useAppSelector(state => state.toggle).Toggle


    const showDeleteAndLeaveGroupConfirmModal = () => {
        console.log('show')
        setShowConfirm(true)
        setOpen(true)
        setConfirmInfo({
            confirmDiscription: ' Are you sure you want to delete all message history and leave the group?',
            confirmOption: 'Delete for everyone'
        })
        setOpenChildMenuInChild && setOpenChildMenuInChild(false)

    }
    const deleteAndLeaveGroupHandler = () => {
        console.log('delete and remove')
        setOpenChildMenu && setOpenChildMenu(false)
        const deleteInfo = {
            chatId: chatId,
            deleteAll: deleteToggle
        }
        socket && socket.emit('deleteChat', deleteInfo)
    }

    return (
        <div className="w-fit bg-white shadow-[0_1px_5px_-1px_rgba(0,0,0,0.3)] py-1">
            {openChildMenuInChild && <div className="text-red-500 py-2 px-4 hover:bg-gray-100 w-full transition-all duration-150 text-[15px] flex gap-2" onClick={showDeleteAndLeaveGroupConfirmModal}>
                <BsTrash3 className={`w-5 h-5`} />
                <p>{chatType === ChatType.group ? 'Delete and Leave' : 'Delete Chat'}</p>
            </div>
            }

            <ConfirmModal showConfirm={showConfirm} setShowConfirm={setShowConfirm} open={open} setOpen={setOpen} confirmHandler={deleteAndLeaveGroupHandler} confirmInfo={confirmInfo} />
        </div>
    );
}

export default PopUpMenu;