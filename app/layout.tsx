import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ResponsiveNav from "@/components/Home/Navbar/ResponsiveNav";

const geistSans = Inter({
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Lahiru Sampath Portfolio",
  description: "Portfolio of Lahiru Sampath, a full-stack developer specializing in React, Next.js, Node.js, and scalable web applications. Explore projects, skills, and experience in modern web development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body className={`${geistSans.className} antialiased bg-[#0a0a0f] text-[#e8e8f0]`}>
        <ResponsiveNav />
  {children}
</body>
    </html>
  );
}
