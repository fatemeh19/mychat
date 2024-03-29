import { ChatType } from "@/src/models/enum";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { BsPencil, BsTrash3 } from 'react-icons/bs'
import ConfirmModal from "../basicComponents/confirmModal";
import { setIsEditChat } from "@/src/redux/features/chatSlice";

interface PopUpMenuProps {
    setOpenChildMenu?: Dispatch<SetStateAction<boolean>>,
    openChildMenuInChild?: boolean,
    setOpenChildMenuInChild?: Dispatch<SetStateAction<boolean>>,
    handelOpen?: () => void
}

const PopUpMenu: FC<PopUpMenuProps> = ({ setOpenChildMenu, openChildMenuInChild, setOpenChildMenuInChild, handelOpen }) => {

    const [open, setOpen] = useState<boolean>(false)
    const [showConfirm, setShowConfirm] = useState<boolean>(false)
    const [confirmInfo, setConfirmInfo] = useState({
        confirmDiscription: '',
        confirmOption: ''
    })
    const [showChangeGroupInfo, setShowChangeGroupInfo] = useState(true)


    const dispatch = useAppDispatch()
    const userId = useAppSelector(state => state.userInfo.User)._id
    const chatId = useAppSelector(state => state.chat).Chat._id
    const socket = useAppSelector(state => state.socket).Socket
    const chatType = useAppSelector(state => state.chat.Chat).chatType
    const deleteToggle = useAppSelector(state => state.toggle).Toggle
    const permissions = useAppSelector(state => state.chat.Chat).userPermissionsAndExceptions.permissions
    const chat = useAppSelector(state => state.chat).Chat

    useEffect(() => {
        if (chatType === ChatType.group) {
            userId === chat.owner
                ? setShowChangeGroupInfo(true)
                : permissions.changeGroupInfo
                    ? setShowChangeGroupInfo(true)
                    : setShowChangeGroupInfo(false)

        } else {
            setShowChangeGroupInfo(true)
        }
    }, [permissions])


    const showDeleteAndLeaveGroupConfirmModal = () => {
        setShowConfirm(true)
        setOpen(true)
        setConfirmInfo({
            confirmDiscription: ' Are you sure you want to delete all message history and leave the group?',
            confirmOption: 'Delete for everyone'
        })
        setOpenChildMenuInChild && setOpenChildMenuInChild(false)

    }
    const deleteAndLeaveGroupHandler = () => {
        setOpenChildMenu && setOpenChildMenu(false)
        const deleteInfo = {
            chatId: chatId,
            deleteAll: deleteToggle
        }
        // socket && socket.emit('deleteChat', deleteInfo)
    }

    const EditGroupHandler = () => {
        setOpenChildMenu && setOpenChildMenu(false)
        // handelOpen && handelOpen()

        dispatch(setIsEditChat(true))
    }

    const saveEditGroupHandler = () => {
        setOpenChildMenu && setOpenChildMenu(false)
        dispatch(setIsEditChat(false))
    }

    return (
        <>
            {openChildMenuInChild &&
                <ul className="w-fit bg-white shadow-[0_1px_5px_-1px_rgba(0,0,0,0.3)] py-1">
                    {
                        showChangeGroupInfo
                            ? <li className="text-black py-2 px-4 hover:bg-gray-100 w-full transition-all duration-150 text-[15px] flex gap-2 font-normal" onClick={EditGroupHandler}>
                                <BsPencil className={`w-5 h-5`} />
                                <p>{chatType === ChatType.group ? 'Delete and Leave' : 'Edit contact'}</p>
                            </li>
                            : null
                    }
                    <li className="text-red-500 py-2 px-4 hover:bg-gray-100 w-full transition-all duration-150 text-[15px] flex gap-2" onClick={showDeleteAndLeaveGroupConfirmModal}>
                        <BsTrash3 className={`w-5 h-5`} />
                        <p>{chatType === ChatType.group ? 'Delete and Leave' : 'Delete Chat'}</p>
                    </li>

                    <ConfirmModal showConfirm={showConfirm} setShowConfirm={setShowConfirm} open={open} setOpen={setOpen} confirmHandler={deleteAndLeaveGroupHandler} confirmInfo={confirmInfo} confirmButtonText="Delete and Leave" />
                </ul>
            }
        </>
    );
}

export default PopUpMenu;