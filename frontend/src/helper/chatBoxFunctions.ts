import { MouseEvent } from "react"
import { setChatOpenInList } from "../redux/features/chatOpenInListSlice"
import { folderInterface } from "../redux/features/folderSlice"
import { setShowReply } from "../redux/features/repliedMessageSlice"
import { setActiveSelection } from "../redux/features/selectedMessagesSlice"
import { openHandle } from "../redux/features/userChatListSlice"
// handel click on chatbox
export const handler = (chatList: any, dispatch: any, contactId: string, popup: boolean) => {

    for (let i = 0; i < chatList.length; i++) {
        if (chatList[i].open) {
            dispatch(openHandle(i))
        }
        if (chatList[i].chatInfo._id == contactId) {
            dispatch(openHandle(i))
            dispatch(setChatOpenInList(true))
            popup ? dispatch(setShowReply(true)) : null
            popup ? dispatch(setActiveSelection(false)) : null
            break
        }
        else if (chatList.length - 1 == i) {
            dispatch(setChatOpenInList(false))

        }
    }
}

export const checkChatPinOrUnpin = (folders: folderInterface[], UserPinnedChats: any[], chatId: string, folderId: string) => {
    let pin = true;
    if (folderId == '') {

        UserPinnedChats.map(chat => {
            if (chat.chatInfo == chatId) {
                pin = false
            }
        })
    }
    else {
        folders.map(folder => {
            if (folder._id == folderId) {
                folder.pinnedChats.map(chat => {
                    if (chat.chatInfo == chatId) {
                        pin = false
                    }
                })

            }
        })
    }
    return pin;
}

export const findChatInfo = (setChatsInfo: (arr: any[]) => void, chatList: any, chatIds: any[]) => {
    setChatsInfo([])
    for (let i = 0; i < chatIds.length; i++) {
        for (let j = 0; j < chatList.length; j++) {
            if (chatIds[i] === chatList[j]._id) {
                // @ts-ignore
                setChatsInfo(chatInfo => [...chatInfo, chatList[j]]);
                break;
            }
        }
    }


}