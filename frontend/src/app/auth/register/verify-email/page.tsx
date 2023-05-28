

import VerifyEmailComponent from '@/src/components/auth/verifyEmailComponent'
import { FC } from 'react'


const VerifyEmail: FC<any> = ({ searchParams }) => {

    return (
        <>
            <VerifyEmailComponent searchParams={searchParams} />
        </>
    )
}

export default VerifyEmail