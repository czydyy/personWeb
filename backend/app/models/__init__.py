"""
模型模块初始化
确保所有模型被正确导入和注册
"""

# 导入所有模型，确保它们注册到Base.metadata中
from .blog import BlogPostModel
from .project import ProjectModel

# 导出所有模型
__all__ = [
    "BlogPostModel",
    "ProjectModel",
]