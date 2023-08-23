import { FC } from "react";
import { LuKey } from 'react-icons/lu'
import { useAppDispatch } from "@/src/redux/hooks";
import { setOpenPermissions } from "@/src/redux/features/openSlice";

interface EditPermissionsProps {
}

const EditPermissions: FC<EditPermissionsProps> = () => {

    const dispatch = useAppDispatch()

    return (
        <div className="overflow-hidden w-full flex flex-col items-end justify-between gap-5 relative py-1 select-none bg-white
                        shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)]">
            <div className="flex items-center gap-3 w-full hover:bg-gray-100 cursor-pointer p-[25px] transition-all duration-150" onClick={() => { dispatch(setOpenPermissions(true)) }}>
                <LuKey className="w-6 h-6 bg-green-500 rounded-[5px] text-center text-white p-[2px] text-xs" />
                <p>Permitions</p>
            </div>


        </div>
    );
}

export default EditPermissions;