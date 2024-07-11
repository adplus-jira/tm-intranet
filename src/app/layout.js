import { Inter } from "next/font/google";
import "./globals.css";
import AuthWrapper from "./auth_wrapper";
import Header from "./components/Header";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AD PLUS",
  description: "management Ad plus system",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <html lang="ko_KR">
      <body className={inter.className}>
        <AuthWrapper>
          {session && <Header session={session} /> }
          {children}
        </AuthWrapper>
      </body>
    </html>
  );
}
