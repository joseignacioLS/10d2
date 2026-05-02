import { LoginModal } from "@/src/components/LoginModal";
import { UserButton } from "@/src/components/UserButton";
import { UserProvider } from "@/src/store/user";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const opensans = Open_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "10d2",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={opensans.className}>
          <header className={"mainHeader"}>
            <h1>
              <Link href="/">10d2</Link>
            </h1>
            <div className="loginButtonWrapper">
              <UserButton />
            </div>
          </header>
          {children}
          <LoginModal />
        </body>
      </UserProvider>
    </html>
  );
}
