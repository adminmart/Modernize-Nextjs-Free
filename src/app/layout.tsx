import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeRegistry from '../components/ThemeRegistry/ThemeRegistry';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Email Insights App",
  description: "Email analytics and insights dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
