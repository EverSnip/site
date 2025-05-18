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
          一个专注于个人记忆和知识管理的Chrome扩展，帮助您从网页中保存文本、图片和视频，
          并通过分类、标签和搜索功能进行组织和管理。
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
        <h2 className={styles.sectionTitle}>开始使用拾光忆栈</h2>
        <div className="row">
          <div className="col col--4">
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>1</div>
              <h3>下载安装</h3>
              <p>从Chrome网上应用店下载并安装拾光忆栈扩展。</p>
              <Link to="/docs/getting-started/installation" className="button button--outline button--primary button--sm">
                查看安装指南
              </Link>
            </div>
          </div>
          <div className="col col--4">
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>2</div>
              <h3>完成设置</h3>
              <p>按照向导完成初始设置，包括用户信息和云存储配置。</p>
              <Link to="/docs/getting-started/initial-setup" className="button button--outline button--primary button--sm">
                设置指南
              </Link>
            </div>
          </div>
          <div className="col col--4">
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>3</div>
              <h3>开始使用</h3>
              <p>浏览网页时，选中文本右键保存，或使用快捷键快速保存内容。</p>
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
                <p>"拾光忆栈彻底改变了我收集和整理网络信息的方式，再也不用担心找不到之前看过的重要内容了。"</p>
              </div>
              <div className={styles.testimonialAuthor}>
                <p>— 张先生，研究人员</p>
              </div>
            </div>
          </div>
          <div className="col col--4">
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <p>"作为一名学生，拾光忆栈帮助我整理学习资料和研究笔记，搜索功能特别强大！"</p>
              </div>
              <div className={styles.testimonialAuthor}>
                <p>— 李同学，大学生</p>
              </div>
            </div>
          </div>
          <div className="col col--4">
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <p>"多设备同步功能太棒了，在办公室保存的内容，回到家就能继续查看和整理。"</p>
              </div>
              <div className={styles.testimonialAuthor}>
                <p>— 王女士，自由职业者</p>
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
        <h2>准备好开始您的记忆管理之旅了吗？</h2>
        <p>立即下载拾光忆栈，开始捕捉和管理您的重要记忆。</p>
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
      title={`${siteConfig.title} - 个人记忆管理工具`}
      description="拾光忆栈是一个专注于个人记忆和知识管理的Chrome扩展，帮助您从网页中保存文本、图片和视频，并通过分类、标签和搜索功能进行组织和管理。">
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
