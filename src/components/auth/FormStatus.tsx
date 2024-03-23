import React from 'react';
import {Alert, AlertDescription, AlertTitle} from '../ui/alert';
import {ExclamationTriangleIcon, CheckCircledIcon} from '@radix-ui/react-icons';
import {cn} from '@/lib/utils';

const FormStatus = ({
    message,
    isError,
}: {
    message?: string;
    isError: boolean;
}) => {
    console.log('message', message);
    if (!message) return null;
    return (
        <Alert className={cn(isError ? 'text-red-500' : 'text-green-500')}>
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    );
};

export default FormStatus;
