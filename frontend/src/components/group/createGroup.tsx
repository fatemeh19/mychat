import { Dispatch, FC, SetStateAction, useState } from 'react'
import CustomizedDialogs from '../popUp';
import CreateGroupStep1 from './createGroupStep1';
import CreateGroupStep2 from './createGroupStep2';

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

    // const [open, setOpen] = useState(false)
    // const handelOpen = () => {
    //     setOpen(!open)
    // }

    const [openAddContactToGroup, setOpenAddContactToGroup] = useState(false)

    return (
        <>
            {/* <CustomizedDialogs children={<CreateGroup createGroupOpenHandler={createGroupOpenHandler} />} menuDailog={false} open={openCreateGroup} handelOpen={createGroupOpenHandler} /> */}
            {
                openAddContactToGroup
                    ? (
                        <CustomizedDialogs
                            children={<CreateGroupStep2 createGroupOpenHandler={createGroupOpenHandler} />}
                            open={openCreateGroup}
                            handelOpen={createGroupOpenHandler} />

                    )
                    : (
                        <CustomizedDialogs
                            children={<CreateGroupStep1 createGroupOpenHandler={createGroupOpenHandler} setOpenAddContactToGroup={setOpenAddContactToGroup} />}
                            open={openCreateGroup}
                            handelOpen={createGroupOpenHandler} />
                    )
            }

            {/* <div className="overflow-hidden contacts-list w-full h-[80vh] relative select-none">

                <div className="no-scrollbar h-full overflow-y-auto pb-[30%]">

                </div>

                <div>
                    <button
                        id="add-contact"
                        name="add contact"
                        onClick={createGroupOpenHandler}
                        className="font-semibold cursor-pointer bg-white hover:text-sky-700 transition-all duration-150 text-sky-500 outline-none text-base "
                    >Cancle</button>
                    <button
                        id="add-contact"
                        name="add contact"
                        onClick={() => {
                            createGroupOpenHandler()

                        }}
                        className="font-semibold cursor-pointer bg-white hover:text-sky-700 transition-all duration-150 text-sky-500 outline-none text-base "
                    >Next</button>
                </div>
            </div> */}
        </>
    );
}

export default CreateGroup;