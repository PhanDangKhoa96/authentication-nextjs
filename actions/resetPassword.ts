'use server';

import { db } from '@/lib/db';
import { compare, hash } from 'bcryptjs';
import { getResetTokenByToken } from '../data/reset-token';
import { getUserByEmail } from '../data/user';

export const resetPassword = async (token: string, password: string) => {
    const resetToken = await getResetTokenByToken(token);

    if (!resetToken) {
        return {error: 'Invalid token!'};
    }

    if (resetToken.expires < new Date()) {
        return {error: 'Token expired!'};
    }

    const existingUser = await getUserByEmail(resetToken.email);

    if (!existingUser || !existingUser.password) {
        return {error: 'User not found!'};
    }

    const oldPassword = existingUser.password;

    const isSameAsOldPassword = await compare(password, oldPassword);

    if (isSameAsOldPassword) {
        return {error: 'New password cannot be the same as the old password!'};
    }
    const newPassword = await hash(password, 10);

    await db.resetToken.delete({
        where: {id: resetToken.id},
    });

    await db.user.update({
        where: {
            id: existingUser.id,
        },
        data: {
            password: newPassword,
        },
    });

    return {success: 'Succesfully reset password!'};
};
