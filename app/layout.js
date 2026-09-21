import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://devworld.example.com"),
  title: {
    default: "Dev World — Premium Software Engineering & Digital Products",
    template: "%s | Dev World",
  },
  description:
    "Dev World designs and builds custom web, mobile, cloud, and AI products for ambitious companies — from MVP to enterprise scale.",
  openGraph: {
    type: "website",
    siteName: "Dev World",
    title: "Dev World — Premium Software Engineering & Digital Products",
    description:
      "Custom web, mobile, cloud, and AI product development for ambitious companies.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport = {
  themeColor: "#0a0c10",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col bg-paper text-ink-900"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
