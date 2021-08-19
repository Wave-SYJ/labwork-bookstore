import { Typography } from 'antd';
import Link from 'next/link';
const { Title, Paragraph } = Typography;
import React from 'react';
import HelpLayout from '../../components/HelpLayout';

export default function FAQPage() {
  return (
    <HelpLayout>
      <Typography>
        <Title>常见问题</Title>
        <Title level={2}>1. 如何注册 BOOKSTORE 账号？</Title>
        <Paragraph>
          若您还没有 BOOKSTORE 帐号，请点击 <Link href='/register'>这里</Link> 注册。在处于未登录状态时，您也可以通过点击顶部导航栏右侧的“注册”按钮实现注册。
        </Paragraph>
        <Title level={2}>2. 如何登录 BOOKSTORE 账号？</Title>
        <Paragraph>
          若您尚未登录，请点击 <Link href='/login'>这里</Link> 登录。在处于未登录状态时，您也可以通过点击顶部导航栏右侧的“登录”按钮实现登录。
        </Paragraph>
        <Title level={2}>3. 在 BOOKSTORE 购买图书的流程是怎样的？</Title>
        <Paragraph>
          <ol>
            <li>登录</li>
            <li>搜索书籍</li>
            <li>将书籍添加到购物车</li>
            <li>结帐</li>
          </ol>
        </Paragraph>
      </Typography>
    </HelpLayout>
  );
}
