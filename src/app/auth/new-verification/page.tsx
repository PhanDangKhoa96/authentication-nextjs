import VerificationForm from '@/components/auth/VerificationForm';
import {useSearchParams} from 'next/navigation';
import React, {useCallback, useEffect} from 'react';
import {verifyToken} from '../../../../actions/verifyToken';

const NewVerificationPage = () => {
    return <VerificationForm />;
};

export default NewVerificationPage;
