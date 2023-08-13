"use client"

import { FC } from 'react'
import Link from 'next/link'
import { BiInfoCircle } from 'react-icons/bi'
import { BiBell } from 'react-icons/bi'
import { useAppSelector } from '@/src/redux/hooks'
import { ChatType } from '@/src/models/enum'
interface InfoSettingProps {
    chatType: ChatType
}
const InfoSetting: FC<InfoSettingProps> = ({ chatType }) => {

    const contact = useAppSelector(state => state.userContact).Contact

    return (
        <div className="flex flex-col gap-5 items-start p-5 bg-white
                shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)]">
            {chatType === ChatType.private
                ? <div className='flex gap-7'>
                    <BiInfoCircle className='text-3xl items-start w-[-webkit-fill-available]' />
                    <div className='flex flex-col gap-5 mr-6'>
                        {/* hear i got the info from server
                    and by map func do one div for 
                    all of infos and with this trick
                    how much user have info we can show them
                 */}
                        <div>
                            <h2 className='value text-sm'>{contact.phoneNumber ? contact?.phoneNumber : 'Hidden'}</h2>
                            <p className='describe text-sm text-gray-500 font-thin'>Mobile</p>
                        </div>
                        <div>
                            <h2 className='value text-sm breack-all w-fit '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, voluptates! Consequatur, molestias rerum hic veritatis impedit corporis porro aliquid molestiae expedita repellendus adipisci in quaerat vero illo maxime temporibus dolorum.</h2>
                            <p className='describe text-sm text-gray-500 font-thin '>Bio</p>
                        </div>
                        <div>
                            <Link href={''} className='value text-sm text-blue-500'>@username</Link>
                            <p className='describe text-sm text-gray-500 font-thin'>Username</p>
                        </div>

                    </div>
                </div> : null
            }
            <div className='w-full flex gap-7 items-center'>
                <BiBell className='text-3xl ' />
                <div className='flex justify-between w-full'>
                    <p className='value text-sm'>Notifications</p>
                    <input type="checkbox" />
                </div>
            </div>
        </div>
    )
}


export default InfoSetting