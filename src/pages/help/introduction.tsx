import React from 'react';
import HelpLayout from '../../components/HelpLayout';
import styles from './style.module.scss';

import { Typography } from 'antd';
const { Title, Paragraph } = Typography;

export default function HelpPage() {
  return (
    <HelpLayout>
      <Typography>
        <Title>网站简介</Title>
        <Title level={2}>1. 工作内容</Title>
        <Paragraph>
          该项目为一个网上书店，用户通过浏览该网站，可以看到站内销售的书籍的资料，包括：书籍的定价，作者，出版社、ISBN编号、封面图片、分类和语言等，用户可以将书籍加入到购物车中。普通用户没有权限生成订单，用户可以通过注册界面升级为会员，在输入正确的信用卡卡号和密码后可以生成订单。会员可以管理维护自己的订单。系统为用户提供了搜索书籍的功能。系统同时提供了一个管理员的帐号，通过该帐号可以直接修改网站的书籍信息，审核网站内的订单。
        </Paragraph>
        <Title level={2}>2. 条件和限制</Title>
        <Paragraph>
          <table className={styles.table}>
            <tr>
              <th>项目开发平台：</th>
              <tr>Visual Studio Code （前端） + IntelliJ IDEA （后端）</tr>
            </tr>
            <tr>
              <th>数据库管理系统：</th>
              <tr>PostgreSQL 13.3</tr>
            </tr>
            <tr>
              <th>开发人员：</th>
              <tr>71119113 李锐 71119114 宋重阳 71119115 孙雨佳 71119116 朱嘉梁</tr>
            </tr>
            <tr>
              <th>已具备条件：</th>
              <tr>项目构架基本完成，开发工具业已齐备</tr>
            </tr>
            <tr>
              <th>未具备条件：</th>
              <tr>暂无</tr>
            </tr>
            <tr>
              <th>项目预计完成日期：</th>
              <tr>2021年12月27日</tr>
            </tr>
          </table>
        </Paragraph>
        <Title level={2}>3. 产品</Title>
        <Paragraph>
          <table className={styles.table}>
            <tr>
              <th>产品名称：</th>
              <td>BOOKSTORE</td>
            </tr>
            <tr>
              <th>开发语言：</th>
              <td>TypeScript {'&'} SCSS （前端） + Java （后端）</td>
            </tr>
          </table>
        </Paragraph>
        <Title level={2}>4. 文档</Title>
        <Paragraph>需求分析、系统设计、系统实现、系统测试、说明文档。</Paragraph>
        <Title level={2}>5. 运行环境</Title>
        <Paragraph>安装有图形界面和网页浏览器的任意操作系统。</Paragraph>
      </Typography>
    </HelpLayout>
  );
}
