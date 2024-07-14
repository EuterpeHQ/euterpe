import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Spacer from "@/components/ui/spacer";
import AnnouncementBar from "@/components/AnnouncementBar";
import { AppProvider } from "@/providers/app";
import Nav from "@/partials/landing/Nav";

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
          {children}
          {/* <Spacer size={100} /> */}
          {/* <Footer /> */}
        </AppProvider>
      </body>
    </html>
  );
}
