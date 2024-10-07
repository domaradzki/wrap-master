import { ReactNode } from "react";
import type { Metadata } from "next";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// import { SessionProvider } from "next-auth/react";
// import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/auth";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import ReactQueryContextProvider from "../context/reactQuery";
import { AppProvider } from "../context/appContext";
import { AuthSessionProvider } from "../context/sessionContext";
import { Session } from "inspector";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Wrap Master",
  description: "Obsługa zamówień produktów opakowaniowych",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <AuthSessionProvider propsData={session}>
        <AppProvider>
          <ReactQueryContextProvider>
            <html lang="pl">
              <body>
                <ThemeProvider theme={baselightTheme}>
                  {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                  <CssBaseline />
                  {children}
                </ThemeProvider>
              </body>
            </html>
          </ReactQueryContextProvider>
        </AppProvider>
      </AuthSessionProvider>
    </SessionProvider>
  );
}
