import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import Security from "./security";
import Privacy from "./privary";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { privacyInterface, securityInterface } from "@/src/models/interface";
import { editSetting } from "@/src/helper/userInformation";
import { settingTitle } from "@/src/models/enum";

interface PrivacyAndSecurityProps {
    blockUserOpenHandler: () => void,
    flag: boolean,
    setFlag: Dispatch<SetStateAction<boolean>>
}

const PrivacyAndSecurity: FC<PrivacyAndSecurityProps> = ({ blockUserOpenHandler, flag, setFlag }) => {

    const dispatch = useAppDispatch()

    const settingId = useAppSelector(state => state.userInfo.User).settingId
    const privacyAndSecurity = useAppSelector(state => state.userInfo.setting).privacyAndSecurity
    const { privacy, security } = privacyAndSecurity

    const [privacyState, setPrivacyState] = useState<privacyInterface>(privacy)
    const [securityState, setSecurityState] = useState<securityInterface>(security)

    const formData = new FormData()
    useEffect(() => {
        if (flag) {
            return () => {
                formData.append('privacy[phoneNumber]', privacyState.phoneNumber)
                formData.append('privacy[lastseen]', privacyState.lastseen)
                formData.append('privacy[profilePic]', privacyState.profilePic)
                formData.append('privacy[addToGroup]', privacyState.addToGroup)

                console.log('securityState.blockedUsers: ', securityState.blockedUsers)
                securityState.blockedUsers.map(blockUser => {
                    formData.append('security[blockedUsers]', blockUser)
                })

                editSetting(settingTitle.privacyAndSecurity, settingId, formData, dispatch)
                setFlag(false)
            }
        }
    }, [privacyState, securityState])

    return (
        <div className="overflow-auto overflow-x-hidden chat-scrollbar bg-gray-100 flex flex-col gap-3">
            <Security securityState={securityState} setSecurityState={setSecurityState} blockUserOpenHandler={blockUserOpenHandler} />
            <Privacy privacyState={privacyState} setPrivacyState={setPrivacyState} />
        </div>
    );
}

export default PrivacyAndSecurity;