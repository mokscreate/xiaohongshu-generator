# 🚀 GitHub 部署指南

## 步骤 1: 初始化 Git 仓库

在项目目录下打开终端,执行:

```bash
cd E:\测试笔记\xiaohongshu-generator
git init
```

## 步骤 2: 添加文件到 Git

```bash
git add .
```

## 步骤 3: 创建第一次提交

```bash
git commit -m "初始提交: 小红书图文笔记生成器"
```

## 步骤 4: 在 GitHub 上创建仓库

### 方法 A: 使用 GitHub CLI (推荐)

如果你安装了 GitHub CLI (`gh`):

```bash
gh repo create xiaohongshu-generator --public --source=. --remote=origin --push
```

这个命令会:
- 在 GitHub 上创建一个名为 `xiaohongshu-generator` 的公开仓库
- 设置远程仓库地址
- 自动推送代码

### 方法 B: 手动创建 (如果没有 gh 命令)

1. 打开浏览器,访问 https://github.com/new
2. 填写仓库信息:
   - Repository name: `xiaohongshu-generator`
   - Description: `小红书图文笔记生成器 - 基于 React + MiniMax API`
   - 选择 Public (公开) 或 Private (私有)
   - **不要**勾选 "Add a README file"
   - **不要**勾选 "Add .gitignore"
3. 点击 "Create repository"

4. 在创建后的页面,复制远程仓库地址,然后在终端执行:

```bash
git remote add origin https://github.com/你的用户名/xiaohongshu-generator.git
git branch -M main
git push -u origin main
```

## 步骤 5: 验证部署

访问你的 GitHub 仓库页面,确认代码已成功上传。

## ⚠️ 重要提示

### 1. API 密钥安全
- ✅ `.env` 文件已添加到 `.gitignore`,不会被上传到 GitHub
- ✅ 你的 API 密钥是安全的
- ⚠️ 其他人克隆项目后需要自己创建 `.env` 文件并填入自己的 API 密钥

### 2. 为其他开发者准备

在 GitHub 仓库中,其他人看到的是:
- ✅ `.env.example` - 环境变量模板
- ✅ 完整的源代码
- ✅ README 和文档
- ❌ 不包含你的 `.env` 文件(API 密钥)

### 3. 克隆项目后的使用步骤

其他人克隆你的项目后需要:

```bash
# 1. 克隆项目
git clone https://github.com/你的用户名/xiaohongshu-generator.git
cd xiaohongshu-generator

# 2. 安装依赖
npm install

# 3. 配置 API 密钥
cp .env.example .env
# 然后编辑 .env 文件,填入自己的 MiniMax API 密钥

# 4. 启动后端服务器
npm run server

# 5. 启动前端(新开一个终端)
npm run dev
```

## 📝 后续更新

当你修改代码后,推送更新到 GitHub:

```bash
git add .
git commit -m "描述你的修改"
git push
```

## 🎉 完成!

你的项目现在已经在 GitHub 上了!
