import { FC } from "react";

interface ChatSettingsProps {

}

const ChatSettings: FC<ChatSettingsProps> = () => {
    return (
        <div className="w-full flex gap-5 items-center px-5 pb-3 bg-white shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)]">
            chat settings
        </div>
    );
}

export default ChatSettings;