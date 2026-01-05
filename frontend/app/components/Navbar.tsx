'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  const links = React.useMemo(
    () => [
      { name: '首页', path: '/' },
      { name: '简历', path: '/resume' },
      { name: '项目', path: '/projects' },
      { name: '博客', path: '/blog' },
    ],
    []
  );

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-gradient transition-transform hover:scale-105 active:scale-95"
              aria-label="返回首页"
            >
              MaWder
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {links.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ease-out ${
                    pathname === link.path
                      ? 'text-blue-600 bg-blue-50 shadow-sm scale-105'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:shadow-sm'
                  }`}
                  aria-current={pathname === link.path ? 'page' : undefined}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
