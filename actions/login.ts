'use server';

import {loginSchema} from '@/schemas';
import {LoginValueType} from '@/types/login';
import {AuthError} from 'next-auth';
import {signIn} from '../auth';
import {DEFAULT_DIRECT_LOGIN} from '../routes';

export const login = async (values: LoginValueType) => {
    const validatedFields = loginSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: 'Fail to submit!'};
    }

    const {email, password} = validatedFields.data;

    const someThingElseHappen = false;

    if (someThingElseHappen) {
        return {success: 'Eyo something else happen here'};
    }

    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: DEFAULT_DIRECT_LOGIN,
        });
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
