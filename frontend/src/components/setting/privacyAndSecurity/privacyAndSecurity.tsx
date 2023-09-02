import { FC, useEffect, useState } from "react";
import Security from "./security";
import Privacy from "./privary";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { privacyInterface, securityInterface } from "@/src/models/interface";
import { editSetting } from "@/src/helper/userInformation";
import { settingTitle } from "@/src/models/enum";

interface PrivacyAndSecurityProps {
    blockUserOpenHandler: () => void
}

const PrivacyAndSecurity: FC<PrivacyAndSecurityProps> = ({ blockUserOpenHandler }) => {

    const dispatch = useAppDispatch()

    const settingId = useAppSelector(state => state.userInfo.User).settingId
    const privacyAndSecurity = useAppSelector(state => state.userInfo.setting).privacyAndSecurity
    const { privacy, security } = privacyAndSecurity

    const [privacyState, setPrivacyState] = useState<privacyInterface>(privacy)
    const [securityState, setSecurityState] = useState<securityInterface>(security)

    const formData = new FormData()
    useEffect(() => {
        return () => {
            formData.append('privacy[phoneNumber]', privacyState.phoneNumber)
            formData.append('privacy[lastseen]', privacyState.lastseen)
            formData.append('privacy[profilePic]', privacyState.profilePic)
            formData.append('privacy[addToGroup]', privacyState.addToGroup)

            securityState.blockedUsers.map(blockUser => {
                formData.append('security[blockedUsers]', blockUser)
            })
            editSetting(settingTitle.privacyAndSecurity, settingId, formData, dispatch)
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