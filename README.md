# 个人作品集（全栈项目）

一个现代化的全栈个人网站，集成了 AI 助手和后台管理系统，展示个人技能、项目经历和技术博客。

## 🏗️ 项目结构

```
personalWeb/
├── frontend/              # React前端应用
│   ├── components/        # React组件
│   ├── views/            # 页面视图
│   ├── services/         # API服务层
│   ├── public/           # 静态资源
│   ├── package.json      # 前端依赖
│   └── vite.config.ts    # 构建配置
├── backend/              # Python后端API
│   ├── app/              # FastAPI应用
│   │   ├── api/          # API路由
│   │   ├── core/         # 核心配置
│   │   ├── db/           # 数据库
│   │   ├── models/       # 数据模型
│   │   ├── schemas/      # Pydantic模型
│   │   └── services/     # 业务逻辑
│   ├── requirements.txt  # Python依赖
│   ├── Dockerfile        # 容器配置
│   └── docker-compose.yml # 服务编排
├── .gitignore           # Git忽略文件
└── README.md            # 项目说明
```

## 🚀 快速开始

### 1. 前端开发

```bash
cd frontend
# 使用pnpm（推荐）
pnpm install
pnpm dev

# 或使用npm
# npm install
# npm run dev
```

前端将在 http://localhost:3000 运行

### 2. 后端开发

```bash
cd backend
# 创建虚拟环境（推荐）
python -m venv venv
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate

# 安装依赖
pip install -r requirements.txt

# 配置环境变量
cp .env.example .env
# 编辑.env文件，配置您的API密钥

# 启动服务
uvicorn app.main:app --reload
```

后端 API 将在 http://localhost:8000 运行
API 文档：http://localhost:8000/docs

### 3. 使用 Docker Compose（推荐）

```bash
cd backend
docker-compose up -d
```

这将启动：

- 后端 API：http://localhost:8000
- PostgreSQL 数据库：localhost:5432
- pgAdmin（数据库管理）：http://localhost:5050

## 🛠️ 技术栈

### 前端

- **React 19** + **TypeScript** - 用户界面
- **Vite 6** - 构建工具和开发服务器
- **Tailwind CSS** - 样式框架
- **React Router DOM v7** - 客户端路由
- **Google Gemini API** - AI 集成

### 后端

- **FastAPI** - 高性能 Python Web 框架
- **SQLAlchemy** + **Alembic** - 数据库 ORM 和迁移
- **PostgreSQL** / **SQLite** - 数据库
- **JWT** - 认证系统
- **Google Gemini API** - AI 服务集成

### 部署

- **Docker** + **Docker Compose** - 容器化部署
- **Nginx** - 反向代理（生产环境）

## 📁 详细说明

### 前端结构

```
frontend/
├── components/           # 可复用组件
│   ├── Navbar.tsx       # 导航栏
│   └── ChatAssistant.tsx # AI聊天助手
├── views/               # 页面组件
│   ├── Home.tsx         # 首页
│   ├── About.tsx        # 关于页面
│   ├── Projects.tsx     # 项目展示
│   ├── Blog.tsx         # 技术博客
│   ├── Login.tsx        # 登录页面
│   └── Admin.tsx        # 后台管理
├── services/            # 服务层
│   ├── apiService.ts    # REST API客户端
│   └── geminiService.ts # Gemini AI集成
└── 配置文件...
```

### 后端结构

```
backend/
├── app/
│   ├── api/v1/endpoints/ # API端点
│   │   ├── auth.py       # 认证相关
│   │   ├── projects.py   # 项目管理
│   │   ├── blogs.py      # 博客管理
│   │   └── resume.py     # 简历管理
│   ├── core/             # 核心配置
│   │   ├── config.py     # 应用配置
│   │   └── security.py   # 安全相关
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
└── 部署和配置文件...
```

## 🔗 API 接口

### 认证

- `POST /api/auth/login` - 管理员登录
- `GET /api/auth/verify` - 验证令牌

### 项目管理

- `GET /api/projects` - 获取所有项目
- `POST /api/projects` - 创建项目（需认证）
- `PUT /api/projects/{id}` - 更新项目（需认证）
- `DELETE /api/projects/{id}` - 删除项目（需认证）
- `POST /api/projects/generate` - AI 生成项目描述（需认证）

### 博客管理

- `GET /api/blogs` - 获取所有博客
- `POST /api/blogs` - 创建博客（需认证）
- `PUT /api/blogs/{id}` - 更新博客（需认证）
- `DELETE /api/blogs/{id}` - 删除博客（需认证）
- `POST /api/blogs/generate` - AI 生成博客（需认证）

### 简历管理

- `GET /api/resume` - 获取简历数据
- `POST /api/resume` - 更新简历数据（需认证）

## 📚 文档

- 前端文档：查看`frontend/README.md`
- 后端文档：查看`backend/README.md`
- API 文档：启动后端后访问 http://localhost:8000/docs
- 技术栈设计：查看`backend/TECH_STACK_DESIGN.md`

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目。

## 📄 许可证

本项目仅供个人学习和展示使用。

---

**技术栈**：React + TypeScript + FastAPI + PostgreSQL + Docker  
**最后更新**：2025 年 12 月
