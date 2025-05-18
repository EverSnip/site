# 架构概览

本文档提供了拾光忆栈的整体架构和技术栈详细说明，帮助开发者理解系统的设计原则和组件交互方式。

## 系统架构

拾光忆栈采用模块化、分层架构，确保各组件职责清晰、耦合度低，便于维护和扩展。

### 架构图

以下是拾光忆栈的高级架构图：

```
+-----------------------------------+
|             UI 层                 |
|  +-------------------------------+|
|  |     React 组件 & 页面         ||
|  +-------------------------------+|
+-----------------------------------+
                 |
+-----------------------------------+
|           状态管理层              |
|  +-------------------------------+|
|  |        Redux Store            ||
|  +-------------------------------+|
+-----------------------------------+
                 |
+-----------------------------------+
|             服务层                |
|  +-------------------------------+|
|  | 记忆服务 | 同步服务 | 加密服务 ||
|  +-------------------------------+|
+-----------------------------------+
                 |
+-----------------------------------+
|             存储层                |
|  +-------------------------------+|
|  | 本地存储 | 云存储 | 缓存管理   ||
|  +-------------------------------+|
+-----------------------------------+
                 |
+-----------------------------------+
|           扩展集成层              |
|  +-------------------------------+|
|  |      Chrome 扩展 API          ||
|  +-------------------------------+|
+-----------------------------------+
```

### 层级说明

1. **UI层**
   - 使用React构建用户界面
   - 基于Ant Design组件库
   - 响应式设计，支持不同屏幕尺寸
   - 主题系统支持自定义外观

2. **状态管理层**
   - 使用Redux管理应用状态
   - 实现单向数据流
   - 使用Redux Toolkit简化状态管理
   - 支持中间件扩展（如异步操作）

3. **服务层**
   - 提供核心业务逻辑
   - 实现记忆管理、同步、搜索等功能
   - 处理数据转换和验证
   - 提供API给UI层调用

4. **存储层**
   - 管理本地数据存储（IndexedDB）
   - 实现云存储集成
   - 提供缓存管理
   - 处理数据分片和合并

5. **扩展集成层**
   - 与Chrome扩展API交互
   - 处理浏览器事件
   - 管理权限和生命周期
   - 实现跨域通信

## 技术栈详解

### 前端技术

- **React.js (v17+)**
  - 函数组件和Hooks
  - 上下文API用于主题和配置
  - 懒加载和代码分割

- **Redux (v4+)**
  - Redux Toolkit简化状态管理
  - Redux Persist实现状态持久化
  - Redux Thunk处理异步操作

- **Ant Design (v4+)**
  - 组件库提供UI基础
  - 自定义主题和样式
  - 响应式布局组件

- **样式解决方案**
  - Less预处理器
  - CSS Modules避免样式冲突
  - 主题变量系统

### 存储技术

- **IndexedDB**
  - 主要本地存储方案
  - 使用Dexie.js简化操作
  - 实现分片存储架构

- **Chrome Storage API**
  - 存储用户设置和关键数据
  - 支持同步和本地存储
  - 处理存储限制和配额

- **云存储集成**
  - 抽象存储提供商接口
  - 支持多种对象存储服务
  - 实现增量同步和冲突解决

### 构建和开发工具

- **Webpack (v5+)**
  - 模块打包和资源优化
  - 开发服务器和热重载
  - 代码分割和懒加载

- **Babel**
  - JavaScript转译
  - 支持现代语法和特性
  - 插件系统扩展功能

- **ESLint & Prettier**
  - 代码质量检查
  - 统一代码风格
  - 自动修复常见问题

- **Jest & React Testing Library**
  - 单元测试和集成测试
  - 组件测试和快照测试
  - 模拟服务和API

## 核心模块

### 扩展背景页 (Background)

背景页是扩展的核心，在浏览器启动时加载并持续运行：

```javascript
// background.js 简化示例
chrome.runtime.onInstalled.addListener(async () => {
  // 初始化存储
  await storageService.initialize();
  
  // 设置上下文菜单
  chrome.contextMenus.create({
    id: "save-to-memorykeeper",
    title: "保存到拾光忆栈",
    contexts: ["selection"]
  });
});

// 处理上下文菜单点击
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "save-to-memorykeeper") {
    memoryService.quickSave({
      content: info.selectionText,
      url: tab.url,
      title: tab.title
    });
  }
});

// 处理消息通信
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // 处理来自内容脚本或弹出窗口的消息
});
```

### 内容脚本 (Content Script)

内容脚本注入到网页中，可以读取和修改页面内容：

