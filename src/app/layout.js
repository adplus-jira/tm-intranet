import { Inter } from "next/font/google";
import "./globals.css";
import AuthWrapper from "./auth_wrapper";
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AD PLUS",
  description: "management Ad plus system",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="ko_KR">
      <body className={inter.className}>
        <AuthWrapper>
          <Header />
          {children}
        </AuthWrapper>
      </body>
    </html>
  );
}
