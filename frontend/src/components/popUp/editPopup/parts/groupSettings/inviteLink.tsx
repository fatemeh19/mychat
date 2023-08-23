import { useAppSelector } from "@/src/redux/hooks";
import { FC, useState, Dispatch, SetStateAction, useRef } from "react";
import InviteLinkHiddenMenu from "./inviteLinkHiddenMenu";

interface InviteLinkProps {
    publicLink: string,
    setPublicLink: Dispatch<SetStateAction<string>>
}

const InviteLink: FC<InviteLinkProps> = ({ publicLink, setPublicLink }) => {
    const [openHiddenMenu, setOpenHiddenMenu] = useState(false)
    // const [openChildMenuInChild, setOpenChildMenuInChild] = useState(true)
    const dropDownValue = useAppSelector(state => state.dropDown).DropDownValue
    const inviteLinkRef = useRef<HTMLParagraphElement>(null)

    const openHiddenMenuHandler = () => {
        console.log('opening')
        setOpenHiddenMenu(!openHiddenMenu);
        inviteLinkRef.current ? inviteLinkRef.current.style.background = 'white' : null
    }

    return (
        <div className="overflow-hidden w-full flex flex-col items-start gap-5 relative select-none p-[25px] bg-white
                        shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)]">
            {
                dropDownValue === 'public'
                    ? <div className="flex flex-col gap-5">
                        <h1 className="text-mainColor font-semibold">public link</h1>
                        <div className="flex">
                            <label htmlFor="publicLink">mychat.me/</label>
                            <input type="text" placeholder="link" value={publicLink} onChange={e => setPublicLink(e.target.value)} />
                        </div>
                    </div>
                    : <div className="w-full flex flex-col gap-4">
                        <h1 className="text-mainColor font-semibold">invite link</h1>
                        <div className="w-full relative flex items-center justify-between p-3 pr-0 rounded-md bg-gray-100">
                            <p className="" ref={inviteLinkRef}>t.me/+Ujm01r1z6qDAxWLW</p>
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