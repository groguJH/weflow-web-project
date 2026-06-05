import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingQuickMenu from "@/components/layout/FloatingQuickMenu";
import FormModal from "@/components/ui/FormModal";
import {
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/data/metadata";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "WEFLOW",
    "위플로우",
    "홈페이지 제작",
    "랜딩페이지 제작",
    "무료진단",
    "광고 운영",
    "검색 상단 노출",
    "예약 시스템",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    images: [OG_IMAGE],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={geist.variable}>
      <body className="min-h-screen text-slate-100 antialiased">
        <a href="#main-content" className="skip-link">
          본문 바로가기
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <FloatingQuickMenu />
        <FormModal />
      </body>
    </html>
  );
}
