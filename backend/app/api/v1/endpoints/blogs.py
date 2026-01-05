from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import List
import uuid
from datetime import datetime

from app.schemas.blog import BlogPost, BlogPostCreate, BlogPostUpdate, BlogPostList, BlogGenerateRequest
from app.core.security import verify_token
from app.services.ai_service import generate_blog_post

router = APIRouter()
security = HTTPBearer()

# 模拟数据存储（后续替换为数据库）
blogs_db = []


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> dict:
    """验证用户身份"""
    token = credentials.credentials
    payload = verify_token(token)
    
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="令牌无效或已过期"
        )
    
    return payload


@router.get("/", response_model=BlogPostList)
async def get_blogs():
    """获取所有博客文章"""
    # 如果数据库为空，返回一些示例数据
    if not blogs_db:
        from app.schemas.blog import BlogPost
        example_blogs = [
            BlogPost(
                id="blog-1",
                title="现代Web开发趋势：2025年前端技术栈展望",
                excerpt="探讨2025年Web开发的前沿技术，包括React Server Components、Edge Computing和AI驱动的开发工具。",
                content="""<p>随着技术的快速发展，Web开发领域正在经历一场深刻的变革。2025年，我们预计将看到以下几个重要趋势：</p>
<p><strong>1. React Server Components的普及</strong></p>
<p>React Server Components（RSC）正在改变我们构建React应用的方式。通过在服务器端渲染组件，我们可以显著减少客户端JavaScript包的大小，提高首屏加载速度。</p>
<p><strong>2. Edge Computing的兴起</strong></p>
<p>边缘计算将计算资源推向用户更近的地方，减少延迟并提高性能。Vercel、Cloudflare等平台正在推动这一趋势。</p>
<p><strong>3. AI驱动的开发工具</strong></p>
<p>从代码生成到自动化测试，AI正在成为开发者的得力助手。GitHub Copilot等工具已经展示了AI在编程中的巨大潜力。</p>
<p><strong>4. WebAssembly的成熟</strong></p>
<p>WebAssembly使得在浏览器中运行高性能的编译语言成为可能，为Web应用带来了接近原生的性能。</p>
<p>这些趋势将共同塑造未来Web开发的格局，开发者需要不断学习以适应这些变化。</p>""",
                date="2025年3月15日",
                author="Nova",
                tags=["前端开发", "React", "AI", "WebAssembly"],
                coverImage="https://picsum.photos/seed/webdev/1200/600"
            ),
            BlogPost(
                id="blog-2",
                title="使用FastAPI构建高性能Python后端服务",
                excerpt="深入探讨FastAPI框架的核心特性，包括异步支持、自动文档生成和类型提示，以及如何构建可扩展的微服务架构。",
                content="""<p>FastAPI是一个现代、快速（高性能）的Web框架，用于基于标准Python类型提示构建API。它具有以下核心优势：</p>
<p><strong>1. 极快的性能</strong></p>
<p>FastAPI基于Starlette和Pydantic构建，性能接近Node.js和Go。基准测试显示，FastAPI是Python中最快的Web框架之一。</p>
<p><strong>2. 自动API文档</strong></p>
<p>FastAPI自动生成交互式API文档（Swagger UI和ReDoc），基于OpenAPI标准。这大大简化了API的测试和文档维护。</p>
<p><strong>3. 类型提示和验证</strong></p>
<p>利用Python的类型提示，FastAPI提供了自动的数据验证、序列化和文档生成。这减少了大量样板代码。</p>
<p><strong>4. 异步支持</strong></p>
<p>原生支持async/await，使得构建高性能的异步应用变得简单。这对于I/O密集型应用特别重要。</p>
<p><strong>5. 依赖注入系统</strong></p>
<p>强大的依赖注入系统使得代码组织更加模块化，便于测试和维护。</p>
<p>在本文中，我们将通过一个完整的示例项目，展示如何使用FastAPI构建一个完整的RESTful API服务。</p>""",
                date="2025年2月28日",
                author="Nova",
                tags=["Python", "FastAPI", "后端开发", "微服务"],
                coverImage="https://picsum.photos/seed/fastapi/1200/600"
            ),
            BlogPost(
                id="blog-3",
                title="Tailwind CSS实战：构建现代化响应式界面",
                excerpt="分享使用Tailwind CSS构建现代化Web界面的最佳实践，包括设计系统、响应式布局和性能优化技巧。",
                content="""<p>Tailwind CSS是一个功能类优先的CSS框架，它通过组合预定义的类来构建自定义设计。以下是使用Tailwind的一些关键技巧：</p>
<p><strong>1. 设计系统的一致性</strong></p>
<p>通过配置tailwind.config.js文件，可以定义项目的设计令牌（颜色、间距、字体等），确保整个应用的设计一致性。</p>
<p><strong>2. 响应式设计</strong></p>
<p>Tailwind的响应式前缀（sm:, md:, lg:, xl:）使得构建响应式界面变得非常简单。例如：</p>
<pre><code><div class="text-sm md:text-base lg:text-lg">
  响应式文本大小
</div></code></pre>
<p><strong>3. 实用类组合</strong></p>
<p>通过组合多个实用类，可以快速创建复杂的组件，而无需编写自定义CSS。例如：</p>
<pre><code><button class="px-4 py-2 bg-blue-600 text-white rounded-lg
              hover:bg-blue-700 focus:ring-2 focus:ring-blue-500
              transition-colors duration-200">
  按钮
</button></code></pre>
<p><strong>4. 性能优化</strong></p>
<p>使用PurgeCSS（在Tailwind中称为"purge"）可以移除未使用的CSS类，显著减少CSS文件大小。</p>
<p><strong>5. 与组件框架集成</strong></p>
<p>Tailwind与React、Vue、Next.js等现代前端框架完美集成，可以创建可复用的样式化组件。</p>
<p>通过掌握这些技巧，你可以大大提高前端开发效率，同时保持代码的维护性和一致性。</p>""",
                date="2025年1月20日",
                author="Nova",
                tags=["CSS", "Tailwind", "前端设计", "响应式"],
                coverImage="https://picsum.photos/seed/tailwind/1200/600"
            )
        ]
        # 将示例数据添加到数据库，以便后续可以通过ID访问
        blogs_db.extend(example_blogs)
        return BlogPostList(blogs=example_blogs)
    
    return BlogPostList(blogs=blogs_db)


