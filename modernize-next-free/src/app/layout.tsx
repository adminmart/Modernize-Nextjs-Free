"use client";
import { Plus_Jakarta_Sans } from 'next/font/google';
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";


// If loading a variable font, you don't need to specify the font weight
const roboto = Plus_Jakarta_Sans({
  weight:['300', '400', '500','600', '700'],
  subsets: ['latin'],
  display: 'swap',
});



export default function RootLayout({
  children
}: {
  children: React.ReactNode;
  
}) {
  
  return (
    <html lang="en" >
      <body className={roboto.className}>
      
        <ThemeProvider theme={baselightTheme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {children}
        </ThemeProvider>
        
      </body>
    </html>
  );
}
