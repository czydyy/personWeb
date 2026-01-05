import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 py-12 mt-20 bg-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-xl font-bold text-gradient">MaWder</div>
        <div className="text-slate-500 text-sm font-medium">
          © {new Date().getFullYear()} 个人网站. 使用 Next.js 构建。
        </div>
        <div className="flex gap-6 font-medium">
          <a
            href="#"
            className="text-slate-400 hover:text-slate-900 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
