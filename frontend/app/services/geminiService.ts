import { GoogleGenAI, Type } from '@google/genai';
import { PROJECTS, EXPERIENCE, SKILLS } from '../utils/constants';

const API_KEY = process.env.GEMINI_API_KEY || '';

export const getGeminiChatResponse = async (
  userMessage: string,
  history: { role: 'user' | 'model'; parts: { text: string }[] }[]
) => {
  if (!API_KEY) {
    return '未找到 API 密钥。请确保已正确配置。';
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const resumeContext = `
    用户作品集上下文:
    - 工作经验: ${JSON.stringify(EXPERIENCE)}
    - 项目案例: ${JSON.stringify(PROJECTS)}
    - 技能列表: ${JSON.stringify(SKILLS)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        { role: 'user', parts: [{ text: `以下是 Nova 的个人背景信息：${resumeContext}` }] },
        ...history,
        { role: 'user', parts: [{ text: userMessage }] },
      ],
      config: {
        systemInstruction:
          '你现在是 Nova 的 AI 助手。你的职责是回答关于上下文中所列出的 Nova 的专业背景、技能和项目的问题。请保持专业、简洁且友好的语气，并始终使用中文回答。如果问题与作品集无关，请礼貌地将话题引导回 Nova 的工作。',
        temperature: 0.7,
      },
    });

    return response.text || '抱歉，我无法生成回复。';
  } catch (error) {
    console.error('Gemini Error:', error);
    return '出错了，请稍后再试。';
  }
};

export const generateBlogPost = async (topic: string) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `请为个人开发者作品集撰写一篇关于“${topic}”的简短且引人入胜的中文博客文章。包含标题（title）、摘要（excerpt）和完整正文内容（content）。`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            excerpt: { type: Type.STRING },
            content: { type: Type.STRING },
          },
          required: ['title', 'excerpt', 'content'],
        },
      },
    });
    const text = response.text;
    if (!text) {
      throw new Error('No text in response');
    }
    return JSON.parse(text);
  } catch (error) {
    console.error('Blog Generation Error:', error as Error);
    return null;
  }
};
