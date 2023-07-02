"use client"

import Image from "next/image"
import Message from "./message"
import { messageTypes } from "@/src/models/enum"

import { MessageBoxProps } from "@/src/models/enum"
import { useAppSelector } from "@/src/redux/hooks"
import { messageInterface } from "@/src/models/interface"

const MessageBox = ({ msg }: { msg: messageInterface }) => {
    const User = useAppSelector(state => state.userInfo).User
    const Contact = useAppSelector(state => state.userContact).Contact

    let information = {
        dir: MessageBoxProps.rtl,
        name: '',
        messageSendTime: '',
        profilePic: ''
    }
    if (msg.senderId === User._id) {
        const profilePic = Contact.profilePic ? (Contact.profilePic).split(`\\`): '';
        const profilePicName = Contact.profilePic ? profilePic[profilePic.length - 1] : '' ;

        information.dir = MessageBoxProps.rtl
        information.name = User.name
        information.messageSendTime = ''
        information.profilePic = profilePicName
    }
    else {
        
        const profilePic = Contact.profilePic ? (Contact.profilePic).split(`\\`) : '';
        const profilePicName = Contact.profilePic ? profilePic[profilePic.length - 1] : '' ;
        information.dir = MessageBoxProps.ltr
        information.name = Contact.name
        information.messageSendTime = ''
        information.profilePic = profilePicName
    }
    // src={
    //     userContact.profilePic
    //     ? `/uploads/picture/${profilePicName[profilePicName.length - 1]}`
    //     : '/uploads/picture/defaultProfilePic.png'
    // }
    console.log('messagebox called')

    return (
        <>

            <div className="">
                <div className={`flex gap-5 ${information.dir === 'rtl' ? 'flex-row-reverse' : ''} `}>
                    <div className="profileImageBox relative">
                        {/* this image for box width so the text dont go under the profile image and make the opacity - 0 so we can see the second image ... i use this method til find better way */}
                        <Image
                            // src={'/images/girl-profile3.jpg'}
                            src={
                                information.profilePic
                                    ? `/uploads/picture/${information.profilePic}`
                                    : '/uploads/picture/defaultProfilePic.png'
                            }
                            width={45}
                            height={0}
                            alt=""
                            className="rounded-full opacity-0 max-w-lg "
                        />
                        <Image
                            src={
                                information.profilePic
                                    ? `/uploads/picture/${information.profilePic}`
                                    : '/uploads/picture/defaultProfilePic.png'
                            }
                            width={45}
                            height={0}
                            alt=""
                            className="rounded-full absolute top-0 left-0 max-w-lg w-[50px] h-[50px] object-cover "
                        />
                    </div>
                    <div className="content flex flex-col">
                        <div className={`flex gap-2 items-end mb-2 ${information.dir === 'rtl' ? 'flex-row-reverse' : ''} `}>
                            <h1 className="name font-bold text-sm text-center whitespace-nowrap dark:text-white">{information.name}</h1>
                            <p className="date text-xs text-[#9a9a9a] mb-[.5px] whitespace-nowrap ">9:12 AM</p>
                        </div>
                        <div className="gap-3 flex flex-col">
                            <Message type={msg.content.contentType} dir={information.dir} msg={msg} />
                            {/* <Message type={messageTypes.image} isText={true} dir={dir} /> */}
                        </div>
                    </div>
                </div>
            </div>
            {

                // dir === MessageBoxProps.rtl
                //     ? (
                //         // me
                //         <div className="">
                //             <div className="flex gap-5 flex-row-reverse">
                //                 <div className="profileImageBox relative">
                //                     {/* this image for box width so the text dont go under the profile image and make the opacity - 0 so we can see the second image ... i use this method til find better way */}
                //                     <Image
                //                         src={'/images/girl-profile3.jpg'}
                //                         width={45}
                //                         height={0}
                //                         alt=""
                //                         className="rounded-full opacity-0 max-w-lg min-w-fit"
                //                     />
                //                     <Image
                //                         src={'/images/girl-profile3.jpg'}
                //                         width={45}
                //                         height={0}
                //                         alt=""
                //                         className="rounded-full absolute top-0 left-0 max-w-lg min-w-fit"
                //                     />
                //                 </div>
                //                 <div className="content flex flex-col">
                //                     <div className="flex gap-2 items-end mb-2 flex-row-reverse ">
                //                         <h1 className="name font-bold text-sm text-center whitespace-nowrap dark:text-white">Putri Tanjak</h1>
                //                         <p className="date text-xs text-[#9a9a9a] mb-[.5px] whitespace-nowrap ">9:12 AM</p>
                //                     </div>
                //                     <div className="gap-3 flex flex-col">
                //                         <Message type={messageTypes.text} />
                //                         <Message type={messageTypes.image} isText={true} />
                //                     </div>
                //                 </div>
                //             </div>
                //         </div>
                //     )
                // : (
                //     // others
                //     <div className="">
                //         <div className="flex gap-5">
                //             <div className="profileImageBox relative">
                //                 {/* this image for box width so the text dont go under the profile image and make the opacity - 0 so we can see the second image ... i use this method til find better way */}
                //                 <Image
                //                     src={'/images/girl-profile3.jpg'}
                //                     width={45}
                //                     height={0}
                //                     alt=""
                //                     className="rounded-full opacity-0 max-w-lg min-w-fit"
                //                 />
                //                 <Image
                //                     src={'/images/girl-profile3.jpg'}
                //                     width={45}
                //                     height={0}
                //                     alt=""
                //                     className="rounded-full absolute top-0 left-0 max-w-lg min-w-fit"
                //                 />
                //             </div>
                //             <div className="content flex flex-col">
                //                 <div className="flex gap-2 items-end mb-2 ">
                //                     <h1 className="name font-bold text-sm text-center whitespace-nowrap  dark:text-white">Putri Tanjak</h1>
                //                     <p className="date text-xs text-[#9a9a9a] mb-[.5px] whitespace-nowrap ">9:12 AM</p>
                //                 </div>
                //                 <div className="gap-3 flex flex-col">
                //                     <Message type={messageTypes.text} />
                //                     <Message type={messageTypes.image} isText={true} />
                //                     <Message type={messageTypes.image} isText={false} />

                //                 </div>
                //             </div>
                //         </div>
                //     </div>
                // )
            }

        </>

    )
}

export default MessageBox