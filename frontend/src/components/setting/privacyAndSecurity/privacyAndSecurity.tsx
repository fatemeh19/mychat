import { FC, useEffect, useState } from "react";
import Security from "./security";
import Privacy from "./privary";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { privacyInterface, securityInterface } from "@/src/models/interface";
import { editSetting } from "@/src/helper/userInformation";
import { settingTitle } from "@/src/models/enum";

interface PrivacyAndSecurityProps {

}

const PrivacyAndSecurity: FC<PrivacyAndSecurityProps> = () => {

    const dispatch = useAppDispatch()

    const settingId = useAppSelector(state => state.userInfo.User).settingId
    const privacyAndSecurity = useAppSelector(state => state.userInfo.setting).privacyAndSecurity
    const { privacy, security } = privacyAndSecurity

    const [privacyState, setPrivacyState] = useState<privacyInterface>(privacy)
    const [securityState, setSecurityState] = useState<securityInterface>(security)

    const formData = new FormData()
    useEffect(() => {
        return () => {
            formData.append('phoneNumber', privacyState.phoneNumber)
            formData.append('lastseen', privacyState.lastseen)
            formData.append('profilePic', privacyState.profilePic)
            formData.append('addToGroup', privacyState.addToGroup)

            securityState.blockedUsers.map(blockUser => {
                formData.append('security[blockedUsers]', blockUser)
            })
            editSetting(settingTitle.privacyAndSecurity, settingId, formData, dispatch)
        }
    }, [privacyState, securityState])

    return (
        <div className="overflow-auto overflow-x-hidden chat-scrollbar bg-gray-100 flex flex-col gap-3">
            <Security securityState={securityState} setSecurityState={setSecurityState} />
            <Privacy privacyState={privacyState} setPrivacyState={setPrivacyState} />
        </div>
    );
}

export default PrivacyAndSecurity;