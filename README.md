# 拾光忆栈官方网站

这是拾光忆栈（MemoryKeeper）的官方网站源代码，使用 Docusaurus 构建，托管在 GitHub Pages 上。

## 网站结构

- `docusaurus.config.js` - Docusaurus 配置文件
- `sidebars.js` - 文档侧边栏配置
- `src/` - 网站源代码
  - `css/` - 样式文件
  - `components/` - React 组件
  - `pages/` - 网站页面
- `docs/` - 文档内容
- `static/` - 静态资源
  - `img/` - 图片资源

## 本地开发

### 前提条件

- Node.js 16.14 或更高版本
- npm 或 yarn

### 安装依赖

```bash
cd site
npm install
# 或
yarn install
```

### 本地运行

```bash
npm start
# 或
yarn start
```

这将启动本地开发服务器，并在浏览器中打开网站。默认地址为 http://localhost:3000/

### 构建网站

```bash
npm run build
# 或
yarn build
```

构建后的文件将位于 `build` 目录中。

## 部署到 GitHub Pages

### 自动部署

当更改推送到 GitHub 仓库的 `main` 分支时，GitHub Actions 将自动构建并部署网站。

### 手动部署

```bash
npm run deploy
# 或
yarn deploy
```

这将构建网站并将其部署到 `gh-pages` 分支。

## 添加内容

### 添加文档

1. 在 `docs` 目录中创建新的 Markdown 文件
2. 添加前置元数据，例如：
   ```md
   ---
   sidebar_position: 1
   ---
   
   # 文档标题
   
   文档内容...
   ```
3. 在 `sidebars.js` 中更新侧边栏配置（如果需要）

### 添加博客文章

1. 在 `blog` 目录中创建新的 Markdown 文件
2. 添加前置元数据，例如：
   ```md
   ---
   slug: my-blog-post
   title: 我的博客文章
   authors: [author_name]
   tags: [tag1, tag2]
   ---
   
   博客内容...
   ```

### 添加页面

1. 在 `src/pages` 目录中创建新的 JSX 文件
2. 使用 React 组件创建页面内容

## 自定义主题

- 全局 CSS 在 `src/css/custom.css` 中
- 组件样式在各自的 `.module.css` 文件中

## 多语言支持

网站配置支持中文和英文。要添加翻译：

1. 在 `i18n` 目录中创建对应的语言文件
2. 运行 `npm run write-translations` 生成翻译模板

## 问题与支持

如有任何问题或需要支持，请在 GitHub 仓库中创建 Issue。
