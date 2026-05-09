import { Toast } from "@/src/components/Core/Toast";
import { SearchModal } from "@/src/components/TTRPG/SearchModal";
import { LoginModal } from "@/src/components/User/LoginModal";
import { UserButton } from "@/src/components/User/UserButton";
import { ToastProvider } from "@/src/store/toast";
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
      <ToastProvider>
        <UserProvider>
          <body className={opensans.className}>
            <header className={"mainHeader"}>
              <SearchModal />
              <h1>
                <Link href="/">
                  10<br></br>d2
                </Link>
              </h1>
              <UserButton />
            </header>
            {children}
            <LoginModal />
            <Toast />
          </body>
        </UserProvider>
      </ToastProvider>
    </html>
  );
}
