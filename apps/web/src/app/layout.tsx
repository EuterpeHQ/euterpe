import type { Metadata } from "next";
import { Urbanist, Azeret_Mono, Federant } from "next/font/google";
import localFont from "next/font/local";
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

const aeonik = localFont({
  src: [
    {
      path: "../assets/fonts/Aeonik-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/Aeonik-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Aeonik-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/Aeonik-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-aeonik",
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
          aeonik.variable,
        )}
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
