'use client';

import React from 'react';

interface ProjectLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  className?: string;
}

const ProjectLink = ({ href, label, icon, className = '' }: ProjectLinkProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 防止事件冒泡到外层 Link
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 text-sm font-bold transition-colors ${className}`}
      aria-label={`${label}（在新窗口中打开）`}
      type="button"
    >
      {label}
      {icon}
    </button>
  );
};

export default ProjectLink;
