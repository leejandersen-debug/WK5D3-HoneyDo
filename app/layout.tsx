import type { Metadata } from "next";
import { Fredoka, Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Logo from "@/app/components/Logo";
import SiteNav from "@/app/components/SiteNav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Rounded display face for the brand and headings.
const fredoka = Fredoka({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "HoneyDo",
    template: "%s · HoneyDo",
  },
  description: "The household to-do list for what HoneyDoes.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fredoka.variable}`}
    >
      <body>
        <header className="site-header">
          <Link href="/" className="brand">
            <Logo />
            <span className="brand-text">
              <span className="brand-name">
                Honey<span>Do</span>
              </span>
              <span className="tagline">HoneyDo List for what HoneyDoes.</span>
            </span>
          </Link>
          <SiteNav />
        </header>
        {children}
        <footer className="site-footer">
          <p>&copy; 2026 HoneyDo. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
