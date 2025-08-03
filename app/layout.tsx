import "./globals.css";
import { Inter } from "next/font/google";
import React, { Suspense } from "react";
import { MainLayout } from "@/components/layout/layout";
import { Metadata } from "next";
import { Loader } from "@/ui/loader";

export const metadata: Metadata = {
  title: "E-commerce | Desafio 10",
  description: "Tienda virtual",
  icons: "https://res.cloudinary.com/dy26iktoi/image/upload/v1688595425/logo_mzoa3e.webp",
};
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='es'>
      <head>
        <link rel='preconnect' href='https://desafio-m9-two.vercel.app' />
      </head>
      <body className={inter.className}>
        <Suspense fallback={<Loader />}>
          <MainLayout>{children}</MainLayout>
        </Suspense>
      </body>
    </html>
  );
}
