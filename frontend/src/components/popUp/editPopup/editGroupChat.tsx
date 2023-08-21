import { FC, useEffect, useState } from "react";
import EditChatInfo from "./parts/editInfo";
import PopUpBtns from "../popUpBtns";
import { setIsEditChat } from "@/src/redux/features/chatSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import EditGeneralSettings from "./parts/editGeneralSetting";
import EditPermissions from "./parts/editPermissions";
import { addProfilePic, editGroupInfo } from "@/src/helper/useAxiosRequests";

interface EditGroupChatProps {
}

const EditGroupChat: FC<EditGroupChatProps> = () => {

    const dispatch = useAppDispatch()

    const chatId = useAppSelector(state => state.chat.Chat)._id
    const chatName = useAppSelector(state => state.chat.Chat).name

    const [image, setImage] = useState('')
    const [groupName, setGroupName] = useState(chatName)
    const [formikbtnRef, setFormikbtnRef] = useState<any>()
    // const imageId = useAppSelector(state => state.chat.Chat).profilePic._id

    const editChatHandler = (values: any) => {
        setGroupName(values.chatName)
        console.log('values:', values)
        const data = {
            name: groupName,
            ...(values.description && { description: values.description })
        }
        editGroupInfo(chatId, data)
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
                <EditChatInfo setFormikbtnRef={setFormikbtnRef} setImage={setImage} chatName={groupName} setChatName={setGroupName} formikSubmitHandler={editChatHandler} />
                <EditGeneralSettings />
                <EditPermissions />

                <PopUpBtns title1="Cancle" id1="cancle" name1="cancle" title2="Save" id2="save" name2="save" onClickHandler1={() => dispatch(setIsEditChat(false))} onClickHandler2={() => { formikbtnRef.current?.click() }} btnContainerClassName={'flex justify-end gap-5'} />
            </div>
        </div>
    );
}

export default EditGroupChat;