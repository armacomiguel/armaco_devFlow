import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/context/Theme";
import { Toaster } from "sonner";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800','900'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: [ '300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata = {
  title: "Dev Overflow",
  description: "A community for asking and answering programming questions.",
  icons: {
    icon: "/icons/favicon.svg",
    shortcut: "/icons/favicon-shortcut.png",
    apple: "/icons/apple-icon.png",
  },
  keywords: ["programming", "web development", "Q&A", "developers", "tech help"],
  authors: [
    { name: "Miguel Armenta" },
    { name: "Dev Team" },
  ],
  openGraph: {
    title: "Dev Overflow | Ask & Answer Programming Questions",
    description: "Explore coding topics with help from the global dev community.",
    url: "https://devoverflow.dev",// cambiar url cuando se publique.
    siteName: "Dev Overflow",
    images: [
      {
        url: "/images/og-banner.png",
        width: 1200,
        height: 630,
        alt: "Dev Overflow OG Banner",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
};

const RootLayout = async ({children} : {children: React.ReactNode}) => {

  const session = await auth();

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />    
      </head>
      <SessionProvider session={session}>
        <body className={`${inter.className} ${spaceGrotesk.variable} antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
          <Toaster richColors position="top-right"/>
        </body>
      </SessionProvider>
    </html>
  );
}

export default RootLayout;
