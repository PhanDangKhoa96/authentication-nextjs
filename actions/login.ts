'use server';

import {sendEmailVerification} from '@/lib/auth/email';
import {loginSchema} from '@/schemas';
import {LoginValueType} from '@/types/login';
import {AuthError} from 'next-auth';
import {signIn} from '../auth';
import {getUserByEmail} from '../data/user';
import {DEFAULT_DIRECT_LOGIN} from '../routes';

type LoginResponse = {
    error?: string;
    success?: string;
}

export const login = async (values: LoginValueType): Promise<LoginResponse> => {
    const validatedFields = loginSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: 'Fail to submit!'};
    }

    const {email, password} = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return {error: 'Wrong login information!'};
    }

    // if (!existingUser.emailVerified) {
    //     const verificationToken = await generateVerificationToken(email);

    //     await sendEmailVerification(
    //         verificationToken.email,
    //         verificationToken.token
    //     );

    //     return {success: 'Confirmation email resent!'};
    // }

    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: DEFAULT_DIRECT_LOGIN,
        });
        return { success: 'Logged in successfully!' };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {error: 'Credential is not valid!'};

                default:
                    return {error: 'Something went wrong!'};
            }
        }

        throw error;
    }
};
