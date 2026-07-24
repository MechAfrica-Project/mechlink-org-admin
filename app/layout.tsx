import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "../components/providers/ThemeProvider";

const ttnorms = localFont({
  src: [
    {
      path: "./fonts/TTNorms-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/TTNorms-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/TTNorms-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-ttnorms",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === "production"
      ? "https://admin.mechlink.org"
      : "http://localhost:3000"
  ),
  title: {
    default: "MechLink Admin",
    template: "%s · MechLink Admin",
  },
  description: "Manage MechLink's team, inbox, and site settings.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    title: "MechLink Admin",
    // Not "black-translucent": that draws white status-bar text over the page
    // and lets content slide under it, which is unreadable on the admin
    // panel's white (light-theme) background.
    statusBarStyle: "default",
  },
  // An internal tool has no business in search results.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0E5C43",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ttnorms.variable} antialiased`} suppressHydrationWarning>
      <body className="bg-void text-cloud min-h-screen flex flex-col" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
