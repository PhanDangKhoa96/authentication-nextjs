'use server';

import {loginSchema} from '@/schemas';
import {LoginValueType} from '@/types/login';

export const login = async (values: LoginValueType) => {
    const validatedFields = loginSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: 'Fail to submit!'};
    }

    return {success: 'Successfully sent!'};
};
