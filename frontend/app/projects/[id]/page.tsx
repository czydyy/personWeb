import React from 'react';
import { notFound } from 'next/navigation';
import { api } from '@/app/services/apiService';
import ProjectDetailContent from '@/app/views/projects/ProjectDetailContent';

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

/**
 * 项目详情页面
 *
 * 动态路由：/projects/[id]
 * 显示单个项目的完整详情
 */
const ProjectDetailPage = async ({ params }: ProjectDetailPageProps) => {
  const { id } = await params;

  // 在服务器端获取项目详情
  const project = await api.projects.getById(id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailContent project={project} />;
};

export default ProjectDetailPage;
