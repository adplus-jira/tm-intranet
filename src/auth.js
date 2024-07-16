import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";

// export const { signIn, signOut, handlers, auth, session } = NextAuth({
//   ...authConfig,
//   providers: [
//     Credentials({
//       credentials: {
//         user_seq: '',
//         id: '',
//         name: '',
//         isAdmin: false
//       },
//       authorize: async (credentials) => {
//         if(credentials.id && credentials.name) {
//           return { user_seq: credentials.user_seq, id: credentials.id, name: credentials.name, isAdmin: credentials.isAdmin };
//         }
//         return null;
//       },
//     })
//   ],
//   session: {
//     jwt: true,
//     maxAge: 1 * 24 * 60 * 60, // 1 days
//   },
//   callbacks: {
//     async session({ session, token, user }) {
//       session.user = token.user;
//       return session;
//     },
//     async jwt({ token, user, trigger, session }) {
//       if (user) {
//         token.user = user;
//       }
//       if( trigger === "update" && session ) {
//         token = { ...token, user: session }
//         return token;
//       }
//       return token;
//     }
//   },
// });