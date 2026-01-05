"""
Nova后台日志配置模块

基于structlog的结构化日志系统，支持：
1. 结构化JSON日志输出（生产环境）
2. 彩色控制台输出（开发环境）
3. 文件日志输出（带轮转）
4. 请求/响应日志记录
5. 错误追踪和上下文信息
"""

import logging
import logging.handlers
import sys
import os
from pathlib import Path
from typing import Dict, Any, Optional, List
from datetime import datetime

import structlog
from pythonjsonlogger import jsonlogger

from .config import settings


def configure_logging() -> None:
    """配置应用程序日志系统"""
    
    # 清除现有处理器
    logging.getLogger().handlers.clear()
    
    # 配置日志级别
    log_level = getattr(logging, settings.log_level.upper(), logging.INFO)
    
    # 创建日志目录
    if settings.log_to_file:
        log_dir = Path(settings.log_file_path).parent
        log_dir.mkdir(parents=True, exist_ok=True)
    
    # 配置基础logging处理器
    root_logger = logging.getLogger()
    root_logger.setLevel(log_level)
    
    # 清除现有处理器
    root_logger.handlers.clear()
    
    # 创建控制台处理器
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(log_level)
    
    # 根据环境选择控制台输出格式
    if settings.debug:
        # 开发环境：简单格式
        console_formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            datefmt='%Y-%m-%d %H:%M:%S'
        )
    else:
        # 生产环境：JSON格式
        console_formatter = jsonlogger.JsonFormatter(
            '%(asctime)s %(name)s %(levelname)s %(message)s'
        )
    
    console_handler.setFormatter(console_formatter)
    root_logger.addHandler(console_handler)
    
    # 创建文件处理器（如果启用）
    if settings.log_to_file:
        try:
            # 使用RotatingFileHandler进行日志轮转
            file_handler = logging.handlers.RotatingFileHandler(
                filename=settings.log_file_path,
                maxBytes=settings.log_max_size_mb * 1024 * 1024,  # 转换为字节
                backupCount=settings.log_backup_count,
                encoding='utf-8'
            )
            file_handler.setLevel(log_level)
            
            # 文件日志总是使用JSON格式
            file_formatter = jsonlogger.JsonFormatter(
                '%(asctime)s %(name)s %(levelname)s %(message)s %(pathname)s %(lineno)d'
            )
            file_handler.setFormatter(file_formatter)
            root_logger.addHandler(file_handler)
            
            # 记录日志文件位置
            console_handler_only = logging.StreamHandler(sys.stdout)
            console_handler_only.setLevel(logging.INFO)
            console_handler_only.setFormatter(logging.Formatter('%(message)s'))
            temp_logger = logging.getLogger('logging_init')
            temp_logger.addHandler(console_handler_only)
            temp_logger.info(f"日志文件已配置: {settings.log_file_path}")
            temp_logger.handlers.clear()
            
        except Exception as e:
            # 如果文件日志配置失败，只使用控制台日志
            error_handler = logging.StreamHandler(sys.stderr)
            error_handler.setLevel(logging.ERROR)
            error_handler.setFormatter(logging.Formatter('%(asctime)s - LOG CONFIG ERROR - %(message)s'))
            root_logger.addHandler(error_handler)
            root_logger.error(f"无法配置文件日志: {e}")
    
    # 配置structlog处理器
    processors = [
        structlog.stdlib.filter_by_level,
        structlog.stdlib.add_logger_name,
        structlog.stdlib.add_log_level,
        structlog.stdlib.PositionalArgumentsFormatter(),
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.StackInfoRenderer(),
        structlog.processors.format_exc_info,
        structlog.processors.UnicodeDecoder(),
    ]
    
    # 根据环境选择输出格式
    if settings.debug:
        # 开发环境：彩色控制台输出
        processors.append(structlog.dev.ConsoleRenderer())
    else:
        # 生产环境：JSON格式输出
        processors.append(structlog.processors.JSONRenderer())
    
    # 配置structlog
    structlog.configure(
        processors=processors,
        context_class=dict,
        logger_factory=structlog.stdlib.LoggerFactory(),
        wrapper_class=structlog.stdlib.BoundLogger,
        cache_logger_on_first_use=True,
    )
    
    # 配置第三方库日志级别
    configure_third_party_loggers()


def configure_third_party_loggers() -> None:
    """配置第三方库的日志级别"""
    
    # 设置SQLAlchemy日志级别
    sqlalchemy_logger = logging.getLogger("sqlalchemy.engine")
    sqlalchemy_logger.setLevel(logging.WARNING)
    
    # 设置Uvicorn日志级别
    uvicorn_logger = logging.getLogger("uvicorn")
    uvicorn_logger.setLevel(logging.INFO)
    
    # 设置其他可能嘈杂的日志器
    noisy_loggers = [
        "uvicorn.access",
        "uvicorn.error",
        "fastapi",
        "httpx",
        "httpcore",
    ]
    
    for logger_name in noisy_loggers:
        logger = logging.getLogger(logger_name)
        logger.setLevel(logging.WARNING if settings.debug else logging.INFO)


def get_logger(name: Optional[str] = None) -> structlog.stdlib.BoundLogger:
    """
    获取配置好的日志记录器
    
    Args:
        name: 日志记录器名称，默认为调用模块名称
        
    Returns:
        配置好的structlog日志记录器
    """
    if name is None:
        # 获取调用模块的名称
        import inspect
        frame = inspect.currentframe().f_back
        name = frame.f_globals.get('__name__', 'unknown')
    
    return structlog.get_logger(name)


