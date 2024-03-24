'use server';

import { registerSchema } from '@/schemas';
import { RegisterValueType } from '@/types/login';
import { createNewUser, getUserByEmail } from '../data/user';

export const register = async (values: RegisterValueType) => {
    const validatedFields = registerSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: 'Invalid fields!'};
    }

    const {email, name, password} = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return {error: 'Email already exists!'};
    }

    createNewUser(email, name, password);

    return {success: 'User successfully created!'};
};
