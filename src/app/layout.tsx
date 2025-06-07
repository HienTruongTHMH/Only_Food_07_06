import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { RecentViewsProvider } from "@/contexts/RecentViewsContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Only Foodies",
  description: "A food blog for food lovers",
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
        cz-shortcut-listen="true"
      >
        <AuthProvider>
          <RecentViewsProvider>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <Navbar />
            </div>
            {children}
            <Footer />
          </RecentViewsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}