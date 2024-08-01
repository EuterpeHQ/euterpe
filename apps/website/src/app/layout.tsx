import type { Metadata } from "next";
import localFont from "next/font/local";
import { Azeret_Mono } from "next/font/google";
import "./globals.css";
import Spacer from "@/components/ui/spacer";
import { AppProvider } from "@/providers/app";
import Navbar from "@/partials/landing/Navbar";
import Footer from "@/partials/Footer";
import Harmonies from "@/partials/landing/Harmonies";
import Hero from "@/partials/landing/Hero";
import PlumesAI from "@/partials/landing/PlumesAI";
import Revolutionary from "@/partials/landing/Reveloutionary";
import TopMusicians from "@/partials/landing/TopMusicians";
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
          {/* {children} */}
          <main className="bg-black">
            <Hero />
            <Spacer size={100} />
            <TopMusicians />
            <Spacer size={100} />
            <Harmonies />
            <Spacer size={100} />
            {/* <HowItWorks /> */}
            <Spacer size={100} />
            <PlumesAI />
            <Revolutionary />
            <Footer />
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
