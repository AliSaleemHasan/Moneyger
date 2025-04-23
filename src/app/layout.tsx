import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import ApolloWrapper from "@/lib/apollo-client/apollo-wrapper";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Moneyger",
  description: "Manage your money easily",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={` antialiased`}>
        <ThemeProvider enableSystem disableTransitionOnChange>
          <ApolloWrapper>
            <div className="w-[100svw] ">{children}</div>
            <Toaster />
          </ApolloWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
