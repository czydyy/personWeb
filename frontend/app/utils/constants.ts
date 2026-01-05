import {
  Project,
  ProjectExperience,
  StudyExperience,
  CompeteExperience,
  HonorExperience,
  PreWorkExperience,
  WorkExperience,
  Skill,
} from './types';

// 项目数据
export const PROJECTS: Project[] = [
  {
    id: '1',
    title: '个人作品集网站',
    description: '使用 Next.js 和 Tailwind CSS 构建的响应式个人作品集网站，展示项目、博客和简历。',
    imageUrl: '/self-photo.jpg',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    link: 'https://example.com',
    github: 'https://github.com/username/portfolio',
  },
  {
    id: '2',
    title: 'AI 聊天助手',
    description: '集成 Gemini API 的智能聊天助手，能够回答关于个人背景和项目的问题。',
    imageUrl: '/self-photo.jpg',
    tags: ['React', 'Node.js', 'Gemini API'],
    link: 'https://example.com/chat',
    github: 'https://github.com/username/ai-assistant',
  },
];

// 项目经历（用于简历）
export const EXPERIENCE: ProjectExperience[] = [
  {
    id: '1',
    title: '个人作品集网站',
    description: ['使用 Next.js 和 Tailwind CSS 构建的响应式个人作品集网站，展示项目、博客和简历。'],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    period: '2024',
    link: 'https://example.com',
    role: '个人作品集网站',
    company: '个人项目',
  },
  {
    id: '2',
    title: 'AI 聊天助手',
    description: ['集成 Gemini API 的智能聊天助手，能够回答关于个人背景和项目的问题。'],
    technologies: ['React', 'Node.js', 'Gemini API'],
    period: '2024',
    link: 'https://example.com/chat',
    role: 'AI 聊天助手',
    company: '个人项目',
  },
];

// 学习经历
export const STUDY_EXPERIENCE: StudyExperience[] = [
  {
    id: '1',
    school: '清华大学',
    degree: '学士',
    major: '计算机科学与技术',
    period: '2019-2023',
    gpa: '3.8/4.0',
    role: '学士',
    company: '清华大学',
    description: ['专业：计算机科学与技术', 'GPA：3.8/4.0'],
  },
];

// 竞赛经历
export const COMPETE_EXPERIENCE: CompeteExperience[] = [
  {
    id: '1',
    name: '全国大学生程序设计竞赛',
    award: '金奖',
    period: '2022',
    role: '参赛者',
    description: [{ name: '全国大学生程序设计竞赛', period: '2022' }],
  },
];

// 荣誉经历
export const HONOR_EXPERIENCE: HonorExperience[] = [
  {
    id: '1',
    title: '优秀学生奖学金',
    issuer: '清华大学',
    date: '2022',
    name: '优秀学生奖学金',
    period: '2022',
  },
];

// 实习经历
export const PREWORK_EXPERIENCE: PreWorkExperience[] = [
  {
    id: '1',
    company: '字节跳动',
    position: '前端开发实习生',
    period: '2022 夏季',
    description: ['参与抖音前端组件库开发'],
    role: '前端开发实习生',
  },
];

// 工作经历
export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    id: '1',
    company: '某科技公司',
    position: '全栈工程师',
    period: '2023-至今',
    description: ['负责 Web 应用前后端开发'],
    role: '全栈工程师',
  },
];

// 技能
export const SKILLS: Skill[] = [
  { id: '1', category: '前端', items: ['TypeScript', 'React', 'Next.js'] },
  { id: '2', category: '后端', items: ['Python', 'Node.js'] },
  { id: '3', category: '数据库', items: ['PostgreSQL'] },
  { id: '4', category: '工具', items: ['Docker'] },
];
