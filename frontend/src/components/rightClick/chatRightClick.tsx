"use client"

import { useAppSelector } from '@/src/redux/hooks';
import Image from 'next/image';
import { FC, useEffect, useRef, MouseEvent } from 'react'
import { BiCheck } from 'react-icons/bi';
import { PiFolderSimplePlus, PiPushPinBold, PiSelection } from 'react-icons/pi'
import { RiUnpinLine } from 'react-icons/ri';
import style from './style.module.css'
import { useOnClickOutside } from './useOnClickOutside';

interface ChatRightClickProps {
    x: number,
    y: number,
    chatId: string,
    chatPin: boolean,
    closeContextMenu: () => void,
    showConfirmModal: (title: string, folderId: string) => void,
    showConfirmModalPin: (title: string) => void,
}

const ChatRightClick: FC<ChatRightClickProps> = ({
    x,
    y,
    chatId,
    chatPin,
    closeContextMenu,
    showConfirmModal,
    showConfirmModalPin
}) => {

    const contextMenuRef = useRef<HTMLDivElement>(null)
    const hiddenScroll = useRef<HTMLDivElement>(null)
    // click out of contextMenu : close contextMenu
    useOnClickOutside(contextMenuRef, closeContextMenu)

    // set the contextMenu cordinate 
    useEffect(() => {
        let
            winWidth = window.innerWidth,
            winHeight = window.innerHeight,
            // @ts-ignore
            cmWidth = contextMenuRef.current.offsetWidth,
            // @ts-ignore
            cmHeight = contextMenuRef.current.offsetHeight

        const distWidth = winWidth - cmWidth
        const distHeight = winHeight - cmHeight

        console.log(x, distWidth)
        console.log(y, distHeight)

        // contextMenu position : 
        // @ts-ignore
        if (x > distWidth) {
            // @ts-ignore
            contextMenuRef.current.style.left = `${distWidth - 10}px`
        }

        if (y > distHeight) {
            // @ts-ignore
            contextMenuRef.current.style.top = `${distHeight - 90}px`
        }

        // @ts-ignore
        let hmWidth = hiddenScroll.current.offsetWidth

        const distHiddenWidth = winWidth - hmWidth

        // hiddenMenu position :
        if (x + cmWidth > distHiddenWidth) {
            // @ts-ignore
            hiddenScroll.current.style.right = '116px'
        } else {
            // @ts-ignore
            hiddenScroll.current.style.left = ''
        }



        // child?.classList.add('select')

        // return () => {
        //     // child.style.background = 'white'
        //     child?.classList.remove('select')
        // }
    }, [x, y])
    console.log('in')
    console.log(x, y)
    const folders = useAppSelector(state => state.folders).folders
    return (
        <>
            <div
                className={`absolute z-20 ${style.wrapper} ${style.p} ${style.li}`}
                style={{ top: `${0}px`, right: `${0}px` }}
                ref={contextMenuRef}
            >
                <div className={`${style.content}`}>
                    <ul className={`${style.menu}`}>
                        <li className={`${style.item}`}
                            onClick={() => showConfirmModalPin('Pin/UnPin')}
                        >
                            {chatPin ? <RiUnpinLine /> :
                                <PiPushPinBold className={`${style.icon}`} />
                            }
                            <span>{
                                chatPin ? 'UnPin' : 'Pin'
                            }</span>
                        </li>

                        <li className={`${style.item} ${style.extend}`}>
                            <PiFolderSimplePlus className={`${style.icon}`} />
                            <span>Add to folder</span>
                            <div className={`${style.extend_box} extend-box`}>
                                <span className={`${style.extend_icon}`}> {'>'} </span>
                                <div ref={hiddenScroll} className={`${style.hidden_scroll} hidden-scroll`}>
                                    <ul className={`${style.extend_menu}`}>
                                        {folders.map((folder) => (

                                            <li key={folder._id}
                                                onClick={() => showConfirmModal('Add/Remove', folder._id)}
                                                className={`${style.item}`}>
                                                {
                                                    folder.chats.map(chat => (
                                                        chat.chatInfo == chatId ?
                                                            <BiCheck className='' />
                                                            : null
                                                    ))
                                                }
                                                <span>{folder.name}</span>
                                            </li>
                                        )
                                        )}

                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default ChatRightClick;