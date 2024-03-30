import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import LoginForm from '@/components/auth/LoginForm';
import React from 'react';

const ForgotPasswordPage = () => {
    return (
        <div className="grid place-items-center min-h-screen py-12 sm:px-6 lg:px-8 bg-black/10">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <ForgotPasswordForm />
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
