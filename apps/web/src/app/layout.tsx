import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Federant } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/providers/app";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });
const federant = Federant({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-federant",
});

export const metadata: Metadata = {
  title: "Euterpe",
  description: "Earn with the Artists you love.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, federant.variable)}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
