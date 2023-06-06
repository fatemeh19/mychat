"use client"

import { AiOutlinePicture } from 'react-icons/ai'
import { HiOutlineVideoCamera } from 'react-icons/hi'
import { CgFile } from 'react-icons/cg'
import { FiHeadphones } from 'react-icons/fi'
import { RiAttachmentLine } from 'react-icons/ri'
import { FiMic } from 'react-icons/fi'

export default function InfoFiles() {

    return (
        <div className="w-full flex flex-col gap-5 items-start p-5 bg-white
                shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)]">
            <div className='flex gap-7'>
                <AiOutlinePicture className='text-2xl' />
                <p className='text-sm'>
                    <span>2 </span>
                    <span>photos</span>
                </p>
            </div>
            <div className='flex gap-7'>
                <HiOutlineVideoCamera className='text-2xl' />
                <p className='text-sm'>
                    <span>3 </span>
                    <span>videos</span>
                </p>
            </div>
            <div className='flex gap-7'>
                <CgFile className='text-2xl' />
                <p className='text-sm'>
                    <span>8 </span>
                    <span>files</span>
                </p>
            </div>
            <div className='flex gap-7'>
                <FiHeadphones className='text-2xl' />
                <p className='text-sm'>
                    <span>1 </span>
                    <span>audio file</span>
                </p>
            </div>
            <div className='flex gap-7'>
                <RiAttachmentLine className='rotate-90 text-2xl' />
                <p className='text-sm'>
                    <span>12 </span>
                    <span>shared links</span>
                </p>
            </div>
            <div className='flex gap-7'>
                <FiMic className='text-2xl' />
                <p className='text-sm'>
                    <span>7 </span>
                    <span>voice messages</span>
                </p>
            </div>
        </div>
    )
}
