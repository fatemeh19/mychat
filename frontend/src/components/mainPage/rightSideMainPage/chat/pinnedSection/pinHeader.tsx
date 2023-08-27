import { setOpenPinSection } from '@/src/redux/features/openSlice';
import { useAppDispatch } from '@/src/redux/hooks';
import { FC } from 'react'
import { BsArrowLeft } from 'react-icons/bs';

interface PinHeaderProps {

}

const PinHeader: FC<PinHeaderProps> = () => {

    const dispatch = useAppDispatch()

    return (
        <div className="h-[126px] w-full flex items-center gap-3 px-6 bg-white cursor-pointer dark:bg-bgColorDark2">
            <BsArrowLeft className='text-blue-500 font-bold cursor-pointer w-6 h-6 hover:text-blue-800' onClick={() => dispatch(setOpenPinSection(false))} />
            <h1 className='text-blue-500 font-bold cursor-default'>pinned section</h1>
        </div>
    );
}

export default PinHeader;