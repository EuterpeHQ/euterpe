import type { Metadata } from "next";
import { Urbanist, Azeret_Mono, Federant } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/providers/app";
import { cn } from "@/lib/utils";

const urbanist = Urbanist({ subsets: ["latin"], variable: "--font-urbanist" });
const azeret = Azeret_Mono({ subsets: ["latin"], variable: "--font-azeret" });
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
      <body
        className={cn(
          urbanist.className,
          urbanist.variable,
          azeret.variable,
          federant.variable,
        )}
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
