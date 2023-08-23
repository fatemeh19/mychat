import SearchBox from "@/src/components/mainPage/leftSideMainPage/chatList/searchBox";
import PopUpBtns from "@/src/components/popUp/popUpBtns";
import { setIsEditChat } from "@/src/redux/features/chatSlice";
import { setOpenExceptions } from "@/src/redux/features/openSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { FC } from "react";
import ExceptionItem from "./exceptionItem";

interface PermissionExceptionsProps {

}

const PermissionExceptions: FC<PermissionExceptionsProps> = () => {

    const dispatch = useAppDispatch()
    const exceptions = useAppSelector(state => state.chat.Chat).userPermissionsAndExceptions.exceptions

    return (
        <div className="overflow-auto overflow-x-hidden chat-scrollbar bg-white h-[60vh] mb-[50px]">
            <SearchBox />

            {
                exceptions.map(exception => {
                    console.log(exception)
                    return <ExceptionItem />
                })
            }

            <PopUpBtns
                title1="Close"
                id1="close"
                name1="close"
                title2="Add exceptions"
                id2="addExceptions"
                name2="addExceptions"
                onClickHandler1={() => { dispatch(setOpenExceptions(false)); dispatch(setIsEditChat(true)) }}
                onClickHandler2={() => { console.log('Add exceptions!') }}
            // btnContainerClassName={'flex justify-between'}
            />
        </div>
    );
}

export default PermissionExceptions;