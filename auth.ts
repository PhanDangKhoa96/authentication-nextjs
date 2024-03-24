import {db} from '@/lib/db';
import {PrismaAdapter} from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import authConfig from './auth.config';

export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut,
} = NextAuth({
    adapter: PrismaAdapter(db),
    session: {strategy: 'jwt'},
    ...authConfig,
});
