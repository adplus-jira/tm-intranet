import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { execQuery } from "./app/api/commonApi";

export const { signIn, signOut, handlers, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        id: {},
        name: {},
        isAdmin: false
      },
      authorize: async (credentials) => {
        if (credentials.id && credentials.password) {
          try {
            const loginRes = await execQuery(`SELECT * FROM user WHERE user_id = '${credentials.id}' AND user_password = '${credentials.password}' LIMIT 1`);
            if (loginRes.length === 0) {
              throw new Error(JSON.stringify({ message: 'Invalid credentials', error: true }));
            } else {
              console.log(loginRes[0].user_id)
              const user = { id: loginRes[0].user_id, name: loginRes[0].user_name, isAdmin: loginRes[0].user_access_control ? true : false };
              
              return user;
            }
          } catch (error) {
            console.error('getUserData error', error);
            return NextResponse.error(error);
          }
        }
        return null;
      },
    })
  ],
  session: {
    jwt: true,
    maxAge: 1 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async session({ session, token, user }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = user;
      }
      return token;
    }
  }
});