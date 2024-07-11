import { NextResponse } from "next/server";

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user.name;
      const isOnProtected = !(nextUrl.pathname.startsWith('/login'));

      if(nextUrl.pathname === '/') { return NextResponse.redirect(new URL('/dashboard', nextUrl));} 
      if (isOnProtected) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return NextResponse.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [],
}