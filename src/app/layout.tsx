import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BodyLayout from "@/components/mainBodyLayout/BodyLayout";
import { UserProvider } from "../context/UserContext";
import HeaderAndFooter from "@/components/navigationComponents/NavigationBody";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "At what cost?",
  description: "Track your finances with ease | Developed by Matthew Nicholson",
  icons: "/images/logo-small.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BodyLayout>
          <UserProvider>
            <HeaderAndFooter>
              <div className="w-full bg-beigeLight based:overflow-hidden">
                {children}
              </div>
            </HeaderAndFooter>
          </UserProvider>
        </BodyLayout>
      </body>
    </html>
  );
}
