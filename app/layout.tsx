import { UserButton } from "@/src/components/UserButton";
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

import { Open_Sans } from 'next/font/google'

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
      <body className={opensans.className} >
        <header>
          <h1>
            <Link href="/">10d2</Link>
          </h1>
          <UserButton />
        </header>
        {children}
      </body>
    </html>
  );
}
