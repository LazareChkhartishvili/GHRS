import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppShell from "./components/AppShell";
import { AuthProvider } from "./context/AuthContext";
import { I18nProvider } from "./context/I18nContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GRS - ჯანმრთელობისა და რეაბილიტაციის სისტემა",
  description:
    "ისრაელური რეაბილიტაციის პროტოკოლები, ვარჯიშების კომპლექსები და პროფესიული განვითარება",
  keywords: "რეაბილიტაცია, ვარჯიშები, ჯანმრთელობა, ფიზიოთერაპია, ისრაელი",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ka">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nProvider>
          <AuthProvider>
            <AppShell>{children}</AppShell>
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
