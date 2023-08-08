import { Dispatch, FC, SetStateAction } from "react";
import { BiSearch } from "react-icons/bi";
import { useAppDispatch } from "@/src/redux/hooks";
import ChatListItems from "../mainPage/leftSideMainPage/chatList/chatListItems";
import { setIsForward } from "@/src/redux/features/forwardMessageSlice";

interface ChatListPopupProps {
    setForwardPopupOpen: Dispatch<SetStateAction<boolean>>
}

const ChatListPopup: FC<ChatListPopupProps> = ({ setForwardPopupOpen }) => {

    const dispatch = useAppDispatch()

    const cancleForwardHandler = () => {
        dispatch(setIsForward(false))
        setForwardPopupOpen(false)
    }
    return (
        <>
            <div className="overflow-hidden contacts-list w-full h-[80vh] relative select-none">
                <div className="search-contacts flex pl-[15px]">
                    <BiSearch className="text-xl text-gray-400  mt-[15px]" />
                    <input type="text" className='outline-none bg-transparent w-full border-none p-3' placeholder='Search..' />
                </div>
                <div className=""><hr className="w-full text-gray-100 opacity-[.3]" /></div>
                <div className="no-scrollbar overflow-y-auto pt-3">
                    {
                        <ChatListItems popup={true} />
                    }

                </div>

                <div className="absolute bottom-0 w-full bg-white ">
                    <div className=""><hr className="w-full text-gray-100 opacity-[.3]" /></div>
                    <div className={`flex justify-end px-[15px] py-3 relative`}>
                        <button
                            id='cancle'
                            name='cancle'
                            onClick={cancleForwardHandler}
                            className="font-semibold cursor-pointer bg-white hover:text-sky-700 transition-all duration-150 text-sky-500 outline-none text-base "
                        >Cancle</button>
                    </div>

                </div>
            </div>

        </>
    );
}

export default ChatListPopup;