import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Digital Innovation, Civic Technology & Entrepreneurship`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Startup Jigawa",
    "Digital Innovation Center",
    "Civic Technology Nigeria",
    "Dutse Jigawa State",
    "Northern Nigeria Tech Hub",
    "3MTT Jigawa",
    "Digital Skills Academy",
    "AgriTech Jigawa",
    "Open Government Partnership Jigawa",
  ],
  authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
  creator: siteConfig.legalName,
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: siteConfig.url,
    title: `${siteConfig.name} | Digital Innovation, Civic Technology & Entrepreneurship`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Digital Innovation & Civic Technology`,
    description: siteConfig.description,
    creator: "@startupjigawa",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} font-sans h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-slate-800">
        {children}
      </body>
    </html>
  );
}