class RequestLogger:
    """HTTP请求日志记录器"""
    
    @staticmethod
    def log_request(
        method: str,
        url: str,
        client_ip: str,
        user_agent: str,
        user_id: Optional[str] = None,
        **kwargs
    ) -> None:
        """记录HTTP请求"""
        logger = get_logger("request")
        log_data = {
            "method": method,
            "url": url,
            "client_ip": client_ip,
            "user_agent": user_agent,
        }
        
        if user_id:
            log_data["user_id"] = user_id
        
        log_data.update(kwargs)
        logger.info("HTTP请求", **log_data)
    
    @staticmethod
    def log_response(
        method: str,
        url: str,
        status_code: int,
        duration_ms: float,
        client_ip: str,
        **kwargs
    ) -> None:
        """记录HTTP响应"""
        logger = get_logger("request")
        log_data = {
            "method": method,
            "url": url,
            "status_code": status_code,
            "duration_ms": duration_ms,
            "client_ip": client_ip,
        }
        
        log_data.update(kwargs)
        
        # 根据状态码选择日志级别
        if status_code >= 500:
            logger.error("HTTP响应错误", **log_data)
        elif status_code >= 400:
            logger.warning("HTTP客户端错误", **log_data)
        else:
            logger.info("HTTP响应成功", **log_data)


class DatabaseLogger:
    """数据库操作日志记录器"""
    
    @staticmethod
    def log_query(
        operation: str,
        table: str,
        duration_ms: float,
        rows_affected: Optional[int] = None,
        **kwargs
    ) -> None:
        """记录数据库查询"""
        logger = get_logger("database")
        log_data = {
            "operation": operation,
            "table": table,
            "duration_ms": duration_ms,
            "event": "database_query",
        }
        
        if rows_affected is not None:
            log_data["rows_affected"] = rows_affected
        
        log_data.update(kwargs)
        logger.debug("数据库查询", **log_data)
    
    @staticmethod
    def log_error(
        operation: str,
        table: str,
        error: str,
        **kwargs
    ) -> None:
        """记录数据库错误"""
        logger = get_logger("database")
        log_data = {
            "operation": operation,
            "table": table,
            "error": error,
            "event": "database_error",
        }
        
        log_data.update(kwargs)
        logger.error("数据库错误", **log_data)


class AILogger:
    """AI服务日志记录器"""
    
    @staticmethod
    def log_request(
        service: str,
        model: str,
        prompt_length: int,
        **kwargs
    ) -> None:
        """记录AI服务请求"""
        logger = get_logger("ai")
        log_data = {
            "service": service,
            "model": model,
            "prompt_length": prompt_length,
        }
        
        log_data.update(kwargs)
        logger.info("AI服务请求", **log_data)
    
    @staticmethod
    def log_response(
        service: str,
        model: str,
        duration_ms: float,
        response_length: int,
        **kwargs
    ) -> None:
        """记录AI服务响应"""
        logger = get_logger("ai")
        log_data = {
            "service": service,
            "model": model,
            "duration_ms": duration_ms,
            "response_length": response_length,
            "event": "ai_response",
        }
        
        log_data.update(kwargs)
        logger.info("AI服务响应", **log_data)
    
    @staticmethod
    def log_error(
        service: str,
        model: str,
        error: str,
        **kwargs
    ) -> None:
        """记录AI服务错误"""
        logger = get_logger("ai")
        log_data = {
            "service": service,
            "model": model,
            "error": error,
        }
        
        log_data.update(kwargs)
        logger.error("AI服务错误", **log_data)


# 全局日志记录器实例
request_logger = RequestLogger()
database_logger = DatabaseLogger()
ai_logger = AILogger()

# 快捷函数
def get_request_logger() -> RequestLogger:
    return request_logger

def get_database_logger() -> DatabaseLogger:
    return database_logger

def get_ai_logger() -> AILogger:
    return ai_logger


def get_log_file_info() -> Dict[str, Any]:
    """
    获取日志文件信息
    
    Returns:
        包含日志文件信息的字典
    """
    log_path = Path(settings.log_file_path)
    info = {
        "enabled": settings.log_to_file,
        "path": str(log_path.absolute()),
        "directory": str(log_path.parent.absolute()),
        "max_size_mb": settings.log_max_size_mb,
        "backup_count": settings.log_backup_count,
        "exists": log_path.exists(),
    }
    
    if log_path.exists():
        info["size_mb"] = log_path.stat().st_size / (1024 * 1024)
        info["modified"] = datetime.fromtimestamp(log_path.stat().st_mtime).isoformat()
    
    # 检查备份文件
    backup_files = []
    for i in range(1, settings.log_backup_count + 1):
        backup_path = Path(f"{settings.log_file_path}.{i}")
        if backup_path.exists():
            backup_files.append({
                "path": str(backup_path.absolute()),
                "size_mb": backup_path.stat().st_size / (1024 * 1024)
            })
    
    info["backup_files"] = backup_files
    info["backup_count_actual"] = len(backup_files)
    
    return info


def ensure_log_directory() -> bool:
    """
    确保日志目录存在
    
    Returns:
        是否成功创建或确认目录存在
    """
    try:
        log_dir = Path(settings.log_file_path).parent
        log_dir.mkdir(parents=True, exist_ok=True)
        return True
    except Exception as e:
        logger = get_logger(__name__)
        logger.error(f"无法创建日志目录: {e}")
        return False