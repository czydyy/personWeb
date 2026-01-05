from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import uvicorn
import time
from typing import Callable

from app.core.config import settings
from app.core.logging import configure_logging, get_logger, get_request_logger
from app.db.session import init_db
from app.api.v1.endpoints import auth, projects, blogs, resume

# 配置日志系统
configure_logging()
logger = get_logger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """应用生命周期管理"""
    # 启动时初始化日志
    logger.info("应用启动", app_name=settings.app_name, version=settings.app_version)
    
    # 初始化数据库
    logger.info("初始化数据库...")
    init_db()
    logger.info("数据库初始化完成")
    
    yield
    
    # 关闭时清理资源
    logger.info("应用关闭")


# 创建FastAPI应用
app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="Nova个人作品集后台API",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# 请求日志中间件
@app.middleware("http")
async def log_requests(request: Request, call_next: Callable):
    """记录HTTP请求和响应的中间件"""
    start_time = time.time()
    
    # 获取客户端信息
    client_ip = request.client.host if request.client else "unknown"
    user_agent = request.headers.get("user-agent", "unknown")
    
    # 记录请求
    get_request_logger().log_request(
        method=request.method,
        url=str(request.url),
        client_ip=client_ip,
        user_agent=user_agent,
    )
    
    # 处理请求
    response = await call_next(request)
    
    # 计算处理时间
    process_time = (time.time() - start_time) * 1000
    
    # 记录响应
    get_request_logger().log_response(
        method=request.method,
        url=str(request.url),
        status_code=response.status_code,
        duration_ms=round(process_time, 2),
        client_ip=client_ip,
    )
    
    # 添加处理时间到响应头
    response.headers["X-Process-Time"] = str(process_time)
    
    return response


# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=settings.allowed_methods,
    allow_headers=settings.allowed_headers,
)

# 注册API路由
app.include_router(auth.router, prefix="/api/auth", tags=["认证"])
app.include_router(projects.router, prefix="/api/projects", tags=["项目管理"])
app.include_router(blogs.router, prefix="/api/blogs", tags=["博客管理"])
app.include_router(resume.router, prefix="/api/resume", tags=["简历管理"])


@app.get("/")
async def root(request: Request):
    """根路径，返回API信息"""
    logger.info("根端点被访问", client_ip=request.client.host if request.client else "unknown")
    return {
        "app": settings.app_name,
        "version": settings.app_version,
        "docs": "/docs",
        "endpoints": {
            "auth": "/api/auth",
            "projects": "/api/projects",
            "blogs": "/api/blogs",
            "resume": "/api/resume"
        }
    }


@app.get("/health")
async def health_check():
    """健康检查端点"""
    logger.debug("健康检查被调用")
    return {"status": "healthy", "service": settings.app_name}


if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.debug,
        log_level="info"
    )