import React from 'react';

const ResumeSkeleton = () => {
  return (
    <div className="pt-24 pb-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
      {/* 个人简介区域骨架屏 */}
      <div className="mb-20">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
          {/* 个人照片骨架屏 */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-slate-200"></div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-slate-300 rounded-full"></div>
            </div>
          </div>

          {/* 个人信息骨架屏 */}
          <div className="flex-1 text-center md:text-left">
            <div className="h-10 bg-slate-200 rounded w-3/4 mb-3 mx-auto md:mx-0"></div>
            <div className="h-8 bg-slate-200 rounded w-1/2 mb-4 mx-auto md:mx-0"></div>
            <div className="space-y-3 mb-8">
              <div className="h-4 bg-slate-200 rounded w-full"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6"></div>
              <div className="h-4 bg-slate-200 rounded w-4/5"></div>
            </div>

            {/* 联系信息骨架屏 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-200 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-3 bg-slate-200 rounded w-1/4 mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* 社交链接骨架屏 */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 bg-slate-200 rounded-full w-32"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 工作经历骨架屏 */}
      <div className="mb-20">
        <div className="h-8 bg-slate-200 rounded w-1/4 mb-10"></div>
        <div className="space-y-12">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="relative pl-8 border-l-2 border-slate-200">
              <div className="absolute -left-[9px] top-1 w-4 h-4 bg-white border-2 border-slate-300 rounded-full"></div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div className="space-y-2">
                  <div className="h-6 bg-slate-200 rounded w-2/3"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                </div>
                <div className="h-6 bg-slate-200 rounded w-24 mt-2 md:mt-0"></div>
              </div>
              <ul className="space-y-3">
                {[...Array(3)].map((_, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="text-slate-300 font-bold">•</span>
                    <div className="h-4 bg-slate-200 rounded w-full"></div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 技能 & 技术骨架屏 */}
      <div>
        <div className="h-8 bg-slate-200 rounded w-1/4 mb-10"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl border border-slate-100"
            >
              <div className="h-6 bg-slate-200 rounded w-1/2 mb-4"></div>
              <div className="flex flex-wrap gap-2">
                {[...Array(6)].map((_, j) => (
                  <div key={j} className="h-8 bg-slate-200 rounded w-16"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeSkeleton;
