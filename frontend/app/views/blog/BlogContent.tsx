import React from 'react';
import { api } from '../../services/apiService';

/**
 * BlogContent 组件 - 显示博客文章列表
 *
 * 这是一个服务器组件，负责：
 * 1. 在服务器端从API获取博客文章数据
 * 2. 渲染博客文章列表
 * 3. 处理博客文章的展示
 */
const BlogContent = async () => {
  try {
    // 在服务器端获取数据
    const posts = (await api.blogs.getAll()) || [];
    return (
      <div className="pt-24 pb-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h1 className="text-4xl font-bold mb-4 text-slate-900">技术博客</h1>
          <p className="text-slate-600 mb-8 text-lg">关于软件工程、人工智能和产品构建的思考。</p>
        </div>

        <div className="space-y-20">
          {posts.length === 0 ? (
            <div className="text-center py-20 text-slate-400">暂无文章</div>
          ) : (
            posts.map((post) => (
              <a key={post.id} href={`/blog/${post.id}`} className="block group cursor-pointer">
                <article className="group-hover:scale-[1.02] transition-transform duration-300">
                  <div className="mb-6 overflow-hidden rounded-[32px] aspect-[16/9] bg-slate-200 shadow-xl shadow-slate-200/50">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="flex items-center gap-4 text-sm font-bold text-slate-500 mb-4 uppercase tracking-widest">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span className="text-blue-600">{post.author}</span>
                  </div>
                  <h2 className="text-3xl font-extrabold mb-4 text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-lg mb-6">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-bold px-3 py-1 bg-slate-100 rounded-full text-slate-600 border border-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </a>
            ))
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('获取博客文章失败:', error);

    // 错误处理：显示错误信息
    return (
      <div className="pt-24 pb-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h1 className="text-4xl font-bold mb-4 text-slate-900">技术博客</h1>
          <p className="text-slate-600 mb-8 text-lg">关于软件工程、人工智能和产品构建的思考。</p>
        </div>
        <div className="text-center py-20">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">加载失败</h2>
          <p className="text-slate-600 mb-8">加载博客文章失败，请稍后重试。</p>
          <a
            href="/blog"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-colors"
          >
            刷新页面
          </a>
        </div>
      </div>
    );
  }
};

export default BlogContent;
