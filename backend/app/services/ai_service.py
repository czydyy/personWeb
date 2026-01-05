import google.generativeai as genai
from typing import Optional, Dict, Any
import os
from app.core.config import settings


class AIService:
    def __init__(self):
        """初始化AI服务"""
        self.gemini_api_key = settings.gemini_api_key
        self.openai_api_key = settings.openai_api_key
        
        # 初始化Gemini
        if self.gemini_api_key:
            genai.configure(api_key=self.gemini_api_key)
            self.gemini_model = genai.GenerativeModel('gemini-pro')
        else:
            self.gemini_model = None
    
    def generate_blog_post(self, topic: str, style: str = "technical") -> Dict[str, Any]:
        """使用AI生成博客文章"""
        if not self.gemini_model:
            return self._generate_mock_blog_post(topic, style)
        
        try:
            prompt = f"""请以{style}风格写一篇关于{topic}的技术博客文章。
            
            要求：
            1. 生成一个吸引人的标题
            2. 写一段简短的摘要（100字左右）
            3. 写完整的文章内容（500-800字）
            4. 提供3-5个相关的标签
            5. 文章结构清晰，包含引言、主体和结论
            
            请以JSON格式返回，包含以下字段：
            - title: 标题
            - excerpt: 摘要
            - content: 完整内容
            - tags: 标签数组
            - cover_image: 封面图片URL建议
            
            注意：内容要专业、有深度，适合技术博客。"""
            
            response = self.gemini_model.generate_content(prompt)
            
            # 解析响应（这里简化处理，实际需要更复杂的解析）
            content = response.text
            
            # 尝试提取JSON，如果失败则使用模拟数据
            try:
                import json
                # 查找JSON部分
                start = content.find('{')
                end = content.rfind('}') + 1
                if start != -1 and end != 0:
                    json_str = content[start:end]
                    result = json.loads(json_str)
                else:
                    result = self._parse_ai_response(content)
            except:
                result = self._parse_ai_response(content)
            
            return result
            
        except Exception as e:
            print(f"AI生成失败: {e}")
            return self._generate_mock_blog_post(topic, style)
    
    def generate_project_description(self, topic: str) -> str:
        """使用AI生成项目描述"""
        if not self.gemini_model:
            return self._generate_mock_project_description(topic)
        
        try:
            prompt = f"""请为'{topic}'项目生成一个详细的项目描述。
            
            要求：
            1. 描述项目的目标和价值
            2. 说明主要功能和技术特点
            3. 适合技术展示和作品集
            
            描述长度：200-300字"""
            
            response = self.gemini_model.generate_content(prompt)
            return response.text
            
        except Exception as e:
            print(f"AI生成失败: {e}")
            return self._generate_mock_project_description(topic)
    
    def _parse_ai_response(self, content: str) -> Dict[str, Any]:
        """解析AI响应为结构化数据"""
        lines = content.strip().split('\n')
        title = ""
        excerpt = ""
        body_lines = []
        tags = []
        
        for line in lines:
            if line.startswith('标题:') or line.startswith('Title:'):
                title = line.split(':', 1)[1].strip()
            elif line.startswith('摘要:') or line.startswith('Excerpt:'):
                excerpt = line.split(':', 1)[1].strip()
            elif line.startswith('标签:') or line.startswith('Tags:'):
                tag_str = line.split(':', 1)[1].strip()
                tags = [t.strip() for t in tag_str.split(',')]
            else:
                body_lines.append(line)
        
        content_text = '\n'.join(body_lines).strip()
        
        if not title:
            title = "AI生成的博客文章"
        if not excerpt and content_text:
            excerpt = content_text[:100] + "..."
        
        return {
            "title": title,
            "excerpt": excerpt,
            "content": content_text,
            "tags": tags or ["AI生成", "技术博客"],
            "cover_image": "https://picsum.photos/seed/ai/1200/600"
        }
    
    def _generate_mock_blog_post(self, topic: str, style: str) -> Dict[str, Any]:
        """生成模拟的博客文章（当AI服务不可用时）"""
        return {
            "title": f"关于{topic}的{style}风格博客",
            "excerpt": f"这是一篇关于{topic}的{style}风格博客文章，探讨了相关技术和应用场景。",
            "content": f"""
# 关于{topic}的深入探讨

## 引言
{topic}是当前技术领域的一个重要话题。在这篇文章中，我们将深入探讨{topic}的核心概念、技术原理和实际应用。

## 主要内容
1. {topic}的基本概念和定义
2. 相关技术栈和工具
3. 实际应用案例分析
4. 未来发展趋势

## 结论
{topic}作为一项重要技术，在未来将继续发挥重要作用。通过深入理解和掌握相关技术，我们可以更好地应对技术挑战。

*本文为AI生成内容，仅供参考。*
            """,
            "tags": [topic, style, "AI生成", "技术博客"],
            "cover_image": "https://picsum.photos/seed/mock/1200/600"
        }
    
    def _generate_mock_project_description(self, topic: str) -> str:
        """生成模拟的项目描述"""
        return f"""
{topic}项目是一个创新的技术解决方案，旨在解决现实世界中的问题。

项目特点：
- 采用现代化技术栈，确保高性能和可扩展性
- 用户友好的界面设计，提供出色的用户体验
- 模块化架构，便于维护和扩展
- 完善的文档和测试覆盖

技术栈可能包括：React、TypeScript、Python、FastAPI、PostgreSQL等。

这个项目展示了在{topic}领域的技术能力和创新思维。
        """


# 创建全局AI服务实例
ai_service = AIService()


# 导出便捷函数
def generate_blog_post(topic: str, style: str = "technical") -> Dict[str, Any]:
    """生成博客文章的便捷函数"""
    return ai_service.generate_blog_post(topic, style)


def generate_project_description(topic: str) -> str:
    """生成项目描述的便捷函数"""
    return ai_service.generate_project_description(topic)