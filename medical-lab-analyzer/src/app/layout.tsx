import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const cairo = Cairo({ subsets: ["arabic"] });

export const metadata: Metadata = {
  title: "نظام التحليل الطبي المختبري",
  description: "تطبيق شامل لإدارة الفحوصات الطبية وتحليل الصور وتوليد التقارير",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.className} ${inter.className} bg-gray-50`}>
        {children}
      </body>
    </html>
  );
}
