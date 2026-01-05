# Nova 个人作品集后台

基于 Python FastAPI 的现代化个人作品集后台 API，为前端 React 应用提供数据支持和 AI 集成功能。

## 🚀 特性

- **现代化 API 架构**：基于 FastAPI，支持异步，自动生成 OpenAPI 文档
- **完整的数据管理**：项目、博客、简历数据的 CRUD 操作
- **AI 集成**：支持 Google Gemini API 生成博客内容和项目描述
- **JWT 认证**：安全的 API 访问控制
- **数据库支持**：PostgreSQL
- **容器化部署**：支持 Docker 和 Docker Compose
- **CORS 支持**：完美支持前后端分离架构
- **高级日志系统**：结构化日志，同时输出到控制台和文件，支持日志轮转

## 🛠️ 技术栈

### 核心框架

- **FastAPI** - 高性能 Python Web 框架
- **Pydantic** - 数据验证和序列化
- **SQLAlchemy** - ORM 框架
- **Alembic** - 数据库迁移

### 数据库

- **PostgreSQL** - 统一使用 PostgreSQL 数据库

### 认证与安全

- **JWT** - JSON Web Tokens 认证
- **Passlib** - 密码哈希
- **CORS 中间件** - 跨域资源共享

### AI 集成

- **Google Gemini API** - 大语言模型服务
- **OpenAI API** - 备选 AI 服务

### 开发工具

- **Pytest** - 单元测试
- **Black** - 代码格式化
- **Flake8** - 代码风格检查
- **MyPy** - 静态类型检查

### 日志系统

- **Structlog** - 结构化日志框架
- **Python JSON Logger** - JSON 格式日志输出
- **RotatingFileHandler** - 日志文件轮转

## 📁 项目结构

```
backend/
├── app/
│   ├── api/              # API路由
│   │   └── v1/
│   │       └── endpoints/
│   │           ├── auth.py      # 认证端点
│   │           ├── projects.py  # 项目管理
│   │           ├── blogs.py     # 博客管理
│   │           └── resume.py    # 简历管理
│   ├── core/             # 核心配置
│   │   ├── config.py     # 应用配置
│   │   ├── logging.py    # 日志系统配置
│   │   └── security.py   # 安全相关
│   ├── crud/             # 数据库操作
│   │   └── base.py       # CRUD基类
│   ├── db/               # 数据库
│   │   ├── base.py       # SQLAlchemy基类
│   │   └── session.py    # 数据库会话
│   ├── models/           # 数据模型
│   │   ├── project.py    # 项目模型
│   │   └── blog.py       # 博客模型
│   ├── schemas/          # Pydantic模型
│   │   ├── project.py    # 项目模式
│   │   ├── blog.py       # 博客模式
│   │   ├── auth.py       # 认证模式
│   │   └── resume.py     # 简历模式
│   ├── services/         # 业务逻辑
│   │   └── ai_service.py # AI服务
│   └── main.py           # 应用入口
├── tests/                # 测试文件
├── requirements.txt      # Python依赖
├── Dockerfile           # Docker配置
├── docker-compose.yml   # Docker Compose配置
├── .env.example         # 环境变量示例
└── README.md            # 本文档
```

## 🚦 快速开始

### 环境要求

- Python 3.9+
- pip（Python 包管理器）
- Git
- PostgreSQL 数据库（本地或远程）

### 安装步骤

1. **克隆项目**

   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **创建虚拟环境（推荐）**

   ```bash
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # Linux/Mac
   source venv/bin/activate
   ```

3. **安装依赖**

   ```bash
   pip install -r requirements.txt
   ```

4. **配置环境变量**

   ```bash
   cp .env.example .env
   # 编辑.env文件，配置您的API密钥和其他设置
   ```

5. **数据库设置**

   **重要：数据库权限配置**

   应用程序需要数据库用户具有在 `public` schema 中创建表的权限。如果遇到权限错误，请执行以下操作之一：

   **选项 A：授予权限（需要数据库管理员权限）**

   ```sql
   -- 以超级用户身份运行以下SQL
   GRANT CREATE ON SCHEMA public TO your_username;
   GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_username;
   ```

   **选项 B：手动创建表**

   ```bash
   # 使用提供的SQL脚本手动创建表
   psql -h your_host -U your_username -d your_database -f create_tables_manually.sql
   ```

   **选项 C：使用 Docker Compose（推荐用于开发）**

   ```bash
   docker-compose up -d
   ```

6. **启动服务**

   ```bash
   # 使用启动脚本
   chmod +x start.sh
   ./start.sh

   # 或直接运行
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```

7. **访问 API 文档**
   - Swagger UI: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

## 📊 测试数据

