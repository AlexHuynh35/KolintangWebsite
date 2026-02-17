import "./globals.css";
import type { Metadata } from "next";
import { Lora } from "next/font/google";
import { NavBar, Hero, Footer } from "@/components/index";

const lora = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cita Lomendehe",
  description: "Website relating to Kolintang events in San Francisco",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lora.className} bg-white text-black`}>
        <NavBar />
        <Hero />
        {children}
        <Footer />
      </body>
    </html>
  );
}
