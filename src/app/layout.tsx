import type { Metadata } from "next";
import { Bitter, Caveat, Gloria_Hallelujah, Lato } from "next/font/google";
import "./globals.css";
import Header from "../components/molecules/header";
import Footer from "../components/molecules/footer";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
});
const bitter = Bitter({ subsets: ["latin"], variable: "--font-bitter" });
export const gloria = Gloria_Hallelujah({
  subsets: ["latin"],
  variable: "--font-gloria",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className="scroll-smooth">
      <body
        className={`${bitter.variable} ${lato.variable} ${gloria.variable} dark font-lato bg-black`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
