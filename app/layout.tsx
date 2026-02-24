import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "キリンジ | モバイルオーダー",
  description: "カスラーメン自家製麺キリンジ モバイルオーダー",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="bg-kirinji-black min-h-screen">
        <div className="max-w-md mx-auto relative min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
