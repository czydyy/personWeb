import React from 'react';
import { notFound } from 'next/navigation';
import { api } from '@/app/services/apiService';
import BlogDetailContent from '@/app/views/blog/BlogDetailContent';

interface BlogDetailPageProps {
  params: Promise<{ id: string }>;
}

/**
 * 博客文章详情页面
 *
 * 动态路由：/blog/[id]
 * 显示单篇博客文章的完整内容
 */
const BlogDetailPage = async ({ params }: BlogDetailPageProps) => {
  const { id } = await params;

  // 在服务器端获取博客文章详情
  const blog = await api.blogs.getById(id);

  if (!blog) {
    notFound();
  }

  return <BlogDetailContent blog={blog} />;
};

export default BlogDetailPage;
