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
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://hyperrouter.io'),
  title: {
    default: 'HyperRouter - Real-time Global GPU Price Index & Cloud Metasearch',
    template: '%s | HyperRouter'
  },
  description: 'Compare real-time GPU pricing and availability across 19+ cloud providers (Lambda, RunPod, PrimeIntellect, Nebius, AWS). Live spot & on-demand price index.',
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
    url: 'https://hyperrouter.io',
    siteName: 'HyperRouter',
    title: 'HyperRouter - Real-time Global GPU Price Index & Cloud Metasearch',
    description: 'Real-time global GPU pricing, availability tracking, and automated Slack inventory alerts across 19+ cloud vendors.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HyperRouter - Real-time Global GPU Price Index & Cloud Metasearch',
    description: 'Instant GPU price index & availability comparison across Lambda, RunPod, PrimeIntellect, Nebius, and AWS.',
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

