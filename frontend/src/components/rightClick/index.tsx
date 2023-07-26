"use client"

import Image from 'next/image';
import { FC, useEffect, useRef, MouseEvent } from 'react'

import { GoPeople } from 'react-icons/go'
import { PiSelection } from 'react-icons/pi'
import { FiEdit2, FiCopy } from 'react-icons/fi'
import { BsReply, BsLink45Deg, BsPinAngle, BsTrash3 } from 'react-icons/bs'

import style from './style.module.css'
import { useOnClickOutside } from './useOnClickOutside';
import { recievedMessageInterface } from '@/src/models/interface';

interface RightClickProps {
    x: number,
    y: number,
    child: Element | undefined,
    msg: recievedMessageInterface,
    closeContextMenu: () => void,
    showConfirmModal: () => void,
    activeSelection: (e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>) => void
}

const RightClick: FC<RightClickProps> = ({ x, y, closeContextMenu, child, msg, showConfirmModal, activeSelection }) => {

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
            cmHeight = contextMenuRef.current.offsetHeight;
        const distWidth = winWidth - cmWidth
        const distHeight = winHeight - cmHeight

        // @ts-ignore
        if (x > distWidth) {
            // @ts-ignore
            contextMenuRef.current.style.left = `${distWidth}px`
            // @ts-ignore
            hiddenScroll.current.style.right = '176px'
        } else {
            // @ts-ignore
            hiddenScroll.current.style.left = ''
            // @ts-ignore
        }

        if (y > distHeight) {
            // @ts-ignore
            contextMenuRef.current.style.top = `${distHeight}px`
        } else {
            // @ts-ignore
            hiddenScroll.current.style.top = ''
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
                        <li className={`${style.item}`}>
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
                        <li className={`${style.item}`}>
                            <BsLink45Deg className={`${style.icon}`} />
                            <span>Copy Message Link</span>
                        </li>
                        <li className={`${style.item}`}>
                            <BsPinAngle className={`${style.icon}`} />
                            <span>Pin</span>
                        </li>
                        <li className={`${style.item}`}>
                            <BsReply className={`${style.rotateZ} ${style.icon}`} />
                            <span>Forward</span>
                        </li>
                        <li className={`${style.item}`} onClick={activeSelection}>
                            <PiSelection className={`${style.icon} `} />
                            <span>Select</span>
                        </li>
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
                                            <Image width={500} height={0} src="/images/assetse-rightClick/profile2.jpg" alt="" />
                                            <span>kosar hosseini</span>
                                        </li>
                                        <li className={`${style.item}`}>
                                            <Image width={500} height={0} src="/images/assetse-rightClick/profile2.jpg" alt="" />
                                            <span>kosar hosseini</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li className={`${style.item}`} onClick={showConfirmModal}>
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