```javascript
// content.js 简化示例
// 监听键盘快捷键
document.addEventListener('keydown', (e) => {
  // Ctrl+Shift+M 快速保存选中文本
  if (e.ctrlKey && e.shiftKey && e.key === 'M') {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
      chrome.runtime.sendMessage({
        action: 'quickSave',
        data: {
          content: selectedText,
          url: window.location.href,
          title: document.title
        }
      });
    }
  }
});

// 监听来自背景页的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // 处理消息
});
```

### 记忆服务 (MemoryService)

记忆服务处理记忆的创建、读取、更新和删除操作：

```javascript
// services/MemoryService.js 简化示例
class MemoryService {
  constructor() {
    this.storageService = new StorageService();
    this.searchService = new SearchService();
  }

  async createMemory(memoryData) {
    // 验证数据
    this.validateMemory(memoryData);
    
    // 生成唯一ID
    const id = `mem_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // 创建记忆对象
    const memory = {
      id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...memoryData
    };
    
    // 保存到存储
    await this.storageService.saveMemory(memory);
    
    // 更新搜索索引
    await this.searchService.indexMemory(memory);
    
    return memory;
  }

  async getMemory(id) {
    return this.storageService.getMemory(id);
  }

  async updateMemory(id, updates) {
    const memory = await this.getMemory(id);
    if (!memory) {
      throw new Error(`Memory with id ${id} not found`);
    }
    
    const updatedMemory = {
      ...memory,
      ...updates,
      updated_at: new Date().toISOString()
    };
    
    await this.storageService.saveMemory(updatedMemory);
    await this.searchService.updateMemoryIndex(updatedMemory);
    
    return updatedMemory;
  }

  async deleteMemory(id) {
    await this.storageService.deleteMemory(id);
    await this.searchService.removeMemoryFromIndex(id);
  }

  async quickSave(data) {
    // 实现快速保存逻辑
  }

  validateMemory(memory) {
    // 验证记忆数据
  }
}
```

### 存储服务 (StorageService)

存储服务管理本地数据存储和云存储集成：

```javascript
// services/StorageService.js 简化示例
class StorageService {
  constructor() {
    this.db = new Dexie('MemoryKeeperDB');
    this.initDatabase();
    this.cloudStorageService = null;
  }

  initDatabase() {
    this.db.version(1).stores({
      memories: 'id, category_id, created_at, updated_at',
      categories: 'id, name',
      tags: 'id, name',
      settings: 'id'
    });
  }

  async initialize() {
    // 初始化数据库和设置
    const settings = await this.getSettings();
    if (settings.cloudStorage && settings.cloudStorage.enabled) {
      await this.initCloudStorage(settings.cloudStorage);
    }
  }

  async initCloudStorage(config) {
    // 根据配置初始化云存储服务
    const { provider, ...credentials } = config;
    
    switch (provider) {
      case 'huaweiObs':
        this.cloudStorageService = new HuaweiObsService(credentials);
        break;
      case 'minio':
        this.cloudStorageService = new MinioService(credentials);
        break;
      // 其他提供商...
    }
    
    await this.cloudStorageService.initialize();
  }

  async saveMemory(memory) {
    // 保存到本地数据库
    await this.db.memories.put(memory);
    
    // 如果启用了云存储，也保存到云端
    if (this.cloudStorageService) {
      await this.cloudStorageService.saveMemory(memory);
    }
  }

  async getMemory(id) {
    return this.db.memories.get(id);
  }

  async deleteMemory(id) {
    await this.db.memories.delete(id);
    
    if (this.cloudStorageService) {
      await this.cloudStorageService.deleteMemory(id);
    }
  }

  async getMemories(options = {}) {
    // 实现查询逻辑，支持分页、过滤和排序
  }

  async getSettings() {
    const settings = await this.db.settings.get('user_settings');
    return settings || { id: 'user_settings' };
  }

  async saveSettings(settings) {
    await this.db.settings.put({
      id: 'user_settings',
      ...settings
    });
  }
}
```

### 同步服务 (SyncService)

同步服务处理多设备间的数据同步：

```javascript
// services/SyncService.js 简化示例
class SyncService {
  constructor() {
    this.storageService = new StorageService();
    this.syncInProgress = false;
    this.lastSyncTime = null;
  }

