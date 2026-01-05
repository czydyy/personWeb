import React from 'react';

const ProjectSkeleton = () => {
  return (
    <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 标题区域骨架屏 */}
      <div className="mb-12">
        <div className="h-10 bg-slate-200 rounded w-1/4 mb-4"></div>
        <div className="h-6 bg-slate-200 rounded w-1/2"></div>
      </div>

      {/* 项目网格骨架屏 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="glass-card !bg-white rounded-3xl overflow-hidden border border-slate-100 flex flex-col animate-pulse"
          >
            {/* 图片骨架屏 */}
            <div className="h-56 bg-slate-200"></div>

            <div className="p-8 flex-1 flex flex-col">
              {/* 标题骨架屏 */}
              <div className="h-7 bg-slate-200 rounded w-3/4 mb-3"></div>

              {/* 描述骨架屏 */}
              <div className="space-y-2 mb-6 flex-1">
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                <div className="h-4 bg-slate-200 rounded w-4/5"></div>
              </div>

              {/* 标签骨架屏 */}
              <div className="flex flex-wrap gap-2 mb-8">
                {[...Array(4)].map((_, j) => (
                  <div
                    key={j}
                    className="h-6 bg-slate-200 rounded-full w-16"
                  ></div>
                ))}
              </div>

              {/* 按钮骨架屏 */}
              <div className="flex gap-6">
                <div className="h-8 bg-slate-200 rounded w-24"></div>
                <div className="h-8 bg-slate-200 rounded w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectSkeleton;
