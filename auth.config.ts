import CredentialsProvider from 'next-auth/providers/credentials';

import type {NextAuthConfig} from 'next-auth';
import {loginSchema} from '@/schemas';
import {getUserByEmail} from './data/user';
import bcrypt from 'bcryptjs';

export default {
    pages: {
        signIn: '/login',
        error: '/login',
    },
    providers: [
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
