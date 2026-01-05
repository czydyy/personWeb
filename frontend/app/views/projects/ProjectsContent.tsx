import React from 'react';
import Link from 'next/link';
import { api } from '../../services/apiService';
import { Project } from '../../utils/types';
import ProjectLink from './ProjectLink';

/**
 * ProjectsContent 组件 - 显示项目列表
 *
 * 这是一个服务器组件，负责：
 * 1. 在服务器端从API获取项目数据
 * 2. 渲染项目网格布局
 * 3. 处理项目卡片的展示
 */
const ProjectsContent = async () => {
  try {
    // 在服务器端获取数据
    const projects = await api.projects.getAll();
    return (
      <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-slate-900">项目案例</h1>
          <p className="text-slate-600 max-w-2xl text-lg leading-relaxed">
            这是我近期在 Web 平台、数据工具和 AI 实验方面的作品集合。
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">暂无项目数据</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`} className="block group">
                <ProjectCard project={project} />
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('获取项目数据失败:', error);

    // 错误处理：显示错误信息（服务器组件中不能使用 onClick）
    return (
      <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-slate-900">项目案例</h1>
          <p className="text-slate-600 max-w-2xl text-lg leading-relaxed">
            这是我近期在 Web 平台、数据工具和 AI 实验方面的作品集合。
          </p>
        </div>
        <div className="text-center py-20">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">加载失败</h2>
          <p className="text-slate-600 mb-8">加载项目数据失败，请稍后重试。</p>
          <a
            href="/projects"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-colors"
          >
            刷新页面
          </a>
        </div>
      </div>
    );
  }
};

/**
 * ProjectCard 组件 - 单个项目卡片
 */
interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="glass-card !bg-white rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all border border-slate-100 flex flex-col group">
      <div className="h-56 overflow-hidden relative">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
      </div>
      <div className="p-8 flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-3 text-slate-900">{project.title}</h3>
        <p className="text-slate-600 text-sm mb-6 flex-1 leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] uppercase tracking-widest font-bold px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-6">
          {project.link && (
            <ProjectLink
              href={project.link}
              label="查看演示"
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              }
              className="text-blue-600 hover:text-blue-800"
            />
          )}
          {project.github && (
            <ProjectLink
              href={project.github}
              label="源代码"
              icon={
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              }
              className="text-slate-500 hover:text-slate-900"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsContent;
