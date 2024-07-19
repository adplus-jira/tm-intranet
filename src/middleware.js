import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export const middleware = async (req) => {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
        raw: true,
    });
    const { pathname } = req.nextUrl;
    
    if(!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if(pathname === '/login') {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    if(pathname === '/') return NextResponse.redirect(new URL('/dashboard', req.url));
};

export const config = {
    matcher: ['/dashboard', '/user', '/target', '/call', '/talk', '/record', '/'],
};