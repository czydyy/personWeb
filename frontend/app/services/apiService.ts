import {
  Project,
  StudyExperience,
  CompeteExperience,
  HonorExperience,
  PreWorkExperience,
  WorkExperience,
  ProjectExperience,
  BlogPost,
  Skill,
} from '../utils/types';
import {
  EXPERIENCE,
  STUDY_EXPERIENCE,
  COMPETE_EXPERIENCE,
  HONOR_EXPERIENCE,
  PREWORK_EXPERIENCE,
  WORK_EXPERIENCE,
  SKILLS,
} from '../utils/constants';

const API_BASE = 'http://localhost:8000/api';

// 模拟 Token，实际应存入 Cookie 或更安全的地方
const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('nova_admin_token')}`,
});

// 辅助函数：检查网络错误，返回静态数据
const withFallback = async <T>(fetchPromise: Promise<Response>, fallbackData: T): Promise<T> => {
  try {
    const res = await fetchPromise;
    if (res.ok) {
      return await res.json();
    }
    console.warn(`API request failed (${res.status}), using fallback data`);
    return fallbackData;
  } catch (error) {
    console.warn('Network error, using fallback data:', error);
    return fallbackData;
  }
};

export const api = {
  // 身份验证
  auth: {
    login: async (password: string): Promise<boolean> => {
      try {
        const res = await fetch(`${API_BASE}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password }),
        });
        if (res.ok) {
          const data = await res.json();
          localStorage.setItem('nova_admin_token', data.token);
          return true;
        }
        return false;
      } catch (e) {
        console.error('Login failed', e);
        return false;
      }
    },
    logout: () => localStorage.removeItem('nova_admin_token'),
    isLoggedIn: () => !!localStorage.getItem('nova_admin_token'),
  },

  // 项目管理
  projects: {
    getAll: async (): Promise<Project[]> => {
      const data = await withFallback(fetch(`${API_BASE}/projects`), { projects: [] });
      return data.projects || [];
    },
    getById: async (id: string): Promise<Project | null> => {
      try {
        const res = await fetch(`${API_BASE}/projects/${id}`);
        if (res.ok) {
          return await res.json();
        }
        console.warn(`项目详情获取失败 (${res.status})`);
        return null;
      } catch (error) {
        console.warn('网络错误，无法获取项目详情:', error);
        return null;
      }
    },
    save: async (projects: Project[]) => {
      await fetch(`${API_BASE}/projects`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(projects),
      });
    },
    delete: async (id: string) => {
      await fetch(`${API_BASE}/projects/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
    },
  },

  // 经历与技能管理
  resume: {
    getData: async (): Promise<{
      studyExperience: StudyExperience[];
      competeExperience: CompeteExperience[];
      honorExperience: HonorExperience[];
      preWorkExperience: PreWorkExperience[];
      workExperience: WorkExperience[];
      projectExperience: ProjectExperience[];
      skills: Skill[];
    }> => {
      return {
        studyExperience: STUDY_EXPERIENCE,
        competeExperience: COMPETE_EXPERIENCE,
        honorExperience: HONOR_EXPERIENCE,
        preWorkExperience: PREWORK_EXPERIENCE,
        workExperience: WORK_EXPERIENCE,
        projectExperience: EXPERIENCE,
        skills: SKILLS,
      };
    },
  },

  // 博客管理
  blogs: {
    getAll: async (): Promise<BlogPost[]> => {
      const data = await withFallback(fetch(`${API_BASE}/blogs`), { blogs: [] });
      return data.blogs || [];
    },
    getById: async (id: string): Promise<BlogPost | null> => {
      try {
        const res = await fetch(`${API_BASE}/blogs/${id}`);
        if (res.ok) {
          return await res.json();
        }
        console.warn(`博客详情获取失败 (${res.status})`);
        return null;
      } catch (error) {
        console.warn('网络错误，无法获取博客详情:', error);
        return null;
      }
    },
    add: async (blog: BlogPost) => {
      await fetch(`${API_BASE}/blogs`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(blog),
      });
    },
    delete: async (id: string) => {
      await fetch(`${API_BASE}/blogs/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
    },
  },
};
