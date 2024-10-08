import type { Metadata } from "next";
import { Bitter, Caveat, Gloria_Hallelujah, Lato } from "next/font/google";
import "./globals.css";
import Header from "../components/molecules/header";
import Footer from "../components/molecules/footer";
import PageLoader from "../components/organisms/page-loader";

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
  title: "Santa Zuera",
  description: "A Zuera Santifica! Santa Zuera, o Podcast do Santa Carona!",
  keywords: [
    "Santa Zuera",
    "Santa Carona",
    "Podcast",
    "Igreja",
    "Católico",
    "Cristão",
    "Religião",
    "Deus",
    "Jesus",
    "Espírito Santo",
  ],
  openGraph: {
    title: "Santa Zuera",
    description: "A Zuera Santifica! Santa Zuera, o Podcast do Santa Carona!",
    images: [
      {
        url: `https://${process.env.BASE_URL}/logo.png`,
        width: 488,
        height: 488,
        alt: "Santa Zuera",
      },
    ],
    siteName: "Santa Zuera",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className="scroll-smooth">
      <head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="apple-touch-icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:5126805,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
          }}
        ></script>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-18YT47LENN"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-18YT47LENN');`,
          }}
        ></script>
      </head>
      <body
        className={`${bitter.variable} ${lato.variable} ${gloria.variable} dark font-lato overflow-x-hidden bg-black`}
      >
        <PageLoader />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
