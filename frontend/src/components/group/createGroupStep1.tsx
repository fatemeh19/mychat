import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import ProfileImgSelector from "../completeInformationForm/profileImgSelector";
import InputField from "../auth/input/inputField";
import Input from "../auth/input";
import { Form, Formik } from "formik";
import * as yup from 'yup'

interface CreateGroupStep1Props {
    createGroupOpenHandler: () => void,
    setOpenAddContactToGroup: Dispatch<SetStateAction<boolean>>,
    groupPic: any,
    setGroupPic: Dispatch<SetStateAction<any>>,
    groupName: string,
    setGroupName: Dispatch<SetStateAction<string>>
}

const CreateGroupStep1: FC<CreateGroupStep1Props> = ({
    createGroupOpenHandler,
    setOpenAddContactToGroup,
    groupPic,
    setGroupPic,
    groupName,
    setGroupName
}) => {


    useEffect(() => {
        console.log('image : ', groupPic)
    }, [groupPic])

    const initialValues = {
        groupName: groupName
    }

    const validation = yup.object().shape({
        groupName: yup.string().required()
    })

    const submitHandler = (values: any) => {
        console.log('next', values)
        setGroupName(values.groupName)
        setOpenAddContactToGroup(true)
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values) => submitHandler(values)}
            validationSchema={validation}
        >
            <Form >

                <div className="overflow-hidden w-full flex flex-col items-end gap-5 relative select-none p-[25px] pb-[15px]">

                    <div className="no-scrollbar flex overflow-y-auto w-full ">
                        <ProfileImgSelector setImage={setGroupPic} styleClassName="!w-20 !h-20" />
                        <InputField name="groupName" label="Group name" containerClassName={'w-full !mr-0'} />
                    </div>

                    <div className="flex gap-5">
                        <button
                            id="add-contact"
                            name="add contact"
                            onClick={createGroupOpenHandler}
                            className="font-semibold cursor-pointer bg-white hover:text-sky-700 transition-all duration-150 text-sky-500 outline-none text-base "
                        >Cancle</button>
                        <button
                            type="submit"
                            id="add-contact"
                            name="add contact"
                            className="font-semibold cursor-pointer bg-white hover:text-sky-700 transition-all duration-150 text-sky-500 outline-none text-base "
                        >Next</button>
                    </div>
                </div>
            </Form>
        </Formik>
    );
}

export default CreateGroupStep1;