// import { handlers } from "@/auth";
// export const { GET, POST } = handlers;
import { execQuery } from '../../commonApi';
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      id: "Credentials",
      name: "Credentials",
      credentials: {
        id: '',
        password: '',
      },
      async authorize(credentials) {
        try {
          if (credentials.id && credentials.password) {
            const sql = 'SELECT * FROM user WHERE user_id = "' + credentials.id + '" AND user_password = "' + credentials.password + '" LIMIT 1';
            const loginRes = await execQuery(sql);

            if (!credentials.id || !credentials.password) {
              throw new Error('아이디와 비밀번호를 입력해주세요.');
            } else if (loginRes.length === 0) {
              throw new Error('일치하는 아이디 또는 비밀번호가 없습니다.');
            } else {
              const user = { user_seq: loginRes[0].user_seq, id: loginRes[0].user_id, name: loginRes[0].user_name, isAdmin: loginRes[0].user_access_control ? true : false };
              await execQuery(`UPDATE user SET last_login_date = NOW() WHERE user_seq = ${user.user_seq}`);
              return user;
            }
          }
          return null;
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],

  session: {
    jwt: true,
    maxAge: 1 * 24 * 60 * 60, // 1 days
  },
  callbacks: {
    // authorized({ auth, request: { nextUrl } }) {

    //   const isLoggedIn = !!auth?.user.name;
    //   const isOnProtected = !(nextUrl.pathname.startsWith('/login'));

    //   if(nextUrl.pathname === '/') { return NextResponse.redirect(new URL('/dashboard', nextUrl));} 
    //   if (isOnProtected) {
    //     if (isLoggedIn) return true;
    //     return false;
    //   } else if (isLoggedIn) {
    //     return NextResponse.redirect(new URL('/dashboard', nextUrl));
    //   }
    //   return true;
    // },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
    async jwt({ token, user }) {
      if (user) token = user;
      return token;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handlers = NextAuth(authOptions);

export { handlers as GET, handlers as POST };