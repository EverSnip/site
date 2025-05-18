import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

import styles from './examples.module.css';

const ExampleList = [
  {
    title: '文本记忆保存',
    image: '/img/examples/text-memory.png',
    description: '从网页中选择并保存重要文本片段，支持富文本格式。',
    link: '/docs/basic-features/saving-memories#文本记忆',
  },
  {
    title: '图片记忆保存',
    image: '/img/examples/image-memory.png',
    description: '保存网页中的图片，支持缩放和裁剪功能。',
    link: '/docs/basic-features/saving-memories#图片记忆',
  },
  {
    title: '视频记忆保存',
    image: '/img/examples/video-memory.png',
    description: '保存网页中的视频，支持时间点标记和截图。',
    link: '/docs/basic-features/saving-memories#视频记忆',
  },
  {
    title: '分类与标签管理',
    image: '/img/examples/categories-tags.png',
    description: '使用分类和标签组织记忆，创建自定义分类体系。',
    link: '/docs/basic-features/categories-and-tags',
  },
  {
    title: '高级搜索功能',
    image: '/img/examples/advanced-search.png',
    description: '使用高级搜索语法，快速找到需要的记忆。',
    link: '/docs/basic-features/search-and-filter#高级搜索',
  },
  {
    title: '多设备同步',
    image: '/img/examples/multi-device-sync.png',
    description: '在多个设备间同步记忆，随时随地访问您的知识库。',
    link: '/docs/advanced-features/multi-device-sync',
  },
  {
    title: '数据加密保护',
    image: '/img/examples/encryption.png',
    description: '使用端到端加密保护您的敏感记忆，确保数据安全。',
    link: '/docs/advanced-features/encryption',
  },
  {
    title: '数据导入导出',
    image: '/img/examples/import-export.png',
    description: '导入导出记忆数据，支持多种格式和选择性导出。',
    link: '/docs/advanced-features/import-export',
  },
  {
    title: '自定义外观',
    image: '/img/examples/appearance.png',
    description: '自定义拾光忆栈的外观，包括主题颜色和布局。',
    link: '/docs/settings/appearance',
  },
];

function ExampleCard({title, image, description, link}) {
  return (
    <div className={styles.exampleCard}>
      <img src={image} alt={title} className={styles.exampleImage} />
      <div className={styles.exampleContent}>
        <h3 className={styles.exampleTitle}>{title}</h3>
        <p className={styles.exampleDescription}>{description}</p>
        <Link to={link} className="button button--primary button--sm">
          查看详情
        </Link>
      </div>
    </div>
  );
}

export default function Examples() {
  return (
    <Layout
      title="功能示例"
      description="拾光忆栈功能示例展示，包括文本保存、图片保存、视频保存、分类标签、搜索功能等">
      <div className="container margin-vert--lg">
        <div className={styles.examplesHeader}>
          <h1>功能示例</h1>
          <p>
            探索拾光忆栈的各种功能示例，了解如何使用这些功能提升您的记忆管理体验。
            点击每个示例查看详细说明和使用指南。
          </p>
        </div>
        
        <div className={styles.examplesGrid}>
          {ExampleList.map((example, idx) => (
            <ExampleCard key={idx} {...example} />
          ))}
        </div>
        
        <div className={styles.examplesCta}>
          <h2>想要了解更多功能？</h2>
          <p>查看我们的完整文档，了解拾光忆栈的所有功能和使用技巧。</p>
          <Link to="/docs/about" className="button button--primary button--lg">
            浏览完整文档
          </Link>
        </div>
      </div>
    </Layout>
  );
}
