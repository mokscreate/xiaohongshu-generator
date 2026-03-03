# 小红书图文笔记生成器

这是一个基于 React + Vite 的小红书图文笔记生成器应用。

## 功能特点

- 🍽️ 6种餐饮方向选择(饺子馄饨、汉堡薯条、意面披萨等)
- 🖼️ 4种图片排版方式
- 🔥 6种爆款标题格式
- 📝 6种正文结构模板
- 🏪 店铺信息自动融入
- 📸 支持上传最多9张图片
- ✨ AI 自动生成小红书风格笔记

## 安装和运行

### 1. 安装依赖(已完成)
```bash
npm install
```

### 2. 配置 API 密钥

代码中使用了 Anthropic API 来生成内容。你需要:

1. 在项目根目录创建 `.env` 文件
2. 添加你的 API 密钥:
```
VITE_ANTHROPIC_API_KEY=your_api_key_here
```

**注意**: 当前代码中的 API 调用(App.jsx 第104-112行)需要修改以使用环境变量和添加 API 密钥。

### 3. 运行开发服务器
```bash
npm run dev
```

然后在浏览器中打开显示的地址(通常是 http://localhost:5173)

### 4. 构建生产版本
```bash
npm run build
```

## 重要提示

⚠️ **API 配置**: 当前代码中的 API 调用缺少认证头。你需要修改 `src/App.jsx` 文件中的 `generateNote` 函数(第104-112行),添加 API 密钥:

```javascript
const res = await fetch("https://api.anthropic.com/v1/messages",{
  method:"POST",
  headers:{
    "Content-Type":"application/json",
    "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,  // 添加这行
    "anthropic-version": "2023-06-01"  // 添加这行
  },
  body:JSON.stringify({
    model:"claude-sonnet-4-20250514",
    max_tokens:1000,
    messages:[{role:"user",content:prompt}]
  })
});
```

## 使用流程

1. 选择餐饮方向
2. 选择图片排版方式
3. 选择标题格式
4. 选择正文格式
5. 填写店铺信息(店名、商品、地址、价格)
6. 上传图片(可选)
7. 点击生成,AI 将自动创建小红书风格的笔记

## 技术栈

- React 18
- Vite
- Anthropic Claude API

## 项目结构

```
xiaohongshu-generator/
├── src/
│   ├── App.jsx          # 主应用组件
│   └── main.jsx         # 入口文件
├── public/
├── package.json
└── vite.config.js
```
