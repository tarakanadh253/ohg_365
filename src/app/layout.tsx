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
        {AUTH_SYSTEM_AVAILABLE && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function() {
                try {
                  const path = window.location.pathname;
                  // Only require registration for tutorials dropdown routes
                  const isTutorialRoute = 
                    path === '/tutorials/medical-coding' ||
                    path === '/tutorials/programming' ||
                    path === '/tutorials/government-jobs' ||
                    path === '/tutorials/courses' ||
                    path.startsWith('/tutorials/medical-coding/') ||
                    path.startsWith('/tutorials/programming/') ||
                    path.startsWith('/tutorials/government-jobs/') ||
                    path.startsWith('/tutorials/courses/');
                  
                  if (isTutorialRoute) {
                    const token = localStorage.getItem('token');
                    
                    // Check if token exists
                    if (!token || token.trim() === '' || token === 'null' || token === 'undefined') {
                      console.log('[AUTH] No token found, checking for registered email');
                      let registeredEmail = localStorage.getItem('registeredEmail');
                      console.log('[AUTH] registeredEmail from localStorage:', registeredEmail);
                      
                      // Fallback: check stored user object for email
                      if (!registeredEmail) {
                        const userStr = localStorage.getItem('user');
                        console.log('[AUTH] Checking user object, userStr exists:', !!userStr);
                        if (userStr) {
                          try {
                            const user = JSON.parse(userStr);
                            console.log('[AUTH] Parsed user object:', user);
                            if (user && user.email && typeof user.email === 'string') {
                              registeredEmail = user.email;
                              console.log('[AUTH] Found email in user object:', registeredEmail);
                              if (registeredEmail) {
                                localStorage.setItem('registeredEmail', registeredEmail);
                              }
                            }
                          } catch (e) {
                            console.error('[AUTH] Error parsing user:', e);
                          }
                        }
                      }
                      
                      console.log('[AUTH] Final registeredEmail check:', registeredEmail);
                      if (registeredEmail && registeredEmail.trim() !== '') {
                        console.log('[AUTH] ✅ Found registered email, allowing page to load for modal (will show on every visit)');
                        // Don't redirect - let TutorialAuthGuard show the modal instead
                        // The modal will appear on EVERY visit when registered email exists
                        // Just allow the page to continue loading
                        return;
                      } else {
                        console.log('[AUTH] ❌ No registered email, redirecting to registration');
                        window.location.href = '/register?redirect=' + encodeURIComponent(path);
                        window.stop(); // Stop page loading
                        return;
                      }
                    }
                    
                    // Validate JWT token format and expiry
                    try {
                      const parts = token.split('.');
                      if (parts.length !== 3) {
                        // Invalid JWT format
                        console.log('[AUTH] Invalid JWT format, checking for registered email');
                        localStorage.removeItem('token');
                        let registeredEmail = localStorage.getItem('registeredEmail');
                        if (!registeredEmail) {
                          const userStr = localStorage.getItem('user');
                          if (userStr) {
                            try {
                              const user = JSON.parse(userStr);
                              if (user && user.email && typeof user.email === 'string') {
                                registeredEmail = user.email;
                                if (registeredEmail) {
                                  localStorage.setItem('registeredEmail', registeredEmail);
                                }
                              }
                            } catch (e) {
                              // Ignore parse errors
                            }
                          }
                        }
                        if (registeredEmail && registeredEmail.trim() !== '') {
                          console.log('[AUTH] ✅ Found registered email (invalid token), allowing page to load for modal');
                          // Don't redirect - let TutorialAuthGuard show the modal instead
                          return;
                        } else {
                          window.location.href = '/register?redirect=' + encodeURIComponent(path);
                          window.stop(); // Stop page loading
                          return;
                        }
                      }
                      
                      // Check if token is expired
                      const payload = JSON.parse(atob(parts[1]));
                      if (payload.exp && payload.exp * 1000 < Date.now()) {
                        // Token expired
                        console.log('[AUTH] Token expired, checking for registered email');
                        localStorage.removeItem('token');
                        let registeredEmail = localStorage.getItem('registeredEmail');
                        if (!registeredEmail) {
                          const userStr = localStorage.getItem('user');
                          if (userStr) {
                            try {
                              const user = JSON.parse(userStr);
                              if (user && user.email && typeof user.email === 'string') {
                                registeredEmail = user.email;
                                if (registeredEmail) {
                                  localStorage.setItem('registeredEmail', registeredEmail);
                                }
                              }
                            } catch (e) {
                              // Ignore parse errors
                            }
                          }
                        }
                        if (registeredEmail && registeredEmail.trim() !== '') {
                          console.log('[AUTH] ✅ Found registered email (invalid token), allowing page to load for modal');
                          // Don't redirect - let TutorialAuthGuard show the modal instead
                          return;
                        } else {
                          window.location.href = '/register?redirect=' + encodeURIComponent(path);
                          window.stop(); // Stop page loading
                          return;
                        }
                      }
                      
                      // Token is valid - extract and store registered email from user object or token
                      console.log('[AUTH] Token valid, checking for registered email to show modal');
                      let registeredEmail = localStorage.getItem('registeredEmail');
                      
                      // If no registeredEmail, try to extract from user object
                      if (!registeredEmail || registeredEmail.trim() === '') {
                        const userStr = localStorage.getItem('user');
                        console.log('[AUTH] Checking user object for email, userStr exists:', !!userStr);
                        if (userStr) {
                          try {
                            const user = JSON.parse(userStr);
                            console.log('[AUTH] Parsed user object:', user);
                            if (user && user.email && typeof user.email === 'string' && user.email.trim() !== '') {
                              registeredEmail = user.email.trim();
                              console.log('[AUTH] Found email in user object:', registeredEmail);
                              if (registeredEmail) {
                                localStorage.setItem('registeredEmail', registeredEmail);
                              }
                            }
                          } catch (e) {
                            console.error('[AUTH] Error parsing user object:', e);
                          }
                        }
                      }
                      
                      // Token is valid - allow access regardless of registeredEmail
                      // registeredEmail is only used for the "continue" modal, not for blocking access
                      if (registeredEmail && registeredEmail.trim() !== '') {
                        console.log('[AUTH] ✅ Token valid and registered email found:', registeredEmail, '- allowing page to load (modal will show)');
                      } else {
                        console.log('[AUTH] ✅ Token valid but no registered email - allowing access anyway (token is sufficient)');
                      }
                      // Don't redirect - allow page to load
                      // If registeredEmail exists, modal will show via TutorialAuthGuard
                      // If not, user can still access with valid token
                      return;
                    } catch (e) {
                      // Invalid token format
                      console.log('[AUTH] Token validation error, checking for registered email', e);
                      localStorage.removeItem('token');
                      let registeredEmail = localStorage.getItem('registeredEmail');
                      if (!registeredEmail) {
                        const userStr = localStorage.getItem('user');
                        if (userStr) {
                          try {
                            const user = JSON.parse(userStr);
                            if (user && user.email) {
                              registeredEmail = user.email;
                              localStorage.setItem('registeredEmail', registeredEmail);
                            }
                          } catch (e) {
                            // Ignore parse errors
                          }
                        }
                      }
                      if (registeredEmail) {
                        window.location.href = '/continue?redirect=' + encodeURIComponent(path);
                      } else {
                        window.location.href = '/register?redirect=' + encodeURIComponent(path);
                      }
                      window.stop(); // Stop page loading
                      return;
                    }
                  }
                } catch (e) {
                  console.error('[AUTH] Script error:', e);
                }
              })();
            `,
            }}
          />
        )}
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
