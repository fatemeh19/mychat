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
import { groupMemberInterface, recievedMessageInterface } from '@/src/models/interface';
import { useAppSelector } from '@/src/redux/hooks';
import { ChatType } from '@/src/models/enum';

interface MemberRightClickProps {
    x: number,
    y: number,
    member: groupMemberInterface,
    closeContextMenu: () => void,
    showConfirmModal: (type: string) => void,
}

const MemberRightClick: FC<MemberRightClickProps> = ({
    x,
    y,
    closeContextMenu,
    member,
    showConfirmModal
}) => {

    const chat = useAppSelector(state => state.chat).Chat

    const contextMenuRef = useRef<HTMLDivElement>(null)

    // click out of contextMenu : close contextMenu
    useOnClickOutside(contextMenuRef, closeContextMenu)
    console.log('in')
    console.log(x, y)

    // set the contextMenu cordinate 
    // useEffect(() => {
    //     let
    //         winWidth = window.innerWidth,
    //         winHeight = window.innerHeight,
    //         // @ts-ignore
    //         cmWidth = contextMenuRef.current.offsetWidth,
    //         // @ts-ignore
    //         cmHeight = contextMenuRef.current.offsetHeight

    //     const distWidth = winWidth - cmWidth
    //     const distHeight = winHeight - cmHeight


    //     // contextMenu position : 
    //     // @ts-ignore
    //     if (x > distWidth) {
    //         // @ts-ignore
    //         contextMenuRef.current.style.left = `${distWidth - 10}px`
    //     }

    //     if (y > distHeight) {
    //         // @ts-ignore
    //         contextMenuRef.current.style.top = `${distHeight - 90}px`
    //     }

    // }, [x, y])

    return (
        <>
            <div
                className={`absolute z-20 ${style.wrapper} ${style.p} ${style.li}`}
                style={{ top: `${0}px`, right: `${0}px` }}
                ref={contextMenuRef}
            >
                <div className={`${style.content}`}>
                    <ul className={`${style.menu}`}>
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

export default MemberRightClick;