import { useAppSelector } from "@/src/redux/hooks";
import { FC, useState, Dispatch, SetStateAction, useRef, RefObject } from "react";
import InviteLinkHiddenMenu from "./inviteLinkHiddenMenu";
import { groupTypeSettingInterface } from "@/src/redux/features/chatSlice";

interface InviteLinkProps {
    groupTypeRef: RefObject<HTMLDivElement> | undefined,
    contentProtectionRef: RefObject<HTMLDivElement> | undefined,


    typeSetting: groupTypeSettingInterface,
    setTypeSetting: Dispatch<SetStateAction<groupTypeSettingInterface>>
}

const InviteLink: FC<InviteLinkProps> = ({ typeSetting, setTypeSetting, groupTypeRef, contentProtectionRef }) => {
    const [openHiddenMenu, setOpenHiddenMenu] = useState(false)
    // const [openChildMenuInChild, setOpenChildMenuInChild] = useState(true)
    const dropDownValue = useAppSelector(state => state.dropDown).DropDownValue
    const inviteLinkRef = useRef<HTMLParagraphElement>(null)
    const inviteLinkContainerRef = useRef<HTMLParagraphElement>(null)

    const openHiddenMenuHandler = () => {
        setOpenHiddenMenu(!openHiddenMenu);
        inviteLinkRef.current ? inviteLinkRef.current.classList.toggle('bg-white') : null
        inviteLinkContainerRef.current ? inviteLinkContainerRef.current.classList.toggle('bg-white') : null

        // gray groupType and contentProtection div to set focus on hidden menu
        groupTypeRef?.current?.classList.toggle('bg-white')
        contentProtectionRef?.current?.classList.toggle('bg-white')
    }

    return (
        <div className=" w-full flex flex-col items-start gap-5 relative select-none p-[25px] bg-white transition-all duration-200
                        shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)]" ref={inviteLinkContainerRef}>
            {
                dropDownValue === 'public'
                    ? <div className="flex flex-col gap-5">
                        <h1 className="text-mainColor font-semibold">public link</h1>
                        <div className="flex">
                            <label htmlFor="publicLink">mychat.me/</label>
                            {/* <input type="text" placeholder="link" value={publicLink} onChange={e => setPublicLink(e.target.value)} className="outline-none" /> */}
                            <input type="text" placeholder="link" value={typeSetting.url} onChange={e => setTypeSetting(prevState => ({ ...prevState, url: e.target.value }))} className="outline-none" />
                        </div>
                    </div>
                    : <div className="w-full flex flex-col gap-4">
                        <h1 className="text-mainColor font-semibold">invite link</h1>
                        <div className="w-full relative flex items-center justify-between p-3 pr-0 rounded-md bg-gray-100" ref={inviteLinkRef}>
                            <p className="">t.me/+Ujm01r1z6qDAxWLW</p>
                            <p className='rotate-90 cursor-pointer font-bold text-gray-600 tracking-wide' onClick={openHiddenMenuHandler}>...</p>
                            {openHiddenMenu &&
                                <InviteLinkHiddenMenu openHiddenMenu={openHiddenMenu} setOpenHiddenMenu={setOpenHiddenMenu} />
                            }
                        </div>
                    </div>
            }
        </div>
    );
}

export default InviteLink;