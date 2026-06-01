import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomBar from "@/components/layout/BottomBar";
import FormModal from "@/components/ui/FormModal";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata = {
  title: "WEFLOW — 문의로 이어지는 홈페이지를 만듭니다",
  description:
    "홈페이지 제작부터 광고 연동·운영 관리까지, 단순 제작이 아닌 문의 구조까지 설계합니다.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={geist.variable}>
      <body
        className="min-h-screen text-slate-100 antialiased"
        style={{
          paddingBottom: "calc(64px + env(safe-area-inset-bottom, 0px))",
        }}
      >
        <Header />
        <main>{children}</main>
        <Footer />
        <BottomBar />
        <FormModal />
      </body>
    </html>
  );
}
