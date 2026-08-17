import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import NavBar from "@/components/shared/NavBar";


const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevEvent",
  description: "Create and manage developers events with ease.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", schibstedGrotesk.variable, martianMono.variable)}
    >
      <body className="bg-[url('/background.png')] overflow-x-hidden bg-top bg-cover bg-center bg-no-repeat bg-foreground min-h-full flex flex-col">
      <NavBar />
      {children}</body>
    </html>
  );
}