  async sync(options = {}) {
    if (this.syncInProgress) {
      throw new Error('Sync already in progress');
    }
    
    this.syncInProgress = true;
    
    try {
      // 获取云存储服务
      const cloudStorage = this.storageService.cloudStorageService;
      if (!cloudStorage) {
        throw new Error('Cloud storage not configured');
      }
      
      // 获取上次同步时间
      const settings = await this.storageService.getSettings();
      const lastSyncTime = settings.lastSyncTime;
      
      // 获取本地和云端的更改
      const localChanges = await this.getLocalChanges(lastSyncTime);
      const cloudChanges = await cloudStorage.getChanges(lastSyncTime);
      
      // 解决冲突
      const { toUpload, toDownload } = this.resolveConflicts(
        localChanges,
        cloudChanges,
        options.conflictStrategy || 'lastModifiedWins'
      );
      
      // 上传本地更改到云端
      for (const memory of toUpload) {
        await cloudStorage.saveMemory(memory);
      }
      
      // 下载云端更改到本地
      for (const memory of toDownload) {
        await this.storageService.saveMemory(memory);
      }
      
      // 更新上次同步时间
      const newSettings = {
        ...settings,
        lastSyncTime: new Date().toISOString()
      };
      await this.storageService.saveSettings(newSettings);
      
      this.lastSyncTime = newSettings.lastSyncTime;
      
      return {
        success: true,
        uploaded: toUpload.length,
        downloaded: toDownload.length,
        timestamp: newSettings.lastSyncTime
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    } finally {
      this.syncInProgress = false;
    }
  }

  async getLocalChanges(since) {
    // 获取自上次同步以来的本地更改
  }

  resolveConflicts(localChanges, cloudChanges, strategy) {
    // 实现冲突解决逻辑
  }
}
```

### 搜索服务 (SearchService)

搜索服务实现全文搜索功能：

```javascript
// services/SearchService.js 简化示例
class SearchService {
  constructor() {
    this.storageService = new StorageService();
    this.searchIndex = null;
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;
    
    // 创建搜索索引
    this.searchIndex = lunr(function() {
      this.field('title', { boost: 10 });
      this.field('content');
      this.field('tags', { boost: 5 });
      this.field('source');
      this.ref('id');
    });
    
    // 加载所有记忆到索引
    const memories = await this.storageService.getMemories();
    for (const memory of memories) {
      this.indexMemory(memory);
    }
    
    this.initialized = true;
  }

  indexMemory(memory) {
    // 将记忆添加到搜索索引
    this.searchIndex.update({
      id: memory.id,
      title: memory.title,
      content: memory.content,
      tags: memory.tags ? memory.tags.join(' ') : '',
      source: memory.source
    });
  }

  updateMemoryIndex(memory) {
    // 更新索引中的记忆
    this.removeMemoryFromIndex(memory.id);
    this.indexMemory(memory);
  }

  removeMemoryFromIndex(id) {
    // 从索引中移除记忆
    this.searchIndex.remove({ id });
  }

  async search(query, options = {}) {
    if (!this.initialized) {
      await this.initialize();
    }
    
    // 执行搜索
    const results = this.searchIndex.search(query);
    
    // 获取完整记忆对象
    const memories = [];
    for (const result of results) {
      const memory = await this.storageService.getMemory(result.ref);
      if (memory) {
        memories.push({
          ...memory,
          score: result.score
        });
      }
    }
    
    // 应用过滤和排序
    return this.filterAndSort(memories, options);
  }

  filterAndSort(memories, options) {
    // 实现过滤和排序逻辑
  }

  async rebuildIndex() {
    // 重建整个搜索索引
    this.searchIndex = null;
    this.initialized = false;
    await this.initialize();
  }
}
```

## 数据流

拾光忆栈采用单向数据流模式，确保数据变更可预测和可追踪：

### 用户交互流程

1. 用户在UI上执行操作（如保存记忆）
2. React组件调用Redux action
3. Redux reducer处理action并更新状态
4. 服务层执行业务逻辑（如保存到存储）
5. UI根据新状态重新渲染

### 数据同步流程

1. 触发同步（手动或自动）
2. 同步服务获取本地和云端更改
3. 解决可能的冲突
4. 将本地更改上传到云端
5. 将云端更改下载到本地
6. 更新Redux状态
7. UI反映同步结果

## 扩展点

拾光忆栈设计了多个扩展点，允许开发者扩展其功能：

### 存储提供商

通过实现`CloudStorageProvider`接口添加新的云存储提供商：

```javascript
// 存储提供商接口
class CloudStorageProvider {
  // 初始化存储提供商
  async initialize() {}
  
  // 测试连接
  async testConnection() {}
  
  // 保存记忆
  async saveMemory(memory) {}
  
  // 获取记忆
  async getMemory(id) {}
  
