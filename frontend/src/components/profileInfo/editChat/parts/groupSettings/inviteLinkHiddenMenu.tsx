import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { BsPencil, BsTrash3 } from 'react-icons/bs'
import { setIsEditChat } from "@/src/redux/features/chatSlice";
import ConfirmModal from "@/src/components/basicComponents/confirmModal";

interface InviteLinkHiddenMenuProps {
    openHiddenMenu?: boolean,
    setOpenHiddenMenu?: Dispatch<SetStateAction<boolean>>,
}

const InviteLinkHiddenMenu: FC<InviteLinkHiddenMenuProps> = ({ openHiddenMenu, setOpenHiddenMenu }) => {

    const [open, setOpen] = useState<boolean>(false)
    const [showConfirm, setShowConfirm] = useState<boolean>(false)
    const [confirmInfo, setConfirmInfo] = useState({
        confirmDiscription: '',
        confirmOption: ''
    })


    const dispatch = useAppDispatch()
    const chatId = useAppSelector(state => state.chat).Chat._id

    const showRevokeLinkConfirmModal = () => {
        console.log('show')
        setShowConfirm(true)
        setOpen(true)
        setConfirmInfo({
            confirmDiscription: ' Are you sure you want to revoke this link? Once the link is revoked, no one witll be able to join useing it.',
            confirmOption: 'Delete for everyone'
        })
        setOpenHiddenMenu && setOpenHiddenMenu(false)

    }
    const revokeLinkHandler = () => {
        console.log('revoke Link')
        setOpenHiddenMenu && setOpenHiddenMenu(false)
        // const deleteInfo = {
        //     chatId: chatId,
        // }
    }

    const getQRCodeHandler = () => {
        console.log('get QR code')
        setOpenHiddenMenu && setOpenHiddenMenu(false)

        // dispatch(setIsEditChat(true))
    }

    return (
        <>
            {
                openHiddenMenu &&
                <div className={`absolute right-0 top-14 w-max font-[Vazir] z-10 `}>
                    <ul className="w-fit bg-white shadow-[0_1px_5px_-1px_rgba(0,0,0,0.3)] py-1">
                        <li className="text-black py-2 px-4 hover:bg-gray-100 w-full transition-all duration-150 text-[15px] flex gap-2 font-normal cursor-pointer" onClick={getQRCodeHandler}>
                            <BsPencil className={`w-5 h-5`} />
                            <p>Get QR code</p>
                        </li>
                        <li className="text-red-500 py-2 px-4 hover:bg-gray-100 w-full transition-all duration-150 text-[15px] flex gap-2 cursor-pointer" onClick={showRevokeLinkConfirmModal}>
                            <BsTrash3 className={`w-5 h-5`} />
                            <p>Revoke Link</p>
                        </li>
                        <ConfirmModal showConfirm={showConfirm} setShowConfirm={setShowConfirm} open={open} setOpen={setOpen} confirmHandler={revokeLinkHandler} confirmInfo={confirmInfo} />
                    </ul>



                </div>
            }
        </>
    );
}

export default InviteLinkHiddenMenu;