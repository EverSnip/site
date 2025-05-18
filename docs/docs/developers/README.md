# 开发者文档

本节提供了拾光忆栈的技术架构、存储结构、API参考和贡献指南，适合希望了解拾光忆栈内部工作原理或参与项目开发的开发者。

## 内容概览

- [架构概览](./architecture.md) - 拾光忆栈的整体架构和技术栈
- [存储结构](./storage-structure.md) - 数据存储和组织方式
- [API参考](./api-reference.md) - 内部API和扩展点
- [贡献指南](./contributing.md) - 如何参与项目开发

## 技术栈概述

拾光忆栈使用以下主要技术构建：

- **前端框架**：React.js
- **状态管理**：Redux
- **UI组件库**：Ant Design
- **存储**：IndexedDB, Chrome Storage API
- **云存储**：支持多种对象存储服务（华为云OBS等）
- **构建工具**：Webpack, Babel
- **测试框架**：Jest, React Testing Library

## 开发环境设置

如果您想在本地设置开发环境，请按照以下步骤操作：

### 前提条件

- Node.js (v14+)
- npm (v6+) 或 yarn (v1.22+)
- Git
- Chrome浏览器

### 克隆仓库

```bash
git clone https://github.com/AIPlayZone/MemoryKeeper.git
cd MemoryKeeper
```

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 开发模式运行

```bash
npm run dev
# 或
yarn dev
```

这将启动开发服务器，并在`dist`目录中生成开发版本的扩展。

### 在Chrome中加载扩展

1. 打开Chrome浏览器
2. 访问`chrome://extensions/`
3. 启用"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择项目的`dist`目录

## 项目结构

拾光忆栈的源代码组织如下：

```
src/
├── assets/         # 静态资源（图片、图标等）
├── components/     # React组件
├── constants/      # 常量定义
├── hooks/          # React自定义钩子
├── pages/          # 页面组件
├── services/       # 服务层（API调用、存储等）
├── store/          # Redux状态管理
├── utils/          # 工具函数
├── background.js   # 扩展后台脚本
├── content.js      # 内容脚本
├── popup.js        # 弹出窗口入口
└── options.js      # 选项页面入口
```

## 架构简介

拾光忆栈采用模块化架构，主要分为以下几个部分：

1. **UI层**：React组件和页面，负责用户界面渲染和交互
2. **状态管理层**：Redux store，管理应用状态
3. **服务层**：提供数据访问、同步、加密等核心功能
4. **存储层**：管理本地存储和云存储
5. **扩展集成层**：与Chrome扩展API交互

详细架构请参阅[架构概览](./architecture.md)章节。

## 核心概念

### 记忆模型

记忆（Memory）是拾光忆栈的核心数据模型，表示用户保存的内容：

```javascript
{
  id: "mem_123456789",          // 唯一ID
  title: "示例记忆",             // 标题
  content: "这是内容...",        // 内容
  created_at: "2023-05-15T10:30:00Z", // 创建时间
  updated_at: "2023-05-15T10:30:00Z", // 更新时间
  category_id: "2",             // 分类ID
  tags: ["示例", "测试"],        // 标签数组
  url: "https://example.com/page", // 来源URL
  source: "Example Website",    // 来源网站
  images: [...],                // 图片数组
  videos: [...],                // 视频数组
  metadata: {...}               // 其他元数据
}
```

### 存储架构

拾光忆栈使用分片存储架构，将数据分散存储在多个小文件中，以提高性能和可靠性：

- **元数据索引**：存储记忆的元数据和索引
- **内容分片**：将记忆内容分散存储在多个分片中
- **媒体存储**：单独存储媒体文件
- **设置存储**：存储用户设置和配置

详细存储结构请参阅[存储结构](./storage-structure.md)章节。

## 扩展点

拾光忆栈提供以下扩展点，允许开发者扩展其功能：

1. **存储提供商**：添加新的云存储提供商
2. **内容处理器**：自定义内容处理和转换
3. **UI主题**：创建自定义主题
4. **导入导出格式**：支持新的导入导出格式

如何使用这些扩展点请参阅[API参考](./api-reference.md)章节。

## 参与开发

我们欢迎开发者参与拾光忆栈的开发。您可以通过以下方式贡献：

- 报告问题和提出功能建议
- 提交代码修复和改进
- 改进文档
- 创建新的主题和扩展

详细贡献指南请参阅[贡献指南](./contributing.md)章节。

## 许可证

拾光忆栈使用MIT许可证。详情请参阅项目根目录的LICENSE文件。
