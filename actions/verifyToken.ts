'use server';

import {db} from '@/lib/db';
import {getUserByEmail} from '../data/user';
import {getVerificationByToken} from '../data/verification-token';

export const verifyToken = async (token?: string | null) => {
    if (!token) return {error: 'No token to verify!'};

    const verificationToken = await getVerificationByToken(token);

    if (!verificationToken) {
        return {error: 'Invalid Token!'};
    }

    if (verificationToken.expires < new Date()) {
        return {error: 'Token expired!'};
    }

    const existingUser = await getUserByEmail(verificationToken.email);

    if (!existingUser) return {error: 'User not found!'};

    await db.user.update({
        where: {id: existingUser.id},
        data: {
            // emailVerified: new Date(),
            // To update email because in the case that user updates email in the setting page -> this will send the verification token with the CHANGED email -> so the email in database is not changed yet -> will need to update this email as well
            email: verificationToken.email,
        },
    });

    // await db.verificationToken.delete({
    //     where: {id: verificationToken.id},
    // });

    return {success: 'Successfully verified!'};
};
