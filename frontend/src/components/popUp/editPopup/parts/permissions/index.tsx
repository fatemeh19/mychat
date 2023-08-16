import { Dispatch, FC, SetStateAction } from "react";
import PopUpBtns from "../../../popUpBtns";
import { useAppDispatch } from "@/src/redux/hooks";
import { setIsEditChat } from "@/src/redux/features/chatSlice";
import { setOpenPermissions } from "@/src/redux/features/openSlice";

interface PermissionsProps {
}

const Permissions: FC<PermissionsProps> = () => {

    const dispatch = useAppDispatch()
    return (
        <div>
            Permitions

            {/* <PopUpBtns
                title1="Cancle"
                id1="cancle"
                name1="cancle"
                title2="Save"
                id2="save"
                name2="save"
                onClickHandler1={() => { setOpenPermissions(false); dispatch(setIsEditChat(true)) }}
                onClickHandler2={() => { console.log('save permissions!') }}
                btnContainerClassName={'flex justify-end gap-5'}
            /> */}

        </div>
    );
}

export default Permissions;