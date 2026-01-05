import React from 'react';

const BlogListSkeleton = () => {
  return (
    <div className="space-y-20 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <article key={i} className="group">
          {/* 封面图片骨架屏 */}
          <div className="mb-6 overflow-hidden rounded-[32px] aspect-[16/9] bg-slate-200 shadow-xl shadow-slate-200/50"></div>

          {/* 元信息骨架屏 */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-4 bg-slate-200 rounded w-20"></div>
            <div className="h-4 bg-slate-200 rounded w-4"></div>
            <div className="h-4 bg-slate-200 rounded w-24"></div>
          </div>

          {/* 标题骨架屏 */}
          <div className="h-10 bg-slate-200 rounded w-3/4 mb-4"></div>

          {/* 摘要骨架屏 */}
          <div className="space-y-3 mb-6">
            <div className="h-4 bg-slate-200 rounded w-full"></div>
            <div className="h-4 bg-slate-200 rounded w-5/6"></div>
            <div className="h-4 bg-slate-200 rounded w-4/5"></div>
          </div>

          {/* 标签骨架屏 */}
          <div className="flex flex-wrap gap-2">
            {[...Array(4)].map((_, j) => (
              <div key={j} className="h-8 bg-slate-200 rounded-full w-16"></div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
};

export default BlogListSkeleton;
