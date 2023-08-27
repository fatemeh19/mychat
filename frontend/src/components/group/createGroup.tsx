import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import CustomizedDialogs from '../popUp';
import CreateGroupStep1 from './createGroupStep1';
import CreateGroupStep2 from './createGroupStep2';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import callApi from '@/src/helper/callApi';
import { addChatToUserChatList, fetchUserChatList } from '@/src/helper/userInformation';

interface CreateGroupProps {
    openCreateGroup: boolean,
    setOpenCreateGroup: Dispatch<SetStateAction<boolean>>,
    createGroupOpenHandler: () => void
}

const CreateGroup: FC<CreateGroupProps> = ({
    openCreateGroup,
    setOpenCreateGroup,
    createGroupOpenHandler
}) => {

    const [openAddContactToGroup, setOpenAddContactToGroup] = useState(false)
    const [memberIds, setMemberIds] = useState<string[]>([])
    const [groupPic, setGroupPic] = useState('')
    const [groupName, setGroupName] = useState('')

    const dispatch = useAppDispatch()
    const createGroupHandler = async () => {
        try {
            let formData = new FormData()
            formData.append('profilePic', groupPic)
            formData.append('name', groupName)
            memberIds.map(mId => {
                formData.append('memberIds', mId)
            })
            formData.append('chatType', 'group')

            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const res = await callApi().post('/main/chat/', formData, config)
            console.log('createGroup res : ', res)
            if (res.status === 201 || res.statusText === 'created') {
                const newChat = res.data.value.chat
                addChatToUserChatList(newChat, dispatch)
            }
        } catch (error) {
            console.log('create group error: ', error)
        }



        setOpenCreateGroup(false)
    }

    return (
        <>
            {/* <CustomizedDialogs children={<CreateGroup createGroupOpenHandler={createGroupOpenHandler} />} menuDailog={false} open={openCreateGroup} handelOpen={createGroupOpenHandler} /> */}
            {
                openAddContactToGroup
                    ? (
                        <CustomizedDialogs
                            title='Add Members'
                            children={<CreateGroupStep2 buttonHandler={createGroupHandler} setOpenAddContactToGroup={setOpenAddContactToGroup} memberIds={memberIds} setMemberIds={setMemberIds} buttonTitle='Create' />}
                            open={openCreateGroup}
                            handelOpen={createGroupOpenHandler} />

                    )
                    : (
                        <CustomizedDialogs
                            children={<CreateGroupStep1 createGroupOpenHandler={createGroupOpenHandler} setOpenAddContactToGroup={setOpenAddContactToGroup} groupPic={groupPic} setGroupPic={setGroupPic} groupName={groupName} setGroupName={setGroupName} />}
                            open={openCreateGroup}
                            handelOpen={createGroupOpenHandler} />
                    )
            }
        </>
    );
}

export default CreateGroup;