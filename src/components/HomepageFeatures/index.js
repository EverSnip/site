import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '便捷保存',
    Svg: require('@site/static/img/feature-capture.svg').default,
    description: (
      <>
        从任何网页快速保存文本、图片和视频，一键捕获重要信息，
        支持右键菜单、快捷键和浏览器扩展多种保存方式。
      </>
    ),
  },
  {
    title: '智能组织',
    Svg: require('@site/static/img/feature-organize.svg').default,
    description: (
      <>
        通过分类、标签和搜索功能轻松管理记忆，快速找到需要的内容，
        支持多种视图模式和排序方式。
      </>
    ),
  },
  {
    title: '私密安全',
    Svg: require('@site/static/img/feature-security.svg').default,
    description: (
      <>
        支持数据加密和私有云存储，确保您的个人数据完全由您自己控制，
        多种云存储提供商可选，保障数据安全。
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
