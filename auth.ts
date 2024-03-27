import {db} from '@/lib/db';
import {PrismaAdapter} from '@auth/prisma-adapter';
import {UserRole} from '@prisma/client';
import NextAuth from 'next-auth';
import authConfig from './auth.config';
import {getUserById} from './data/user';

export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut,
} = NextAuth({
    events: {
        async linkAccount({user}) {
            await db.user.update({
                where: {id: user.id},
                data: {
                    emailVerified: new Date(),
                },
            });
        },
    },
    callbacks: {
        async signIn({user, account}) {
            if (account?.provider !== 'credentials') return true;

            if (!user.id) return false;
            const existingUser = await getUserById(user.id);

            if (!existingUser || !existingUser.emailVerified) {
                return false;
            }

            return true;
        },
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
