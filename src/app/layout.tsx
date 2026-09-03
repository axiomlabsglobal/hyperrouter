import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { I18nProvider } from "@/i18n/context";
import { AuthProvider } from "@/providers/auth-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hyperrouter.netlify.app'),
  title: {
    default: 'HyperRouter - Global GPU Pricing & Routing Aggregator',
    template: '%s | HyperRouter'
  },
  description: 'Compare real-time GPU pricing and availability across 19+ cloud providers. Find the best GPU for your AI workloads.',
  keywords: [
    'GPU Cloud',
    'GPU Price Comparison',
    'H100 SXM5',
    'A100 80GB',
    'B200 Cloud',
    'RunPod alternative',
    'Lambda Labs pricing',
    'GPU Metasearch',
    'AI Cloud Compute'
  ],
  authors: [{ name: 'HyperRouter Inc.' }],
  creator: 'HyperRouter',
  publisher: 'HyperRouter Inc.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hyperrouter.netlify.app',
    siteName: 'HyperRouter',
    title: 'HyperRouter - Global GPU Pricing & Routing Aggregator',
    description: 'Real-time global GPU pricing, availability tracking, and automated Slack inventory alerts across 19+ cloud vendors.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HyperRouter - Global GPU Pricing & Routing Aggregator',
    description: 'Instant GPU price index & availability comparison across top cloud providers.',
    creator: '@hyperrouter',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <I18nProvider>{children}</I18nProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

