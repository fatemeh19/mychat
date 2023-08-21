import editChatSetting from "./editChatSetting.js";
import editNotifSound from "./editNotifSound.js";
import editprivSecu from "./editprivSecu.js";
const validatorSelector = async (title)=>{
    switch (title) {
        case "notificationAndSounds":
            return editNotifSound
        case "privacyAndSecurity":
            return editprivSecu
        case "chatSetting": 
            return editChatSetting   
        default:
            break;
    }
}
export default validatorSelector
    
