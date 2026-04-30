import { UserButton } from "@/src/components/UserButton";
import { UserProvider } from "@/src/store/user";
import type { Metadata } from "next";
import { Open_Sans } from 'next/font/google';
import Link from "next/link";
import "./globals.css";

const opensans = Open_Sans({
  subsets: ['latin'],
})


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
    <html
      lang="en"
    >
      <UserProvider>
        <body className={opensans.className} >
          <header>
            <h1>
              <Link href="/">10d2</Link>
            </h1>
            <UserButton />
          </header>
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
