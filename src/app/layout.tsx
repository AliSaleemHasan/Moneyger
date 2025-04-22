import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import ApolloWrapper from "@/lib/apollo-client/apollo-wrapper";
import { redirect } from "next/navigation";
import { getUserSession } from "./actions/auth";

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
    <html lang="en">
      <body className={` antialiased`}>
        <ApolloWrapper>
          <div className="w-[100svw] ">{children}</div>
          <Toaster />
        </ApolloWrapper>
      </body>
    </html>
  );
}
