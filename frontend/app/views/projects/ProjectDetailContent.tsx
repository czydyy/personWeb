'use client';

import React from 'react';
import { Project } from '../../lib/types';
import Link from 'next/link';

interface ProjectDetailContentProps {
  project: Project;
}

/**
 * ProjectDetailContent 组件 - 显示项目详情
 *
 * 这是一个客户端组件，因为需要交互功能（如返回按钮、链接点击）
 */
const ProjectDetailContent = ({ project }: ProjectDetailContentProps) => {
  // 模拟项目时间线数据
  const timeline = [
    { date: '2024年1月', event: '项目启动与需求分析' },
    { date: '2024年3月', event: '技术选型与架构设计' },
    { date: '2024年6月', event: '核心功能开发完成' },
    { date: '2024年9月', event: '测试与优化阶段' },
    { date: '2024年12月', event: '项目上线与部署' },
  ];

  // 模拟相关项目
  const relatedProjects = [
    { id: 'project-2', title: '实时数据可视化平台', tags: ['数据可视化', 'Vue.js'] },
    { id: 'project-3', title: '微服务电商平台', tags: ['微服务', 'Spring Boot'] },
    { id: 'project-4', title: '跨平台移动应用开发框架', tags: ['React Native', '移动开发'] },
  ];

  return (
    <div className="pt-24 pb-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 返回按钮 */}
      <div className="mb-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回项目列表
        </Link>
      </div>

      {/* 项目封面图 */}
      <div className="mb-10 overflow-hidden rounded-3xl aspect-[16/9] bg-slate-200 shadow-2xl shadow-slate-300/50">
        <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
      </div>

      {/* 项目基本信息 */}
      <div className="mb-12">
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            已完成
          </span>
          <span className="text-slate-500 font-medium">开发周期: 2024年1月 - 2024年12月</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900 leading-tight">{project.title}</h1>

        <p className="text-xl text-slate-600 mb-8 leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-sm font-bold px-4 py-2 bg-blue-50 text-blue-700 rounded-full border border-blue-100 hover:bg-blue-100 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 项目链接 */}
        <div className="flex flex-wrap gap-6">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              查看演示
            </a>
          )}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-full font-semibold transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              查看源代码
            </a>
          )}

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: project.title,
                  text: project.description,
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('项目链接已复制到剪贴板！');
              }
            }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full font-semibold transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
            分享项目
          </button>
        </div>
      </div>

      {/* 项目详细内容 */}
      {project.content && (
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-slate-900">项目详情</h2>
          <div className="prose prose-lg max-w-none">
            <div
              className="text-slate-700 leading-relaxed text-lg"
              dangerouslySetInnerHTML={{ __html: formatProjectContent(project.content) }}
            />
          </div>
        </div>
      )}

      {/* 项目时间线 */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-slate-900">项目时间线</h2>
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-blue-100"></div>
          {timeline.map((item, index) => (
            <div
              key={index}
              className={`relative mb-10 ${index % 2 === 0 ? 'md:pr-1/2 md:pl-8' : 'md:pl-1/2 md:pr-8'}`}
            >
              <div className="flex items-center">
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full border-4 border-white"></div>
                <div className={`ml-12 md:ml-0 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-sm font-bold text-blue-600 mb-2">{item.date}</div>
                    <div className="font-semibold text-slate-900">{item.event}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 技术栈 */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-slate-900">技术栈</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {project.tags.map((tag) => (
            <div
              key={tag}
              className="bg-white border border-slate-200 rounded-2xl p-6 text-center hover:shadow-lg hover:border-blue-200 transition-all"
            >
              <div className="text-2xl font-bold text-blue-600 mb-2">{getTechIcon(tag)}</div>
              <div className="font-semibold text-slate-800">{tag}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 相关项目 */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-slate-900">相关项目</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedProjects.map((related) => (
            <Link key={related.id} href={`/projects/${related.id}`} className="block group">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-lg transition-all">
                <h3 className="font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {related.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {related.tags.map((tag) => (
                    <span key={tag} className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-700 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 返回和分享区域 */}
      <div className="mt-16 pt-8 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回项目列表
          </Link>

          <div className="flex gap-4">
            <button
              onClick={() => {
                const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  project.title
                )}&url=${encodeURIComponent(window.location.href)}`;
                window.open(url, '_blank');
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 rounded-full font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
              分享到 Twitter
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 rounded-full font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              打印详情
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 格式化项目内容
 * 将纯文本转换为带段落格式的HTML
 */
const formatProjectContent = (content: string): string => {
  if (!content) return '<p>暂无详细内容</p>';

  // 简单的格式化：将换行符转换为段落
  const paragraphs = content.split('\n').filter((p) => p.trim());
  return paragraphs.map((p) => `<p>${p}</p>`).join('');
};

/**
 * 获取技术图标
 * 根据技术标签返回对应的图标
 */
const getTechIcon = (tech: string): string => {
  const icons: Record<string, string> = {
    Python: '🐍',
    JavaScript: '📜',
    TypeScript: '📘',
    React: '⚛️',
    'Next.js': '▲',
    FastAPI: '🚀',
    PostgreSQL: '🐘',
    Docker: '🐳',
    Kubernetes: '☸️',
    AWS: '☁️',
    Tailwind: '🎨',
    Git: '📚',
    'Node.js': '🟢',
    'Vue.js': '🟩',
    MongoDB: '🍃',
    Redis: '🔴',
    GraphQL: '📊',
    REST: '🔗',
  };

  return icons[tech] || '💻';
};

export default ProjectDetailContent;
