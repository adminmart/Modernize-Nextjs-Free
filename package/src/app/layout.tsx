"use client";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getServerSession } from "next-auth";
import SessionProvider from "./components/SessionProvider";

export default  function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerSession();
  return (
    <html lang="en">
      <body>

        <ThemeProvider theme={baselightTheme}>
          <CssBaseline />
          {/* <SessionProvider session={session}>  */}
          {children}
          {/* </SessionProvider> */}
        </ThemeProvider>

      </body>
    </html>
  );
}
