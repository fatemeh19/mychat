"use client"

import { FC, useRef } from 'react'

import { BsTrash3 } from 'react-icons/bs'
import style from './style.module.css'
import { useOnClickOutside } from './useOnClickOutside';

interface MemberRightClickProps {
    closeContextMenu: () => void,
    showConfirmModal: (type: string) => void,
}

const MemberRightClick: FC<MemberRightClickProps> = ({
    closeContextMenu,
    showConfirmModal
}) => {

    const contextMenuRef = useRef<HTMLDivElement>(null)

    // click out of contextMenu : close contextMenu
    useOnClickOutside(contextMenuRef, closeContextMenu)

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