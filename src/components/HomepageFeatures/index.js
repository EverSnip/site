import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '成长记录',
    Svg: require('@site/static/img/feature-capture.svg').default,
    description: (
      <>
        记录孩子成长的每个珍贵时刻，从第一次微笑到每一个里程碑，
        支持文字、图片、视频多媒体记录，按时间轴完整保存。
      </>
    ),
  },
  {
    title: '智能管理',
    Svg: require('@site/static/img/feature-organize.svg').default,
    description: (
      <>
        按年龄段、活动类型自动整理记忆，智能标签和全文搜索，
        让您快速找到任何想要的成长回忆。
      </>
    ),
  },
  {
    title: '安全保障',
    Svg: require('@site/static/img/feature-security.svg').default,
    description: (
      <>
        私有云存储和端到端加密，孩子的成长记录只有您能看到，
        多设备同步，永久保存，不依赖第三方平台。
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
