'use client'
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "@/utils/createEmotionCache";
import { baselightTheme } from "@/utils/theme/DefaultColors";

export const metadata = {
  title: 'Modernize NextJs Free Admin Template',
  description: 'Totally Free of cost this Modernize NextJs Free Admin Template, Grab it from adminmart.com',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <ThemeProvider theme={baselightTheme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
          {children}
        </ThemeProvider>
      </body> 
    </html>
  )
}
