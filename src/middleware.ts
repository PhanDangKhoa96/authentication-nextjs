import NextAuth from 'next-auth';
import authConfig from '../auth.config';
import {
    apiAuthPrefix,
    authRoutes,
    DEFAULT_DIRECT_LOGIN,
    DEFAULT_DIRECT_NOT_LOGIN,
    publicRoutes,
} from '../routes';
const {auth} = NextAuth(authConfig);

export default auth((req) => {
    const {nextUrl} = req;

    const isLogin = !!req.auth;
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return;
    }

    if (isAuthRoute) {
        if (isLogin) {
            return Response.redirect(new URL(DEFAULT_DIRECT_LOGIN, nextUrl));
        }
        return;
    }

    if (!isPublicRoute && !isLogin) {
        return Response.redirect(new URL(DEFAULT_DIRECT_NOT_LOGIN, nextUrl));
    }

    return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
