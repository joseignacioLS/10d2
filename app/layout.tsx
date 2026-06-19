import { Alert } from "@/src/components/Core/Alert";
import { Toast } from "@/src/components/Core/Toast";
import { SearchModal } from "@/src/components/TTRPG/SearchModal";
import { LoginModal } from "@/src/components/User/LoginModal";
import { UserButton } from "@/src/components/User/UserButton";
import { AlertProvider } from "@/src/store/alert";
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
        <AlertProvider>
          <UserProvider>
            <body className={opensans.className}>
              <header className={"mainHeader"}>
                <SearchModal />
                <h1>
                  <Link href="/">
                    <img src="/10d2.svg" alt="logo de 10d2" />
                  </Link>
                </h1>
                <UserButton />
              </header>
              {children}
              <LoginModal />
              <Toast />
              <Alert />
            </body>
          </UserProvider>
        </AlertProvider>
      </ToastProvider>
    </html>
  );
}
