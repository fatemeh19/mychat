"use client"

import Image from 'next/image';
import { FC, useEffect, useRef, MouseEvent } from 'react'

import { GoPeople } from 'react-icons/go'
import { PiSelection } from 'react-icons/pi'
import { FiEdit2, FiCopy } from 'react-icons/fi'
import { BsReply, BsLink45Deg, BsTrash3 } from 'react-icons/bs'
import { PiPushPinLight, PiPushPinSlashLight } from 'react-icons/pi'

import style from './style.module.css'
import { useOnClickOutside } from './useOnClickOutside';
import { recievedMessageInterface } from '@/src/models/interface';
import { useAppSelector } from '@/src/redux/hooks';
import { ChatType } from '@/src/models/enum';

interface RightClickProps {
    x: number,
    y: number,
    child: Element | undefined,
    msg: recievedMessageInterface,
    closeContextMenu: () => void,
    showConfirmModal: (type: string) => void,
    activeSelection: (e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>) => void,
    activeReply: (e: MouseEvent<HTMLDivElement | HTMLLIElement, globalThis.MouseEvent>) => void
    pinMessage: () => void
    forwardMessage: () => void;
}

const RightClick: FC<RightClickProps> = ({
    x,
    y,
    closeContextMenu,
    child,
    msg,
    showConfirmModal,
    activeSelection,
    activeReply,
    pinMessage,
    forwardMessage
}) => {

    const chat = useAppSelector(state => state.chat).Chat

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

        if (chat.chatType === ChatType.group) {
            // @ts-ignore
            let hmWidth = hiddenScroll.current.offsetWidth

            const distHiddenWidth = winWidth - hmWidth

            // hiddenMenu position :
            if (x + cmWidth > distHiddenWidth) {
                // @ts-ignore
                chat.chatType === ChatType.group ? hiddenScroll.current.style.right = '116px' : null
            } else {
                // @ts-ignore
                chat.chatType === ChatType.group ? hiddenScroll.current.style.left = '' : null
            }
        }


        child?.classList.add('select')

        return () => {
            // child.style.background = 'white'
            child?.classList.remove('select')
        }
    }, [x, y])

    return (
        <>
            <div
                className={`absolute z-20 ${style.wrapper} ${style.p} ${style.li}`}
                style={{ top: `${y}px`, left: `${x}px` }}
                ref={contextMenuRef}
            >
                <div className={`${style.content}`}>
                    <ul className={`${style.menu}`}>
                        <li className={`${style.item}`} onClick={activeReply}>
                            <BsReply className={`${style.icon}`} />
                            <span>Reply</span>
                        </li>
                        <li className={`${style.item}`}>
                            <FiEdit2 className={`${style.icon}`} />
                            <span>Edit</span>
                        </li>
                        <li className={`${style.item}`}>
                            <FiCopy className={`${style.icon}`} />
                            <span>Copy Text</span>
                        </li>
                        {/* <li className={`${style.item}`}>
                            <BsLink45Deg className={`${style.icon}`} />
                            <span>Copy Message Link</span>
                        </li> */}
                        <>
                            {
                                msg.pinStat.pinned
                                    ? <li className={`${style.item}`} onClick={pinMessage}>
                                        <PiPushPinSlashLight className={`${style.icon}`} />
                                        <span>UnPin</span>
                                    </li>
                                    : <li className={`${style.item}`} onClick={() => showConfirmModal('Pin')}>
                                        <PiPushPinLight className={`${style.icon}`} />
                                        <span>Pin</span>
                                    </li>
                            }
                        </>
                        {
                            !msg.forwarded.isForwarded &&
                            <li className={`${style.item}`} onClick={forwardMessage}>
                                <BsReply className={`${style.rotateZ} ${style.icon}`} />
                                <span>Forward</span>
                            </li>
                        }
                        <li className={`${style.item}`} onClick={activeSelection}>
                            <PiSelection className={`${style.icon} `} />
                            <span>Select</span>
                        </li>
                        {
                            chat.chatType === ChatType.group &&
                            <li className={`${style.item} ${style.extend}`}>
                                <GoPeople className={`${style.icon}`} />
                                <span>2 Seen</span>
                                <div className={`${style.extend_box} extend-box`}>
                                    <span className={`${style.extend_icon}`}> {'>'} </span>
                                    <div ref={hiddenScroll} className={`${style.hidden_scroll} hidden-scroll`}>
                                        <ul className={`${style.extend_menu}`}>
                                            <li className={`${style.item}`}>
                                                <Image width={500} height={0} src="/images/assetse-rightClick/profile1.jpg" alt="" />
                                                <span>fatemeh veysi</span>
                                            </li>
                                            <li className={`${style.item}`}>
                                                <Image width={500} height={0} src="/images/assetse-rightClick/profile2.jpg" alt="" />
                                                <span>kosar hosseini</span>
                                            </li>
                                            <li className={`${style.item}`}>
                                                <Image width={500} height={0} src="/images/assetse-rightClick/profile1.jpg" alt="" />
                                                <span>fatemeh veysi</span>
                                            </li>
                                            <li className={`${style.item}`}>
                                                <Image width={500} height={0} src="/images/assetse-rightClick/profile2.jpg" alt="" />
                                                <span>kosar hosseini</span>
                                            </li>
                                            <li className={`${style.item}`}>
                                                <Image width={500} height={0} src="/images/assetse-rightClick/profile1.jpg" alt="" />
                                                <span>fatemeh veysi</span>
                                            </li>
                                            <li className={`${style.item}`}>
                                                <Image width={500} height={0} src="/images/assetse-rightClick/profile2.jpg" alt="" />
                                                <span>kosar hosseini</span>
                                            </li>
                                            <li className={`${style.item}`}>
                                                <Image width={500} height={0} src="/images/assetse-rightClick/profile1.jpg" alt="" />
                                                <span>fatemeh veysi</span>
                                            </li>
                                            <li className={`${style.item}`}>
                                                <Image width={500} height={0} src="/images/assetse-rightClick/profile2.jpg" alt="" />
                                                <span>kosar hosseini</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        }
                        <li className={`${style.item}`} onClick={() => showConfirmModal('Delete')}>
                            <BsTrash3 className={`${style.icon}`} />
                            <span>Delete</span>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default RightClick;