import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import CustomizedDialogs from '../popUp';
import CreateGroupStep1 from './createGroupStep1';
import CreateGroupStep2 from './createGroupStep2';
import { useAppSelector } from '@/src/redux/hooks';
import callApi from '@/src/helper/callApi';

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
    const userId = useAppSelector(state => state.userInfo).User._id

    const createGroupHandler = async () => {
        // add userId to memberIds
        setMemberIds(prev => [...prev, userId])

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
        } catch (error) {
            console.log('error in catch text info : ', error)
        }



        setOpenCreateGroup(false)
    }

    useEffect(() => {
        console.log('memberIds : ', memberIds)
    }, [memberIds])

    return (
        <>
            {/* <CustomizedDialogs children={<CreateGroup createGroupOpenHandler={createGroupOpenHandler} />} menuDailog={false} open={openCreateGroup} handelOpen={createGroupOpenHandler} /> */}
            {
                openAddContactToGroup
                    ? (
                        <CustomizedDialogs
                            title='Add Members'
                            children={<CreateGroupStep2 createGroupHandler={createGroupHandler} setOpenAddContactToGroup={setOpenAddContactToGroup} memberIds={memberIds} setMemberIds={setMemberIds} />}
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