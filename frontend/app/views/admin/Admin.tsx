'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../../services/apiService';
import { Project, Skill, BlogPost } from '../../lib/types';
import { generateBlogPost } from '../../services/geminiService';

const Admin = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'projects' | 'blogs'>('blogs');

  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!api.auth.isLoggedIn()) {
      router.push('/login');
      return;
    }
    const loadAllData = async () => {
      const [projData, blogData] = await Promise.all([api.projects.getAll(), api.blogs.getAll()]);
      setProjects(projData);
      setBlogs(blogData);
      setLoading(false);
    };
    loadAllData();
  }, [router]);

  const handleLogout = () => {
    api.auth.logout();
    router.push('/');
  };

  const handleGenerateAndSave = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    const post = await generateBlogPost(topic);
    if (post) {
      const newBlog: BlogPost = {
        id: `blog-${Date.now()}`,
        ...post,
        date: new Date().toLocaleDateString('zh-CN'),
        author: 'Nova',
        tags: ['AI 生成', topic],
        coverImage: `https://picsum.photos/seed/${Math.random()}/1200/600`,
      };
      await api.blogs.add(newBlog);
      setBlogs([newBlog, ...blogs]);
      setTopic('');
    }
    setIsGenerating(false);
  };

  const deleteBlog = async (id: string) => {
    if (!confirm('确定要删除这篇文章吗？')) return;
    await api.blogs.delete(id);
    setBlogs(blogs.filter((b) => b.id !== id));
  };

  const deleteProject = async (id: string) => {
    if (!confirm('确定要删除这个项目吗？')) return;
    await api.projects.delete(id);
    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen pt-20 bg-slate-50 flex">
      <aside className="w-64 border-r border-slate-200 bg-white fixed h-full pt-10 px-6">
        <nav className="space-y-2">
          {[
            { id: 'blogs', name: '博客发布', icon: '✍️' },
            { id: 'projects', name: '项目管理', icon: '💻' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="mt-20 w-full text-left px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all"
        >
          🚪 退出系统
        </button>
      </aside>

      <main className="ml-64 flex-1 p-10">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="text-center py-20 text-slate-400 font-bold">连接 Python 后端中...</div>
          ) : activeTab === 'blogs' ? (
            <div className="space-y-8">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900">博客管理</h2>
                  <p className="text-slate-500">通过 Python API 实时管理服务器文章内容。</p>
                </div>
              </div>

              <div className="glass-card !bg-white p-8 rounded-[32px] border border-blue-100">
                <h3 className="text-lg font-bold mb-4 text-blue-900 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  AI 文章一键生成
                </h3>
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="输入话题（后端将自动保存生成内容）..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleGenerateAndSave}
                    disabled={isGenerating}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20"
                  >
                    {isGenerating ? '正在同步后端...' : '立即生成'}
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">标题</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">发布日期</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                        管理操作
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {blogs.map((blog) => (
                      <tr key={blog.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-900">{blog.title}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">{blog.date}</td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => deleteBlog(blog.id)}
                            className="text-red-500 hover:text-red-700 font-bold text-sm px-4 py-2 hover:bg-red-50 rounded-lg transition-all"
                          >
                            删除
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : activeTab === 'projects' ? (
            <div className="space-y-8">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900">项目管理</h2>
                  <p className="text-slate-500">管理个人项目，包括添加、编辑和删除。</p>
                </div>
              </div>

              <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">项目名称</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">描述</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                        管理操作
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {projects.map((project) => (
                      <tr key={project.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-900">{project.title}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">{project.description}</td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => deleteProject(project.id)}
                            className="text-red-500 hover:text-red-700 font-bold text-sm px-4 py-2 hover:bg-red-50 rounded-lg transition-all"
                          >
                            删除
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
};

export default Admin;
