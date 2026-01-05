import structlog
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .base import Base
from app.core.config import settings

# 导入所有模型，确保它们注册到Base.metadata中
from app.models.blog import BlogPostModel
from app.models.project import ProjectModel

# 创建数据库引擎 - 只使用PostgreSQL
engine = create_engine(
    settings.database_url,
    pool_pre_ping=True,  # 连接前ping检查
    pool_recycle=3600,   # 连接回收时间（秒）
)

# 创建会话工厂
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    """获取数据库会话的依赖函数"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    """初始化数据库，创建所有表"""
    try:
        Base.metadata.create_all(bind=engine)
        logger = structlog.get_logger(__name__)
        logger.info("数据库表创建成功")
    except Exception as e:
        logger = structlog.get_logger(__name__)
        logger.error(f"数据库表创建失败: {e}")
        
        # 检查是否是权限错误
        if "permission denied for schema public" in str(e):
            logger.error("""
            ⚠️ 数据库权限错误！
            当前用户没有在 public schema 中创建表的权限。
            
            解决方案：
            1. 联系数据库管理员，为当前用户授予以下权限：
               GRANT CREATE ON SCHEMA public TO per_web_user;
               GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO per_web_user;
            
            2. 或者使用具有足够权限的数据库用户
            
            3. 或者手动创建表（使用提供的SQL脚本）
            """)
        raise