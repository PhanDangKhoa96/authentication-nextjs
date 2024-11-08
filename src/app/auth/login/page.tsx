import FormStatus from '@/components/auth/FormStatus';
import LoginForm from '@/components/auth/LoginForm';
import Link from 'next/link';
import React from 'react';

const LoginPage = () => {
    return (
        <div className="grid place-items-center min-h-screen py-12 sm:px-6 lg:px-8 bg-black/10">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;
