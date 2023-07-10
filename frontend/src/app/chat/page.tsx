import VoiceMessage from "@/src/components/mainPage/rightSideMainPage/chat/chatMessages/messageBox/messages-type/voiceMessage";
import WaveSound from "@/src/components/mainPage/rightSideMainPage/chat/chatMessages/messageBox/messages-type/waveSound";

export default function Page() {

    return (
        <main className="flex flex-col h-screen items-center justify-center text-2xl">
            no chat
            <WaveSound />
            <VoiceMessage />
        </main>
    )
}
