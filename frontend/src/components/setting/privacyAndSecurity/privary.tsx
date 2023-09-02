import { useAppSelector } from "@/src/redux/hooks";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import CustomizedDialogs from "../../popUp";
import SelectOption from "./selectOption";
import { privacyInterface } from "@/src/models/interface";

interface PrivacyProps {
    privacyState: privacyInterface,
    setPrivacyState: Dispatch<SetStateAction<privacyInterface>>
}

const Privacy: FC<PrivacyProps> = ({ privacyState, setPrivacyState }) => {

    const [openPhoneNumberOption, setOpenPhoneNumberOption] = useState(false)
    const [openLastseenOption, setOpenLastseenOption] = useState(false)
    const [openProfilePicOption, setOpenProfilePicOption] = useState(false)
    const [openAddToGroupOption, setOpenAddToGroupOption] = useState(false)

    useEffect(() => {
        console.log('privacyState : ', privacyState)

        return () => {
            console.log('return ')
            console.log('privacyState in return  : ', privacyState)

        }
    }, [privacyState])


    return (
        <div className="w-full flex flex-col gap-2 items-start px-5 py-3 bg-white shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)]">
            <h1 className="text-mainColor">Privacy</h1>

            <ul className="w-full flex flex-col items-start justify-center gap-3 ">
                <li className="cursor-pointer hover:text-mainColor w-full" onClick={() => setOpenPhoneNumberOption(!openPhoneNumberOption)}>Phone Number</li>
                <li className="cursor-pointer hover:text-mainColor w-full" onClick={() => setOpenLastseenOption(!openLastseenOption)}>Last seen</li>
                <li className="cursor-pointer hover:text-mainColor w-full" onClick={() => setOpenProfilePicOption(!openProfilePicOption)}>Profile picture</li>
                <li className="cursor-pointer hover:text-mainColor w-full" onClick={() => setOpenAddToGroupOption(!openAddToGroupOption)}>Add to group</li>
            </ul>

            {
                openPhoneNumberOption && <CustomizedDialogs
                    open={openPhoneNumberOption}
                    handelOpen={() => setOpenPhoneNumberOption(!openPhoneNumberOption)}
                    children={<SelectOption
                        value={privacyState.phoneNumber}
                        privacyStateHandler={(value) => setPrivacyState(prevState => ({ ...prevState, phoneNumber: value }))}
                    />}
                />
            }
            {
                openLastseenOption && <CustomizedDialogs
                    open={openLastseenOption}
                    handelOpen={() => setOpenLastseenOption(!openLastseenOption)}
                    children={<SelectOption
                        value={privacyState.lastseen}
                        privacyStateHandler={(value) => setPrivacyState(prevState => ({ ...prevState, lastseen: value }))}

                    />}
                />
            }
            {
                openProfilePicOption && <CustomizedDialogs
                    open={openProfilePicOption}
                    handelOpen={() => setOpenProfilePicOption(!openProfilePicOption)}
                    children={<SelectOption
                        value={privacyState.profilePic}
                        privacyStateHandler={(value) => setPrivacyState(prevState => ({ ...prevState, profilePic: value }))}
                    />}
                />
            }
            {
                openAddToGroupOption && <CustomizedDialogs
                    open={openAddToGroupOption}
                    handelOpen={() => setOpenAddToGroupOption(!openAddToGroupOption)}
                    children={<SelectOption
                        value={privacyState.addToGroup}
                        privacyStateHandler={(value) => setPrivacyState(prevState => ({ ...prevState, addToGroup: value }))}
                    />}
                />
            }
        </div>
    );
}

export default Privacy;