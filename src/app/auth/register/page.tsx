import RegisterForm from '@/components/auth/RegisterForm';
import Link from 'next/link';

const RegisterPage = () => {
    return (
        <div className="grid place-items-center min-h-screen py-12 sm:px-6 lg:px-8 bg-black/10">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <RegisterForm />
            </div>
        </div>
    );
};

export default RegisterPage;
