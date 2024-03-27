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
            <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?{' '}
                <Link
                    href="/auth/register"
                    className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Register now!
                </Link>
            </p>
        </div>
    );
};

export default LoginPage;
