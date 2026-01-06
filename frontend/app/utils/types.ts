// 项目类型
export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  link?: string;
  github?: string;
  content?: string;
  createdAt?: string;
  updatedAt?: string;
}

// 学习经历
export interface StudyExperience {
  id: string;
  period: string;
  description: string[]; // 组件期望字符串数组
  role: string; // 组件使用的别名
  company: string; // 组件使用的别名
}

// 竞赛经历
export interface CompeteExperience {
  id: string;
  description: any[];
  role: string;
}

// 荣誉经历
export interface HonorExperience {
  id: string;
  name: string; // 组件使用的别名
  period: string; // 组件使用的别名
}

// 实习经历
export interface PreWorkExperience {
  id: string;
  company: string;
  period: string;
  description: string[]; // 组件期望字符串数组
  role: string; // 组件使用的别名
}

// 工作经历
export interface WorkExperience {
  id: string;
  company: string;
  period: string;
  description: string[]; // 组件期望字符串数组
  role: string; // 组件使用的别名
}

// 项目经历（与 Project 类似，但可能用于简历）
export interface ProjectExperience {
  id: string;
  name: string;
  description: string[]; // 组件期望字符串数组
  technologies: string[];
}

// 技能
export interface Skill {
  category: string; // 如 "前端", "后端", "工具"
  items: string[]; // 技能项列表
}

// 博客文章
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags: string[];
  date?: string; // 用于显示的日期字符串
  author?: string; // 作者
}
