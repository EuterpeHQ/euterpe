import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Azeret_Mono } from "next/font/google";
import { AppProvider } from "@/providers/app";
import Navbar from "@/partials/Navbar";
import { cn } from "@/lib/utils";

const azeret = Azeret_Mono({ subsets: ["latin"], variable: "--font-azeret" });
const axiforma = localFont({
  src: "../assets/fonts/Axiforma-Medium.woff2",
  display: "swap",
  variable: "--font-axiforma",
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
    <html lang="en">
      <body
        className={cn(
          azeret.className,
          azeret.variable,
          axiforma.variable,
          aeonik.variable,
        )}
      >
        <AppProvider>
          <Navbar />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
