import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import React from 'react';

const ResetPasswordPage = () => {
    return (
        <div className="grid place-items-center min-h-screen py-12 sm:px-6 lg:px-8 bg-black/10">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <ResetPasswordForm />
            </div>
        </div>
    );
};

export default ResetPasswordPage;
