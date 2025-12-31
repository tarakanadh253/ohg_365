import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google"; // Import Orbitron
import "./globals.css";
import { ConditionalNav } from "@/components/conditional-nav";
import AuthGuard from "@/components/auth-guard";
import GlobalContinuePrompt from "@/components/global-continue-prompt";
import { SiteNavigationJSONLD } from "@/components/seo-metadata";
import { AUTH_SYSTEM_AVAILABLE } from "@/config/authStatus";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Configure Orbitron font
const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "OHG 365",
  applicationName: "OHG 365",
  description: "OHG365 is a comprehensive learning and career development platform offering programming tutorials, coding challenges, project-based training, career resources, and DevOps guides to help you grow your tech skills and succeed.",
  icons: {
    icon: '/logo_new.jpg',
    shortcut: '/logo_new.jpg',
    apple: '/logo_new.jpg',
  },
  openGraph: {
    title: "OHG 365",
    description: "OHG365 is a comprehensive learning and career development platform offering programming tutorials, coding challenges, project-based training, career resources, and DevOps guides to help you grow your tech skills and succeed.",
    url: 'https://ohg365.com',
    siteName: 'OHG 365',
    images: [
      {
        url: '/logo_new.jpg',
        width: 1200,
        height: 1200,
        alt: 'OHG 365 Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OHG 365',
    description: 'OHG365 is a comprehensive learning and career development platform offering programming tutorials, coding challenges, project-based training, career resources, and DevOps guides to help you grow your tech skills and succeed.',
    images: ['/logo_new.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/logo_new.jpg" sizes="any" />
        <link rel="shortcut icon" href="/logo_new.jpg" />
        <link rel="apple-touch-icon" href="/logo_new.jpg" />
        <meta name="application-name" content="OHG 365" />
        <meta name="apple-mobile-web-app-title" content="OHG 365" />
        {/* Blocking script that runs before React - checks auth for tutorial routes - MUST BE FIRST */}
        {/* Blocking script removed to prevent auto-redirects */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SiteNavigationJSONLD />
          <AuthGuard>
            <GlobalContinuePrompt />
            <ConditionalNav />
            {children}
          </AuthGuard>
        </ThemeProvider>
      </body>
    </html>
  );
}
