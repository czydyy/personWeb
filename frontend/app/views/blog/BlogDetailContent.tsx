'use client';

import React from 'react';
import { BlogPost } from '../../utils/types';
import Link from 'next/link';

interface BlogDetailContentProps {
  blog: BlogPost;
}

/**
 * BlogDetailContent 组件 - 显示博客文章详情
 *
 * 这是一个客户端组件，因为需要交互功能（如返回按钮）
 */
const BlogDetailContent = ({ blog }: BlogDetailContentProps) => {
  // 计算阅读时间（假设平均阅读速度：200字/分钟）
  const calculateReadingTime = (content: string): number => {
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  };

  const readingTime = calculateReadingTime(blog.content);

  return (
    <div className="pt-24 pb-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 返回按钮 */}
      <div className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回博客列表
        </Link>
      </div>

      {/* 文章封面图 */}
      <div className="mb-10 overflow-hidden rounded-[32px] aspect-[16/9] bg-slate-200 shadow-xl shadow-slate-200/50">
        <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
      </div>

      {/* 文章元信息 */}
      <div className="mb-10">
        <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-slate-500 mb-6 uppercase tracking-widest">
          <span>{blog.date}</span>
          <span>•</span>
          <span className="text-blue-600">{blog.author}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {readingTime} 分钟阅读
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900 leading-tight">{blog.title}</h1>

        <p className="text-xl text-slate-600 mb-8 leading-relaxed">{blog.excerpt}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="text-sm font-bold px-4 py-2 bg-slate-100 rounded-full text-slate-700 border border-slate-200 hover:bg-slate-200 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 分享按钮 */}
        <div className="flex gap-3">
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: blog.title,
                  text: blog.excerpt,
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('链接已复制到剪贴板！');
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
            分享
          </button>
        </div>
      </div>

      {/* 文章内容 */}
      <article className="prose prose-lg max-w-none">
        <div
          className="text-slate-700 leading-relaxed text-lg"
          dangerouslySetInnerHTML={{ __html: formatBlogContent(blog.content) }}
        />
      </article>

      {/* 分享和操作区域 */}
      <div className="mt-16 pt-8 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回博客列表
          </Link>

          <div className="flex gap-4">
            <button
              onClick={() => {
                const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  blog.title
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
              打印文章
            </button>
          </div>
        </div>

        {/* 上一篇/下一篇导航（模拟数据） */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-slate-200 rounded-2xl hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <div className="text-sm font-bold text-slate-500 mb-2">上一篇</div>
            <div className="font-semibold text-slate-900 mb-2">使用FastAPI构建高性能Python后端服务</div>
            <Link href="/blog/blog-2" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
              阅读全文 →
            </Link>
          </div>
          <div className="p-6 border border-slate-200 rounded-2xl hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <div className="text-sm font-bold text-slate-500 mb-2">下一篇</div>
            <div className="font-semibold text-slate-900 mb-2">Tailwind CSS实战：构建现代化响应式界面</div>
            <Link href="/blog/blog-3" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
              阅读全文 →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 格式化博客内容
 * 将纯文本转换为带段落格式的HTML
 */
const formatBlogContent = (content: string): string => {
  if (!content) return '<p>暂无内容</p>';

  // 简单的格式化：将换行符转换为段落
  const paragraphs = content.split('\n').filter((p) => p.trim());
  return paragraphs.map((p) => `<p>${p}</p>`).join('');
};

export default BlogDetailContent;
