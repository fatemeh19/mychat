import { FC, useEffect, useState } from "react";
import EditChatInfo from "./parts/editInfo";
import { setIsEditChat } from "@/src/redux/features/chatSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import EditGeneralSettings from "./parts/editGeneralSetting";
import EditPermissions from "./parts/editPermissions";
import { editGroupInfo, editProfilePic } from "@/src/helper/useAxiosRequests";
import PopUpBtns from "../../popUp/popUpBtns";
// import findIndex from "@/src/helper/findIndex";
import { editNameInChatOfChatList } from "@/src/redux/features/userChatListSlice";

interface EditGroupChatProps {
}

const EditGroupChat: FC<EditGroupChatProps> = () => {

    const dispatch = useAppDispatch()

    const chat = useAppSelector(state => state.chat).Chat
    const chatName = useAppSelector(state => state.chat.Chat).name
    const chatDescription = useAppSelector(state => state.chat.Chat).description
    const dropDownValue = useAppSelector(state => state.dropDown).DropDownValue
    const chatList = useAppSelector(state => state.userChatList).chatList
    const folderChatList = useAppSelector(state => state.userChatList).folderChatList

    const [image, setImage] = useState('')
    const [groupName, setGroupName] = useState(chatName)
    const [formikbtnRef, setFormikbtnRef] = useState<any>()
    // const imageId = useAppSelector(state => state.chat.Chat).profilePic._id

    const editChatHandler = (values: any) => {
        setGroupName(values.chatName)
        console.log('values:', values)
        const groupInfoData = {
            name: values.chatName,
            ...(values.description && { description: values.description })
        }

        console.log('groupInfoData:', groupInfoData)

        const index = chatList.findIndex(c => c.chatInfo._id === chat._id)
        if (image !== '') {
            const formData = new FormData()
            formData.append('profilePic', image)
            editProfilePic(chat.profilePic._id, formData, index, dispatch)
        }
        if (chatName !== values.chatName || chat.description !== values.description) {
            editGroupInfo(chat._id, groupInfoData, index, dispatch)
        }

        dispatch(setIsEditChat(false))
    }


    useEffect(() => {
        console.log("image : ", image)
        // const formData = new FormData;
        // formData.append('profilePic', image)
        // addProfilePic(imageId,formData)
    }, [image])
    useEffect(() => {
        console.log("groupName : ", groupName)
    }, [groupName])

    return (
        <div className="overflow-auto overflow-x-hidden chat-scrollbar bg-gray-100 mb-[50px]">
            <div className="gap-3 flex flex-col ">
                <EditChatInfo setFormikbtnRef={setFormikbtnRef} setImage={setImage} chatName={groupName} chatDescription={chatDescription} setChatName={setGroupName} formikSubmitHandler={editChatHandler} />
                <EditGeneralSettings />
                <EditPermissions />

                <PopUpBtns title1="Cancle" id1="cancle" name1="cancle" title2="Save" id2="save" name2="save" onClickHandler1={() => dispatch(setIsEditChat(false))} onClickHandler2={() => { formikbtnRef.current?.click() }} btnContainerClassName={'flex justify-end gap-5'} />
            </div>
        </div>
    );
}

export default EditGroupChat;