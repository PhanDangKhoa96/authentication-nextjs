import {v4 as uuidv4} from 'uuid';
import {getVerificationByEmail} from '../../../data/verification-token';
import {db} from '../db';
import {getResetTokenByEmail} from '../../../data/reset-token';

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getVerificationByEmail(email);

    if (existingToken) {
        await db.verificationToken.delete({
            where: {
                id: existingToken.id,
            },
        });
    }

    const verificatonToken = await db.verificationToken.create({
        data: {
            email,
            expires,
            token,
        },
    });
    return verificatonToken;
};

export const generateResetToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getResetTokenByEmail(email);

    if (existingToken) {
        await db.resetToken.delete({
            where: {
                id: existingToken.id,
            },
        });
    }

    const resetToken = await db.resetToken.create({
        data: {
            email,
            expires,
            token,
        },
    });
    return resetToken;
};
