import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
    <div className="pt-20 pb-12">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-slate-900 leading-[1.2]">
          <span className="text-gradient">努力做最好的自己</span>
        </h1>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/projects"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition-all hover:scale-105 shadow-lg shadow-blue-500/25"
          >
            查看项目
          </Link>
          <Link
            href="/resume"
            className="glass-card hover:bg-white text-slate-900 px-8 py-3 rounded-full font-bold transition-all border border-slate-200"
          >
            了解我
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