  // 删除记忆
  async deleteMemory(id) {}
  
  // 获取更改
  async getChanges(since) {}
  
  // 其他必要方法...
}

// 华为云OBS实现示例
class HuaweiObsService extends CloudStorageProvider {
  constructor(credentials) {
    super();
    this.credentials = credentials;
    this.client = null;
  }
  
  async initialize() {
    // 初始化OBS客户端
    this.client = new ObsClient({
      access_key_id: this.credentials.accessKeyId,
      secret_access_key: this.credentials.secretAccessKey,
      server: this.credentials.endpoint
    });
    
    this.bucketName = this.credentials.bucketName;
  }
  
  // 实现其他接口方法...
}
```

### 内容处理器

通过实现`ContentProcessor`接口添加自定义内容处理：

```javascript
// 内容处理器接口
class ContentProcessor {
  // 处理内容
  process(content, context) {}
  
  // 获取处理器名称
  getName() {}
  
  // 获取处理器描述
  getDescription() {}
}

// Markdown处理器示例
class MarkdownProcessor extends ContentProcessor {
  getName() {
    return 'markdown';
  }
  
  getDescription() {
    return '将Markdown内容转换为HTML';
  }
  
  process(content, context) {
    // 使用markdown-it转换内容
    const md = new MarkdownIt();
    return md.render(content);
  }
}
```

### UI主题

通过创建主题对象自定义UI外观：

```javascript
// 主题接口
const Theme = {
  // 主题名称
  name: '',
  
  // 主题描述
  description: '',
  
  // 主题作者
  author: '',
  
  // 主题版本
  version: '',
  
  // 主题颜色
  colors: {
    primary: '',
    secondary: '',
    background: '',
    text: '',
    // 其他颜色...
  },
  
  // 主题字体
  fonts: {
    base: '',
    heading: '',
    code: '',
    // 其他字体...
  },
  
  // 主题样式
  styles: {
    // 自定义CSS
  }
};

// 暗色主题示例
const DarkTheme = {
  name: 'Dark',
  description: '深色主题',
  author: 'MemoryKeeper Team',
  version: '1.0.0',
  colors: {
    primary: '#1890ff',
    secondary: '#52c41a',
    background: '#121212',
    text: '#ffffff',
    // 其他颜色...
  },
  fonts: {
    base: 'Roboto, sans-serif',
    heading: 'Roboto, sans-serif',
    code: 'Fira Code, monospace',
  },
  styles: {
    // 自定义CSS
  }
};
```

## 性能考虑

拾光忆栈在设计时考虑了以下性能优化：

### 分片存储

为处理大量记忆，实现了分片存储架构：

- 将记忆内容分散存储在多个小文件中
- 使用索引文件跟踪分片位置
- 实现懒加载，仅在需要时加载内容
- 支持增量同步，仅传输变更的分片

### 缓存策略

多级缓存策略提高访问速度：

- 内存缓存：最近访问的记忆
- IndexedDB缓存：所有记忆的本地副本
- 云存储：完整备份和同步源

### 异步操作

所有I/O操作都是异步的，避免阻塞UI：

- 使用Promise和async/await
- 长时间操作在Web Worker中执行
- 实现操作队列，避免并发冲突

## 安全考虑

拾光忆栈实现了多层安全措施：

### 数据加密

保护敏感数据：

- 可选的端到端加密
- 使用AES-256-GCM加密算法
- 密钥仅存储在本地，从不传输到服务器

### 权限控制

最小权限原则：

- 仅请求必要的浏览器权限
- 内容脚本使用最小权限集
- 用户可控制扩展的访问范围

### 安全通信

保护数据传输：

- 使用HTTPS进行所有API通信
- 实现请求签名验证
- 敏感数据传输前加密

## 测试策略

拾光忆栈采用多层测试策略：

### 单元测试

测试独立组件和函数：

- 使用Jest测试框架
- 模拟外部依赖
- 测试边界条件和错误处理

### 集成测试

测试组件交互：

- 测试服务之间的集成
- 验证数据流和状态管理
- 模拟浏览器API

### 端到端测试

测试完整用户流程：

- 使用Puppeteer模拟用户交互
- 验证关键功能路径
- 测试真实环境中的性能

## 下一步

现在您已经了解了拾光忆栈的架构，可以继续阅读以下文档：

- [存储结构](./storage-structure.md) - 了解数据如何存储和组织
- [API参考](./api-reference.md) - 了解可用的API和扩展点
- [贡献指南](./contributing.md) - 了解如何参与项目开发
