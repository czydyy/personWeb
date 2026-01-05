from pydantic_settings import BaseSettings
from typing import List, Optional
import os
from pathlib import Path


class Settings(BaseSettings):
    # 应用配置
    app_name: str = "Nova Backend"
    app_version: str = "1.0.0"
    debug: bool = True
    
    # 安全配置
    secret_key: str = "your-secret-key-here-change-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # 数据库配置 - 统一使用PostgreSQL
    database_url: str = "postgresql://nova:nova_password@localhost:5432/nova_db"
    
    # CORS配置
    allowed_origins: List[str] = ["http://localhost:3000", "http://localhost:5173"]
    allowed_methods: List[str] = ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    allowed_headers: List[str] = ["*"]
    
    # AI服务配置
    gemini_api_key: Optional[str] = None
    openai_api_key: Optional[str] = None
    
    # 管理员配置
    admin_password: str = "admin123"
    
    # 日志配置
    log_level: str = "INFO"
    log_to_file: bool = True
    log_file_path: str = "logs/app.log"
    log_max_size_mb: int = 10  # 每个日志文件最大10MB
    log_backup_count: int = 5  # 保留5个备份文件
    log_rotation_when: str = "midnight"  # 按天轮转
    
    class Config:
        env_file = ".env"
        case_sensitive = False


# 创建全局配置实例
settings = Settings()