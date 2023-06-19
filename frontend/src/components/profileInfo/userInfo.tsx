import { FC } from "react";
import Informatin from "../mainPage/rightSideMainPage/chatInfo/information";
import InfoSetting from "../mainPage/rightSideMainPage/chatInfo/infoSetting";
import InfoFiles from "../mainPage/rightSideMainPage/chatInfo/infoFiles";
import MoreAction from "../mainPage/rightSideMainPage/chatInfo/moreAction";

interface UserInfoProps {
    User : any
}
 
const UserInfo: FC<UserInfoProps> = ({User}) => {
    return ( 
        <>
            <Informatin User={User}/>
            <InfoSetting User={User}/>
            <InfoFiles />
            <MoreAction />
        </>
     );
}
 
export default UserInfo;