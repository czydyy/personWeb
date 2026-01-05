from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import List
import uuid

from app.schemas.project import Project, ProjectCreate, ProjectUpdate, ProjectList
from app.core.security import verify_token, get_token_from_header
from app.services.ai_service import generate_project_description

router = APIRouter()
security = HTTPBearer()

# 模拟数据存储（后续替换为数据库）
projects_db = []


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


@router.get("/", response_model=ProjectList)
async def get_projects():
    """获取所有项目"""
    # 如果数据库为空，返回一些示例数据
    if not projects_db:
        from app.schemas.project import Project
        example_projects = [
            Project(
                id="project-1",
                title="智能个人助理Nova",
                description="基于AI的个性化个人助理，集成任务管理、日程规划、智能提醒和自然语言交互功能。",
                content="""<p><strong>项目概述</strong></p>
<p>Nova是一个智能个人助理系统，旨在帮助用户高效管理日常生活和工作。系统集成了多种AI技术，包括自然语言处理、机器学习推荐算法和自动化工作流。</p>
<p><strong>核心功能</strong></p>
<ul>
<li>自然语言任务管理：通过对话式界面创建、管理和完成任务</li>
<li>智能日程规划：自动分析时间冲突，优化日程安排</li>
<li>个性化推荐：基于用户习惯推荐相关内容和提醒</li>
<li>多平台同步：支持Web、移动端和桌面端数据同步</li>
<li>第三方集成：与日历、邮件、待办事项等工具无缝集成</li>
</ul>
<p><strong>技术实现</strong></p>
<p>项目采用微服务架构，前端使用React + TypeScript构建响应式界面，后端使用FastAPI提供RESTful API服务，AI模块基于TensorFlow和Hugging Face模型。</p>
<p><strong>项目成果</strong></p>
<p>系统上线后，用户任务完成率提高了35%，时间管理效率提升了42%。项目获得了2024年创新技术奖。</p>""",
                tags=["AI", "React", "FastAPI", "TypeScript", "TensorFlow"],
                imageUrl="https://picsum.photos/seed/nova/800/600",
                link="https://nova-demo.example.com",
                github="https://github.com/example/nova-assistant"
            ),
            Project(
                id="project-2",
                title="实时数据可视化平台",
                description="企业级数据可视化平台，支持实时数据流处理、多维度分析和交互式仪表板。",
                content="""<p><strong>项目概述</strong></p>
<p>实时数据可视化平台为企业提供强大的数据分析和可视化能力，支持从多种数据源实时获取数据，并通过丰富的图表类型展示分析结果。</p>
<p><strong>核心功能</strong></p>
<ul>
<li>实时数据流处理：支持Kafka、WebSocket等实时数据源</li>
<li>交互式仪表板：拖拽式界面设计，自定义图表布局</li>
<li>多维度分析：支持时间序列、地理空间、关系网络等多种分析维度</li>
<li>团队协作：支持多人协作编辑和分享仪表板</li>
<li>数据导出：支持PDF、Excel、PNG等多种格式导出</li>
</ul>
<p><strong>技术架构</strong></p>
<p>前端使用Vue.js + D3.js构建可视化组件，后端使用Node.js + Express处理数据API，数据存储使用PostgreSQL + Redis缓存，实时通信使用Socket.io。</p>
<p><strong>应用场景</strong></p>
<p>平台已应用于金融监控、物联网数据分析、电商运营监控等多个领域，帮助客户实现数据驱动的决策。</p>""",
                tags=["数据可视化", "Vue.js", "D3.js", "Node.js", "PostgreSQL"],
                imageUrl="https://picsum.photos/seed/dashboard/800/600",
                link="https://dashboard-demo.example.com",
                github="https://github.com/example/data-visualization"
            ),
            Project(
                id="project-3",
                title="微服务电商平台",
                description="基于微服务架构的电商平台，支持商品管理、订单处理、支付集成和用户个性化推荐。",
                content="""<p><strong>项目概述</strong></p>
<p>微服务电商平台是一个完整的电子商务解决方案，采用领域驱动设计（DDD）和微服务架构，确保系统的高可用性和可扩展性。</p>
<p><strong>系统架构</strong></p>
<ul>
<li>用户服务：用户注册、登录、个人信息管理</li>
<li>商品服务：商品分类、搜索、详情展示</li>
<li>订单服务：购物车、订单创建、状态跟踪</li>
<li>支付服务：集成多种支付方式（支付宝、微信支付、信用卡）</li>
<li>推荐服务：基于用户行为的个性化商品推荐</li>
<li>物流服务：订单发货、物流跟踪</li>
</ul>
<p><strong>技术栈</strong></p>
<ul>
<li>服务框架：Spring Boot + Spring Cloud</li>
<li>API网关：Kong Gateway</li>
<li>服务发现：Consul</li>
<li>消息队列：RabbitMQ</li>
<li>数据库：MySQL（主数据）、MongoDB（日志数据）</li>
<li>缓存：Redis</li>
<li>监控：Prometheus + Grafana</li>
</ul>
<p><strong>性能指标</strong></p>
<p>系统支持每秒10,000+并发请求，平均响应时间低于200ms，可用性达到99.99%。</p>""",
                tags=["微服务", "Spring Boot", "Docker", "Kubernetes", "MySQL"],
                imageUrl="https://picsum.photos/seed/ecommerce/800/600",
                link="https://shop-demo.example.com",
                github="https://github.com/example/microservice-ecommerce"
            ),
            Project(
                id="project-4",
                title="跨平台移动应用开发框架",
                description="基于React Native的跨平台移动应用开发框架，提供丰富的UI组件和开发工具，加速移动应用开发。",
                content="""<p><strong>项目概述</strong></p>
<p>跨平台移动应用开发框架旨在解决多平台开发中的一致性和效率问题，提供一套完整的工具链和组件库，帮助开发者快速构建高质量的移动应用。</p>
<p><strong>核心特性</strong></p>
<ul>
<li>丰富的UI组件库：包含200+精心设计的React Native组件</li>
<li>开发工具链：集成调试、热重载、代码生成等工具</li>
<li>主题系统：支持动态主题切换和自定义设计系统</li>
<li>性能优化：内置性能监控和优化建议</li>
<li>插件系统：支持第三方插件扩展</li>
</ul>
<p><strong>技术实现</strong></p>
<p>框架基于React Native构建，使用TypeScript确保类型安全，通过Native Modules与原生平台深度集成。构建系统使用Fastlane自动化部署流程。</p>
<p><strong>社区生态</strong></p>
<p>框架已在GitHub上获得5,000+星标，被100+企业用于生产环境，拥有活跃的开发者社区和详细的文档。</p>""",
                tags=["React Native", "TypeScript", "移动开发", "UI组件"],
                imageUrl="https://picsum.photos/seed/mobile/800/600",
                link="https://mobile-framework.example.com",
                github="https://github.com/example/react-native-framework"
            )
        ]
        # 将示例数据添加到数据库，以便后续可以通过ID访问
        projects_db.extend(example_projects)
        return ProjectList(projects=example_projects)
    
    return ProjectList(projects=projects_db)


