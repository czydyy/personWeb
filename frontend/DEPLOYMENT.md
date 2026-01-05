# 前端部署指南

## 部署方式

### 1. 使用 Docker 部署（推荐）

#### 构建镜像

```bash
# 在frontend目录下
docker build -t nova-frontend:latest .
```

#### 运行容器

```bash
# 开发环境
docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules --env-file .env.local nova-frontend:latest

# 生产环境
docker run -d --name nova-frontend -p 3000:3000 --restart unless-stopped nova-frontend:latest
```

### 2. 使用 Docker Compose（集成部署）

参考根目录的`docker-compose.full.yml`文件，该文件包含前后端完整部署。

### 3. 手动部署

#### 安装依赖

```bash
# 确保已安装Node.js 18+和pnpm
npm install -g pnpm@9.0.0

# 安装项目依赖
pnpm install
```

#### 构建应用

```bash
# 设置环境变量
export NEXT_PUBLIC_API_URL=http://your-api-domain.com/api
export NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key

# 构建
pnpm build

# 启动生产服务器
pnpm start
```

## 环境变量配置

### 必需环境变量

创建`.env.local`文件：

```env
# API后端地址
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# AI服务配置（可选）
NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key

# 其他配置
NEXT_PUBLIC_SITE_NAME=Nova Portfolio
NEXT_PUBLIC_SITE_DESCRIPTION=AI赋能的个人作品集
```

### Docker 环境变量

在 Docker 运行时可以通过`-e`参数设置：

```bash
docker run -e NEXT_PUBLIC_API_URL=http://api.example.com/api -p 3000:3000 nova-frontend
```

## 生产环境优化

### 1. 启用 Gzip 压缩

在 Nginx 配置中启用 Gzip 压缩：

```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
```

### 2. 配置 CDN

将静态资源上传到 CDN，修改`next.config.js`：

```javascript
const nextConfig = {
  assetPrefix: 'https://cdn.yourdomain.com',
  // ...其他配置
};
```

### 3. 启用缓存

设置适当的缓存头：

```nginx
location /_next/static/ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}
```

### 4. 安全配置

- 启用 HTTPS
- 设置 CSP（内容安全策略）
- 添加安全头

## 健康检查

### Docker 健康检查

Dockerfile 中已包含健康检查配置，可以通过以下命令检查：

```bash
docker inspect --format='{{.State.Health.Status}}' nova-frontend
```

### 手动健康检查

```bash
# 检查应用是否运行
curl -f http://localhost:3000/api/health || echo "应用未运行"

# 检查API连接
curl -f http://localhost:3000/api/health-check
```

## 监控和日志

### 查看日志

```bash
# Docker容器日志
docker logs nova-frontend -f

# 生产环境日志
tail -f /var/log/nova-frontend.log
```

### 性能监控

- 使用`pm2`进行进程管理
- 配置应用性能监控（APM）
- 设置错误跟踪（如 Sentry）

## 故障排除

### 常见问题

#### 1. 构建失败

**问题**：`pnpm build`失败
**解决方案**：

```bash
# 清理缓存
rm -rf .next
rm -rf node_modules

# 重新安装依赖
pnpm install

# 重新构建
pnpm build
```

#### 2. 内存不足

**问题**：构建时内存不足
**解决方案**：

```bash
# 增加Node.js内存限制
export NODE_OPTIONS="--max-old-space-size=4096"
pnpm build
```

#### 3. 端口冲突

**问题**：3000 端口已被占用
**解决方案**：

```bash
# 修改端口
pnpm start --port 3001

# 或停止占用端口的进程
lsof -ti:3000 | xargs kill -9
```

#### 4. API 连接失败

**问题**：前端无法连接后端 API
**解决方案**：

1. 检查`NEXT_PUBLIC_API_URL`配置
2. 验证后端服务是否运行
3. 检查 CORS 配置

## 更新部署

### 更新代码

```bash
# 拉取最新代码
git pull

# 重新构建
docker-compose build frontend

# 重启服务
docker-compose up -d frontend
```

### 回滚部署

```bash
# 回滚到上一个版本
docker-compose down
docker-compose up -d --force-recreate frontend
```

## 备份和恢复

### 备份构建产物

```bash
# 备份.next目录
tar -czf next-build-backup-$(date +%Y%m%d).tar.gz .next/

# 备份环境变量
cp .env.local .env.local.backup
```

### 恢复部署

```bash
# 恢复构建产物
tar -xzf next-build-backup-20250105.tar.gz

# 恢复环境变量
cp .env.local.backup .env.local

# 重启服务
docker-compose up -d
```

## 性能测试

### 压力测试

```bash
# 使用ab进行压力测试
ab -n 1000 -c 10 http://localhost:3000/

# 使用wrk进行性能测试
wrk -t4 -c100 -d30s http://localhost:3000/
```

### Lighthouse 测试

```bash
# 安装Lighthouse
npm install -g lighthouse

# 运行测试
lighthouse http://localhost:3000 --output html --output-path ./lighthouse-report.html
```

---

**最后更新**: $(date)
**部署状态**: ✅ 生产就绪
