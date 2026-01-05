# Nova前端应用

基于React + TypeScript + Vite的现代化个人作品集前端应用，集成了AI聊天助手和响应式UI设计。

## 🚀 快速开始

### 环境要求
- Node.js 18+ 
- pnpm 9+ (推荐) 或 npm/yarn

### 安装依赖
```bash
# 使用pnpm（推荐）
pnpm install

### 启动开发服务器
```bash
pnpm dev
```
应用将在 http://localhost:3000 运行

### 构建生产版本
```bash
pnpm build
pnpm preview
```

## 🛠️ 技术栈

### 核心框架
- **React 19** - 用户界面库
- **TypeScript** - 类型安全的JavaScript超集
- **Vite 6** - 快速构建工具和开发服务器

### 样式与UI
- **Tailwind CSS** - 实用优先的CSS框架
- **Glassmorphism** - 玻璃态设计效果
- **Framer Motion** (可选) - 动画库

### 路由与状态
- **React Router DOM v7** - 客户端路由
- **React Hooks** - 状态管理

### AI集成
- **Google Gemini API** - 大语言模型服务
- **@google/genai SDK** - 官方JavaScript客户端

### 开发工具
- **ESLint** - 代码质量检查
- **TypeScript** - 静态类型检查
- **pnpm** - 快速、节省磁盘空间的包管理器

## 📁 项目结构

```
frontend/
├── components/           # 可复用React组件
│   ├── Navbar.tsx       # 导航栏组件
│   └── ChatAssistant.tsx # AI聊天助手组件
├── views/               # 页面视图组件
│   ├── Home.tsx         # 首页
│   ├── About.tsx        # 关于页面
│   ├── Projects.tsx     # 项目展示
│   ├── Blog.tsx         # 技术博客
│   ├── Login.tsx        # 登录页面
│   └── Admin.tsx        # 后台管理页面
├── services/            # 服务层
│   ├── apiService.ts    # REST API客户端
│   └── geminiService.ts # Gemini AI集成服务
├── public/              # 静态资源
├── package.json         # 依赖管理
├── vite.config.ts       # Vite配置
├── tsconfig.json        # TypeScript配置
├── .eslintrc.cjs        # ESLint配置
└── README.md            # 本文档
```

## ✨ 核心功能

### 1. AI聊天助手
- 右下角浮动聊天按钮
- 基于个人简历上下文的智能问答
- 实时对话历史记录
- 打字动画效果

### 2. 响应式导航
- 桌面端水平导航栏
- 移动端汉堡菜单
- 活动页面高亮指示

### 3. 页面功能
- **首页**：英雄区域和特性展示
- **关于页面**：时间线形式的工作经历和技能分类
- **项目页面**：项目网格布局，技术标签系统
- **博客页面**：技术博客文章展示
- **后台管理**：密码保护的内容管理界面

### 4. 设计特性
- 响应式布局（移动端优先）
- 玻璃态（Glassmorphism）卡片效果
- 平滑动画和过渡效果
- 自定义渐变和阴影

## 🔧 配置说明

### 环境变量
创建 `.env.local` 文件并添加您的Gemini API密钥：
```
GEMINI_API_KEY=your_gemini_api_key_here
```

### API集成
项目配置了与Python后端（端口8000）的REST API集成：
- 项目数据：`GET http://localhost:8000/api/projects`
- 博客数据：`GET http://localhost:8000/api/blogs`
- 认证端点：`POST http://localhost:8000/api/auth/login`

### 自定义样式
- 主要样式在 `index.html` 的 `<style>` 标签中定义
- 玻璃态效果类：`.glass-card`
- 渐变文字类：`.text-gradient`
- 响应式断点使用Tailwind默认配置

## 📱 页面说明

### 首页 (`/`)
- 英雄区域和行动号召按钮
- 特性卡片展示（现代技术栈、AI集成、以用户为中心）
- 背景装饰元素

### 关于页面 (`/about`)
- 时间线形式的工作经历展示
- 技能分类卡片（前端、后端、运维工具）
- 从API动态加载数据

### 项目页面 (`/projects`)
- 项目网格布局（响应式1-3列）
- 项目图片、描述和技术标签
- 演示和源码链接

### 博客页面 (`/blog`)
- 博客文章列表
- 封面图片、标题、摘要和标签
- 从API动态加载或使用静态数据

### 后台页面 (`/admin`)
- 需要登录认证
- 博客管理（查看、删除、AI生成）
- 侧边栏导航

## 🚦 开发指南

### 使用pnpm（推荐）
```bash
# 安装pnpm（如果尚未安装）
npm install -g pnpm

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 代码质量检查
pnpm lint
pnpm type-check

# 清理并重新安装
pnpm reinstall
```

### 添加新页面
1. 在 `views/` 目录创建新的页面组件
2. 在 `App.tsx` 中添加路由
3. 在 `Navbar.tsx` 中添加导航链接（如果需要）
4. 更新TypeScript类型定义（如果需要）

### 添加新组件
1. 在 `components/` 目录创建可复用组件
2. 使用TypeScript接口定义props
3. 添加必要的样式和功能
4. 导出组件供其他文件使用

## 🔐 安全注意事项

1. **API密钥保护**：Gemini API密钥存储在环境变量中，不应提交到版本控制
2. **认证令牌**：后台使用localStorage存储token，生产环境应考虑更安全的存储方式
3. **密码验证**：当前使用简单密码验证，生产环境应实现更强大的认证机制
4. **CORS配置**：确保后端正确配置CORS以允许前端请求

## 📦 包管理器说明

### 为什么使用pnpm？
- **速度快**：比npm/yarn安装依赖更快
- **磁盘空间高效**：使用硬链接和符号链接，节省磁盘空间
- **严格性**：默认使用严格模式，避免幽灵依赖
- **Monorepo支持**：优秀的工作区支持

### pnpm常用命令
```bash
# 安装依赖
pnpm install

# 添加依赖
pnpm add package-name           # 生产依赖
pnpm add -D package-name        # 开发依赖

# 移除依赖
pnpm remove package-name

# 运行脚本
pnpm dev
pnpm build
pnpm lint

# 更新依赖
pnpm update
pnpm update --latest
```

### 从npm迁移到pnpm
```bash
# 1. 删除node_modules和package-lock.json
rm -rf node_modules package-lock.json

# 2. 安装pnpm（如果尚未安装）
npm install -g pnpm

# 3. 使用pnpm安装依赖
pnpm install

# 4. 更新package.json（已自动完成）
# 添加 "packageManager": "pnpm@9.0.0" 字段
```

## 🧪 测试

### 开发测试
```bash
# 启动开发服务器并测试
pnpm dev

# 构建测试
pnpm build
pnpm preview
```

### 代码质量
```bash
# 代码风格检查
pnpm lint

# 类型检查
pnpm type-check
```

## 🚧 待实现功能

- [ ] 单元测试和集成测试
- [ ] 暗色主题切换
- [ ] 多语言支持
- [ ] 性能优化（代码分割、懒加载）
- [ ] PWA支持
- [ ] 更完善的错误处理

## 📄 许可证

本项目仅供个人学习和展示使用。

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目。

---

**技术栈**：React + TypeScript + Vite + Tailwind CSS + Gemini AI  
**包管理器**：pnpm  
**最后更新**：2025年12月