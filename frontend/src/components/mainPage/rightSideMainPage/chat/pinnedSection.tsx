import { setOpenPinSection } from '@/src/redux/features/openSlice';
import { useAppDispatch } from '@/src/redux/hooks';
import { FC } from 'react'

import { BsArrowLeft } from 'react-icons/bs'
interface PinSectionProps {

}

const PinnedSection: FC<PinSectionProps> = () => {
    const dispatch = useAppDispatch()

    return (
        <div>
            <div className="h-[74px] w-full mx-auto bg-white cursor-pointer dark:bg-bgColorDark2">
                <BsArrowLeft className='text-blue-500 font-bold cursor-pointer' onClick={() => dispatch(setOpenPinSection(false))} />
                pinned section

            </div>
        </div>
    );
}

export default PinnedSection;