'use client';

import {useSearchParams} from 'next/navigation';
import React, {useCallback, useEffect} from 'react';
import {verifyToken} from '../../../actions/verifyToken';

const VerificationForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const onSubmit = useCallback(async () => {
        const submitResult = await verifyToken(token);

        console.log('submitResult', submitResult);
    }, [token]);

    useEffect(() => {
        onSubmit();
    }, []);

    return (
        <div>
            <h1>Verification</h1>
        </div>
    );
};

export default VerificationForm;
