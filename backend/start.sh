#!/bin/bash

# Nova后台启动脚本 - 专为PostgreSQL优化

set -e

echo "========================================"
echo "Nova个人作品集后台启动脚本 (PostgreSQL)"
echo "========================================"

# 检查Python版本
echo "检查Python版本..."
python --version

# 检查是否在虚拟环境中
if [ -z "$VIRTUAL_ENV" ]; then
    echo "警告：不在虚拟环境中，建议使用虚拟环境"
    read -p "是否继续？(y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "退出脚本"
        exit 1
    fi
fi

# 安装依赖
echo "安装Python依赖..."
pip install -r requirements.txt

# 创建环境文件（如果不存在）
if [ ! -f ".env" ]; then
    echo "创建.env文件..."
    cp .env.example .env
    echo "请编辑.env文件配置您的环境变量"
    echo "重要：确保DATABASE_URL指向正确的PostgreSQL实例"
fi

# 检查数据库连接
echo "检查数据库配置..."
if python -c "
import os
from app.core.config import settings
db_url = settings.database_url
print(f'数据库URL: {db_url}')
if 'sqlite' in db_url:
    print('警告：检测到SQLite配置，建议使用PostgreSQL')
    print('请修改.env文件中的DATABASE_URL为PostgreSQL连接字符串')
    exit(1)
"; then
    echo "数据库配置检查通过"
else
    echo "数据库配置检查失败，请检查配置"
    exit 1
fi

# 初始化数据库
echo "初始化数据库..."
python -c "from app.db.session import init_db; init_db()"
echo "数据库初始化完成"

# 启动服务
echo "启动Nova后台服务..."
echo "API文档：http://localhost:8000/docs"
echo "健康检查：http://localhost:8000/health"
echo "数据库：PostgreSQL (默认配置)"
echo "按Ctrl+C停止服务"

uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload