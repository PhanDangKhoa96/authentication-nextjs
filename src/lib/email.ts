import {VerificationEmail} from '@/components/auth/VerificationEmail';
import {Resend} from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
export const sendEmailVerification = async (email: string, token: string) => {
    const redirectLink = `http://localhost:3000/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: [email],
        subject: 'Confirm email',
        react: VerificationEmail({firstName: 'John', redirectLink}),
    });
};
