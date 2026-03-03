# 🍜 小红书图文笔记生成器

基于 React + Vite + MiniMax API 的小红书风格图文笔记自动生成工具。

## ✨ 功能特点

- 🍽️ **6种餐饮方向**: 饺子馄饨、汉堡薯条、意面披萨、包子粥店、快餐便当、甜品饮品
- 🖼️ **4种图片排版**: 九宫格主图、左右对比图、大图+文字贴、多图拼接流
- 🔥 **6种标题格式**: 土著私藏型、情绪共鸣型、避坑指南型、感受描述型、悬念钩子型、数字清单型
- 📝 **6种正文结构**: 烟火向、逛吃向、老饕向、快消向、故事向、专业向
- 🤖 **AI 智能生成**: 使用 MiniMax API 自动生成小红书爆款笔记
- 📸 **图片上传**: 支持最多 9 张图片上传(小红书标准)

## 🚀 快速开始

### 前置要求

- Node.js 16+
- MiniMax API 密钥

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/你的用户名/xiaohongshu-generator.git
cd xiaohongshu-generator
```

2. **安装依赖**
```bash
npm install
```

3. **配置 API 密钥**
```bash
cp .env.example .env
```

编辑 `.env` 文件,填入你的 MiniMax API 密钥

4. **启动后端服务器**
```bash
npm run server
```

5. **启动前端** (新开终端)
```bash
npm run dev
```

6. 访问 http://localhost:5175

## 📖 使用说明

1. 选择餐饮方向
2. 选择图片排版方式
3. 选择标题格式
4. 选择正文格式
5. 填写店铺信息
6. 上传图片(可选)
7. 点击生成笔记

## 🏗️ 技术栈

- React 19 + Vite 7
- Express (后端代理)
- MiniMax API

## 📁 项目结构

```
xiaohongshu-generator/
├── src/
│   ├── App.jsx              # 主应用
│   └── main.jsx             # 入口
├── server.js                # 后端服务器
├── .env.example             # 环境变量模板
└── package.json
```

## 🛠️ 常用命令

```bash
npm run server    # 启动后端
npm run dev       # 启动前端
npm run build     # 构建生产版本
```

## 📄 许可证

MIT License