数据库表创建成功后，您可能需要添加一些测试数据来验证应用程序功能。我们提供了测试数据生成工具：

### 生成测试数据

1. **安装额外依赖**（如果需要）：

   ```bash
   pip install faker
   ```

2. **运行测试数据生成脚本**：

   ```bash
   # 自动生成测试数据（非交互式）
   python seed_data_auto.py

   # 或使用交互式版本
   python seed_test_data.py
   ```

3. **验证测试数据**：

   ```bash
   # 检查数据库状态
   python check_db_status.py

   # 查看测试数据详情
   python verify_test_data.py
   ```

### 测试数据内容

生成的测试数据包括：

- **博客文章**：10 篇中文博客，包含标题、作者、内容、标签、封面图片等
- **项目**：8 个示例项目，包含标题、描述、技术标签、GitHub 链接、演示链接等

### 其他实用工具

- `check_tables.py` - 诊断数据库表创建问题
- `create_tables_manually.sql` - 手动创建表的 SQL 脚本
- `grant_permissions.sql` - 授予数据库权限的 SQL 脚本

## 🔧 配置说明

### 环境变量

复制`.env.example`为`.env`并配置以下变量：

```env
# 应用配置
APP_NAME="Nova Backend"
DEBUG=True
SECRET_KEY="your-secret-key-here-change-in-production"

# 数据库配置 - 只使用PostgreSQL
# 格式: postgresql://用户名:密码@主机:端口/数据库名
# 示例: postgresql://nova:nova_password@localhost:5432/nova_db

# AI服务配置
GEMINI_API_KEY="your-gemini-api-key-here"

# 管理员配置
ADMIN_PASSWORD="admin123"

# 日志配置
LOG_LEVEL="INFO"                    # 日志级别: DEBUG, INFO, WARNING, ERROR
LOG_TO_FILE="True"                  # 是否输出到文件
LOG_FILE_PATH="logs/app.log"        # 日志文件路径
LOG_MAX_SIZE_MB="10"                # 每个日志文件最大大小(MB)
LOG_BACKUP_COUNT="5"                # 保留的备份文件数量
```

### API 端点

#### 认证

- `POST /api/auth/login` - 管理员登录
- `GET /api/auth/verify` - 验证令牌

#### 项目管理

- `GET /api/projects/` - 获取所有项目
- `POST /api/projects/` - 创建项目（需认证）
- `PUT /api/projects/{id}` - 更新项目（需认证）
- `DELETE /api/projects/{id}` - 删除项目（需认证）
- `POST /api/projects/generate` - AI 生成项目描述（需认证）

#### 博客管理

- `GET /api/blogs/` - 获取所有博客
- `POST /api/blogs/` - 创建博客（需认证）
- `PUT /api/blogs/{id}` - 更新博客（需认证）
- `DELETE /api/blogs/{id}` - 删除博客（需认证）
- `POST /api/blogs/generate` - AI 生成博客（需认证）

#### 简历管理

- `GET /api/resume/` - 获取简历数据
- `POST /api/resume/` - 更新简历数据（需认证）

## 🐳 Docker 部署

### 使用 Docker Compose（推荐）

```bash
# 启动所有服务
docker-compose up -d

# 查看日志
docker-compose logs -f api

# 停止服务
docker-compose down
```

### 单独构建 Docker 镜像

```bash
# 构建镜像
docker build -t nova-backend .

# 运行容器
docker run -p 8000:8000 --env-file .env nova-backend
```

## 🧪 测试

```bash
# 运行所有测试
pytest

# 运行特定测试文件
pytest tests/test_auth.py

# 生成测试覆盖率报告
pytest --cov=app tests/
```

## 📚 API 文档

启动服务后访问：

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

API 文档自动生成，包含所有端点的详细说明、请求/响应示例和交互式测试功能。

## 🔐 安全注意事项

1. **生产环境配置**

   - 修改`SECRET_KEY`为强随机字符串
   - 设置`DEBUG=False`
   - 使用强密码替换`ADMIN_PASSWORD`
   - 配置 HTTPS 和域名

2. **数据库安全**

   - 生产环境使用 PostgreSQL
   - 定期备份数据库
   - 使用环境变量存储数据库凭据

3. **API 安全**
   - 启用 CORS 白名单
   - 实施速率限制
   - 记录 API 访问日志

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目。

## 📄 许可证

本项目仅供个人学习和展示使用。

## 📞 支持

如有问题，请：

1. 查看 API 文档：http://localhost:8000/docs
2. 检查日志输出
3. 提交 Issue

---

**技术栈**: FastAPI + SQLAlchemy + PostgreSQL + Docker  
**最后更新**: 2025 年 12 月