@router.get("/{blog_id}", response_model=BlogPost)
async def get_blog(blog_id: str):
    """获取单篇博客文章"""
    for blog in blogs_db:
        if blog.id == blog_id:
            return blog
    
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="博客文章未找到"
    )


@router.post("/", response_model=BlogPost)
async def create_blog(
    blog: BlogPostCreate,
    current_user: dict = Depends(get_current_user)
):
    """创建新博客文章（需要认证）"""
    new_blog = BlogPost(
        id=str(uuid.uuid4()),
        **blog.dict()
    )
    blogs_db.append(new_blog)
    return new_blog


@router.put("/{blog_id}", response_model=BlogPost)
async def update_blog(
    blog_id: str,
    blog_update: BlogPostUpdate,
    current_user: dict = Depends(get_current_user)
):
    """更新博客文章（需要认证）"""
    for i, blog in enumerate(blogs_db):
        if blog.id == blog_id:
            update_data = blog_update.dict(exclude_unset=True)
            for key, value in update_data.items():
                setattr(blogs_db[i], key, value)
            return blogs_db[i]
    
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="博客文章未找到"
    )


@router.delete("/{blog_id}")
async def delete_blog(
    blog_id: str,
    current_user: dict = Depends(get_current_user)
):
    """删除博客文章（需要认证）"""
    global blogs_db
    initial_length = len(blogs_db)
    blogs_db = [b for b in blogs_db if b.id != blog_id]
    
    if len(blogs_db) == initial_length:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="博客文章未找到"
        )
    
    return {"message": "博客文章删除成功"}


@router.post("/generate")
async def generate_blog(
    request: BlogGenerateRequest,
    current_user: dict = Depends(get_current_user)
):
    """使用AI生成博客文章（需要认证）"""
    try:
        blog_content = generate_blog_post(request.topic, request.style)
        
        # 创建新的博客文章
        new_blog = BlogPost(
            id=str(uuid.uuid4()),
            title=blog_content.get("title", f"关于{request.topic}的博客"),
            excerpt=blog_content.get("excerpt", ""),
            content=blog_content.get("content", ""),
            date=datetime.now().strftime("%Y年%m月%d日"),
            author="Nova (AI生成)",
            tags=blog_content.get("tags", [request.topic, "AI生成"]),
            coverImage=blog_content.get("cover_image", "https://picsum.photos/seed/ai/1200/600")
        )
        
        blogs_db.append(new_blog)
        
        return {
            "message": "博客文章生成成功",
            "blog": new_blog
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"AI生成失败: {str(e)}"
        )