import editNotifSound from "./editNotifSound.js";

const validatorSelector = async (title)=>{
    switch (title) {
        case "notificationAndSounds":
            return editNotifSound
    
        default:
            break;
    }
}
export default validatorSelector
    