@router.get("/{project_id}", response_model=Project)
async def get_project(project_id: str):
    """获取单个项目"""
    for project in projects_db:
        if project.id == project_id:
            return project
    
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="项目未找到"
    )


@router.post("/", response_model=Project)
async def create_project(
    project: ProjectCreate,
    current_user: dict = Depends(get_current_user)
):
    """创建新项目（需要认证）"""
    new_project = Project(
        id=str(uuid.uuid4()),
        **project.dict()
    )
    projects_db.append(new_project)
    return new_project


@router.put("/{project_id}", response_model=Project)
async def update_project(
    project_id: str,
    project_update: ProjectUpdate,
    current_user: dict = Depends(get_current_user)
):
    """更新项目（需要认证）"""
    for i, project in enumerate(projects_db):
        if project.id == project_id:
            update_data = project_update.dict(exclude_unset=True)
            for key, value in update_data.items():
                setattr(projects_db[i], key, value)
            return projects_db[i]
    
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="项目未找到"
    )


@router.delete("/{project_id}")
async def delete_project(
    project_id: str,
    current_user: dict = Depends(get_current_user)
):
    """删除项目（需要认证）"""
    global projects_db
    initial_length = len(projects_db)
    projects_db = [p for p in projects_db if p.id != project_id]
    
    if len(projects_db) == initial_length:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="项目未找到"
        )
    
    return {"message": "项目删除成功"}


@router.post("/generate")
async def generate_project(
    topic: str,
    current_user: dict = Depends(get_current_user)
):
    """使用AI生成项目描述（需要认证）"""
    try:
        description = generate_project_description(topic)
        return {
            "topic": topic,
            "description": description,
            "suggested_tags": ["AI生成", "创新项目", "技术演示"]
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"AI生成失败: {str(e)}"
        )