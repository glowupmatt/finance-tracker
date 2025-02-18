import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BodyLayout from "@/components/mainBodyLayout/BodyLayout";
import { UserProvider } from "../context/UserContext";
import HeaderAndFooter from "@/components/navigationComponents/NavigationBody";
import { PotsProvider } from "@/context/PotsContext";
import { TransactionsProvider } from "@/context/TransactionsContext";
import { BudgetsProvider } from "@/context/BudgetContext";
import { RecurringPaymentsProvider } from "@/context/RecurringPaymentsContext";

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
              <PotsProvider>
                <BudgetsProvider>
                  <RecurringPaymentsProvider>
                    <TransactionsProvider>
                      <div className="w-full bg-beigeLight based:overflow-hidden">
                        {children}
                      </div>
                    </TransactionsProvider>
                  </RecurringPaymentsProvider>
                </BudgetsProvider>
              </PotsProvider>
            </HeaderAndFooter>
          </UserProvider>
        </BodyLayout>
      </body>
    </html>
  );
}
