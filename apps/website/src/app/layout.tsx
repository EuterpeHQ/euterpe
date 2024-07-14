import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Spacer from "@/components/ui/spacer";
import AnnouncementBar from "@/components/AnnouncementBar";
import { AppProvider } from "@/providers/app";
import Nav from "@/partials/landing/Nav";
import Footer from "@/partials/Footer";
import Harmonies from "@/partials/landing/Harmonies";
import Hero from "@/partials/landing/Hero";
import PlumesAI from "@/partials/landing/PlumesAI";
import Revolutionary from "@/partials/landing/Reveloutionary";
import TopMusicians from "@/partials/landing/TopMusicians";
// import Hero from "@/partials/landing/Hero";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <AppProvider>
          <AnnouncementBar>
            <div>
              <p className="text-sm">
                Euterpe's Pre-Alpha Release is Coming in August! &nbsp;🚀
              </p>
            </div>
          </AnnouncementBar>
          <Nav/>
          <Spacer size={80} />
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
          <Revolutionary/>
          <Footer/>
          </main>
      
        </AppProvider>
      </body>
    </html>
  );
}
