import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/app/components/Navbar';
import ChatAssistant from '@/app/components/ChatAssistant';
import Footer from '@/app/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '陈泽宇的个人网站',
  description: '基于 React + Next.js 的现代化个人网站',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}>
        {/* 背景装饰元素 */}
        <div className="fixed top-0 -left-20 w-[500px] h-[500px] bg-blue-400/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="fixed bottom-0 -right-20 w-[500px] h-[500px] bg-purple-400/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="min-h-screen flex flex-col relative overflow-x-hidden">
          <Navbar />
          <main className="flex-grow pt-20 transition-opacity duration-200 ease-in-out">{children}</main>
          <Footer />
          <ChatAssistant />
        </div>
      </body>
    </html>
  );
}
