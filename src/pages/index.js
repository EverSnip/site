import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p className={styles.heroDescription}>
          专为家庭记忆打造的智能收藏工具，让孩子的成长足迹永不丢失。
          支持文字、图片、视频多媒体记录，私有云存储确保数据安全，陪伴见证每一个珍贵时刻。
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started/installation">
            五分钟教程 ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomepageSteps() {
  return (
    <section className={styles.stepsSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>开始记录孩子的成长时光</h2>
        <div className="row">
          <div className="col col--4">
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>1</div>
              <h3>下载安装</h3>
              <p>从Chrome网上应用店下载并安装拾光忆栈，开始为孩子建立成长档案。</p>
              <Link to="/docs/getting-started/installation" className="button button--outline button--primary button--sm">
                查看安装指南
              </Link>
            </div>
          </div>
          <div className="col col--4">
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>2</div>
              <h3>完成设置</h3>
              <p>配置私有云存储，确保孩子的成长记录安全可靠，永久保存。</p>
              <Link to="/docs/getting-started/initial-setup" className="button button--outline button--primary button--sm">
                设置指南
              </Link>
            </div>
          </div>
          <div className="col col--4">
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>3</div>
              <h3>开始使用</h3>
              <p>记录孩子的每个珍贵时刻，从第一次微笑到每一个成长里程碑。</p>
              <Link to="/docs/basic-features/saving-memories" className="button button--outline button--primary button--sm">
                使用教程
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomepageTestimonials() {
  return (
    <section className={styles.testimonialsSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>用户评价</h2>
        <div className="row">
          <div className="col col--4">
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <p>"终于找到了完美的工具来记录女儿的成长！以前的照片和视频散落在各个地方，现在都能统一管理了。"</p>
              </div>
              <div className={styles.testimonialAuthor}>
                <p>— 张妈妈</p>
              </div>
            </div>
          </div>
          <div className="col col--4">
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <p>"隐私保护做得很好，所有数据都在自己的云存储里，很放心。"</p>
              </div>
              <div className={styles.testimonialAuthor}>
                <p>— 李爸爸</p>
              </div>
            </div>
          </div>
          <div className="col col--4">
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <p>"搜索功能太棒了！想找孩子某个时期的照片，一搜就能找到。"</p>
              </div>
              <div className={styles.testimonialAuthor}>
                <p>— 王妈妈</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomepageCTA() {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <h2>准备好开始记录孩子的成长时光了吗？</h2>
        <p>立即下载拾光忆栈，为您的孩子建立一个完整、安全、永久的成长档案。</p>
        <div className={styles.ctaButtons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/getting-started/installation">
            立即下载
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/about">
            了解更多
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - 家庭记忆收藏工具`}
      description="拾光忆栈专为家庭记忆打造的智能收藏工具，让孩子的成长足迹永不丢失。支持文字、图片、视频多媒体记录，私有云存储确保数据安全，陪伴见证每一个珍贵时刻。">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <HomepageSteps />
        <HomepageTestimonials />
        <HomepageCTA />
      </main>
    </Layout>
  );
}
