import RegisterForm from '@/components/auth/RegisterForm';
import Link from 'next/link';

const RegisterPage = () => {
    return (
        <div className="grid place-items-center min-h-screen py-12 sm:px-6 lg:px-8 bg-black/10">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <RegisterForm />
            </div>

            <p className="mt-10 text-center text-sm text-gray-500">
                Have an account?{' '}
                <Link
                    href="/auth/login"
                    className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Login now
                </Link>
            </p>
        </div>
    );
};

export default RegisterPage;
