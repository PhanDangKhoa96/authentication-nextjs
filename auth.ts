import {db} from '@/lib/db';
import {PrismaAdapter} from '@auth/prisma-adapter';
import {UserRole} from '@prisma/client';
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import authConfig from './auth.config';
import {getUserById} from './data/user';

export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut,
} = NextAuth({
    callbacks: {
        async session({session, token}) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }
            if (session.user && token.role) {
                session.user.role = token.role as UserRole;
            }

            return session;
        },

        async jwt({token}) {
            if (!token.sub) return token;

            const user = await getUserById(token.sub);

            if (!user) return token;

            token.role = user.role;

            return token;
        },
    },
    adapter: PrismaAdapter(db),
    session: {strategy: 'jwt'},
    ...authConfig,
});
