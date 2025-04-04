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

export const metadata: Metadata = {
  title: "Dev Overflow",
  description:
    "A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web development, mobile app development, algorithms, data structures, and more.",
  icons: {
    icon: "/images/site-logo.svg",
  },
};

const RootLayout = async ({children} : {children: React.ReactNode}) => {

  const session = await auth();

  return (
    <html lang="es" suppressHydrationWarning>
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
