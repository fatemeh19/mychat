import { FC } from "react";
import Informatin from "../mainPage/rightSideMainPage/chatInfo/information";
import InfoSetting from "../mainPage/rightSideMainPage/chatInfo/infoSetting";
import InfoFiles from "../mainPage/rightSideMainPage/chatInfo/infoFiles";
import MoreAction from "../mainPage/rightSideMainPage/chatInfo/moreAction";

interface UserInfoProps {
}
 
const UserInfo: FC<UserInfoProps> = () => {
    return ( 
        <>
            <Informatin/>
            <InfoSetting/>
            <InfoFiles />
            <MoreAction />
        </>
     );
}
 
export default UserInfo;