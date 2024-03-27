import CredentialsProvider from 'next-auth/providers/credentials';
import type {NextAuthConfig} from 'next-auth';
import {loginSchema} from '@/schemas';
import {getUserByEmail} from './data/user';
import bcrypt from 'bcryptjs';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export default {
    pages: {
        signIn: '/auth/login',
        error: '/auth/error',
    },
    providers: [
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            async authorize(credentials) {
                const validatedFields = loginSchema.safeParse(credentials);

                if (!validatedFields.success) return null;

                const {email, password} = validatedFields.data;

                const user = await getUserByEmail(email);

                if (!user || !user.password) return null;

                const isPasswordValid = await bcrypt.compare(
                    password,
                    user.password
                );

                if (isPasswordValid) return user;

                return null;
            },
        }),
    ],
} satisfies NextAuthConfig;
