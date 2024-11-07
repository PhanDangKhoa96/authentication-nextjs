'use server';

import {db} from '@/lib/db';
import {sendEmailReset} from '@/lib/auth/email';
import {generateResetToken} from '@/lib/auth/token';
import {forgotSchema} from '@/schemas';
import {ForgotValueType} from '@/types/login';

export const forgotPasswordAction = async (values: ForgotValueType) => {
    const validatedFields = forgotSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: 'Invalid field'};
    }

    const {email} = validatedFields.data;

    const existingUser = db.user.findFirst({where: {email}});
    if (!existingUser) {
        return {error: 'Email not found'};
    }

    const resetToken = await generateResetToken(email);

    await sendEmailReset(resetToken.email, resetToken.token);

    return {success: 'Email sent!'};
};
